import React, { createContext, useContext, useEffect, useState } from "react";

interface UserProfile {
    uid: string;
    name: string;
    email: string;
    picture: string;
}

interface AuthContextType {
    user: UserProfile | null;
    token: string | null;
    uid: string | null;
    login: () => void;
    logout: () => void;
    userLoading: boolean;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [uid, setUid] = useState<string | null>(null);
    const [userLoading, setUserLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const serverurl = import.meta.env.VITE_SERVER_URL;

    const login = async () => {
        try {
            window.location.href = `${serverurl}/auth/google`;
        } catch (error) {
            console.error("Error during sign-in:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await fetch(`${serverurl}/auth/logout`, { method: "POST", credentials: "include" });
            setUser(null);
            setToken(null);
            setUid(null);
            localStorage.removeItem("uid");
        } catch (error) {
            console.error("Error during logout:", error);
            setError("Failed to logout");
        }
    };

    const fetchUserProfile = async () => {
        try {
            if (!localStorage.getItem("uid") || user) {
                return;
            }

            setUserLoading(true);
            const response = await fetch(`${serverurl}/auth/user/profile`, {
                credentials: "include",
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData.user);
                setUid(userData.user.id);
                localStorage.setItem("uid", userData.user.id);
            } else {
                throw new Error("Failed to fetch user profile");
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
            logout();
            setError("Failed to fetch user profile");
        } finally {
            setUserLoading(false);
        }
    };

    const refreshToken = async () => {
        if (!localStorage.getItem("uid") || user) {
            return;
        }
        try {
            const response = await fetch(`${serverurl}/auth/refresh-token`, {
                method: "POST",
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                setToken(data.accessToken);
            } else {
                throw new Error("Failed to refresh access token");
            }
        } catch (error) {
            console.error("Error refreshing access token:", error);
            setError("Failed to refresh access token");
        }
    };

    useEffect(() => {
        const initAuth = async () => {
            await refreshToken();
            await fetchUserProfile();
        };

        initAuth();

        const intervalId = setInterval(refreshToken, 3400 * 1000);

        return () => clearInterval(intervalId); 
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, uid, login, logout, userLoading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export { AuthProvider, useAuth };
