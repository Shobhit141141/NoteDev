import React, { createContext, useContext, useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import toast from "react-hot-toast";
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

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [uid, setuserId] = useState("");
  const [userLoading, setUserLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const serverurl = import.meta.env.VITE_SERVER_URL;
  const login = async () => {
    try {
      // Redirect to Google OAuth URL
      window.location.href = `${serverurl}/auth/google`;
    } catch (error) {
      console.error("Error during sign-in:", error);
      throw error;
    }
  };
  const logout = () => {
    // Clear user and token on logout
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");

    // Remove the expiry cookie
    document.cookie = "expiry=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  useEffect(() => {
    setUserLoading(true);
    // const storedToken = localStorage.getItem("token");
    const storeduid = localStorage.getItem("uid");

    if (storeduid) {
      setuserId(storeduid);
    }
    setUserLoading(false);
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setUserLoading(true);

        const response = await fetch(`${serverurl}/auth/user/profile`, {
          credentials: "include", // Important to send cookies with the request
        });

        if (response.ok) {
          const userData = await response.json();

          setUser(userData.user);
          setUserLoading(false);
        } else {
          setUserLoading(false);
          throw new Error("Failed to fetch user profile");
        }
      } catch (error) {
        setUserLoading(false);
        console.error("Error fetching user profile:", error);
        setError("Failed to fetch user profile");
      } finally {
        setUserLoading(false);
      }
    };

    fetchUserProfile();
  }, [uid]);

  return (
    <AuthContext.Provider
      value={{ user, token, uid, login, logout, userLoading, error }}
    >
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
