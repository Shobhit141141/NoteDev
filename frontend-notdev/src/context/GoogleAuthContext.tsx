// src/AuthContext.tsx

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface User {
    googleId: string;
    name: string;
    email: string;
    picture: string;
    token: string | null; 
}

interface AuthContextProps {
    user: User | null;
    userLoading: boolean;
    token: string | null; 
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC = ({
    children,
}: React.PropsWithChildren<{}>) => {
    const [user, setUser] = useState<User | null>(null);
    const [userLoading, setLoading] = useState(true);
    const [token, setToken] = useState<string | null>(null);
    const server_url = import.meta.env.VITE_SERVER_URL;

    useEffect(() => {
        axios
            .get(`${server_url}/user/profile`, {
                withCredentials: true,
            })
            .then((response) => {
                setUser(response.data.user);
                setToken(response.data.token); 
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    const login = () => {
        window.location.href = `${server_url}/auth/google`;
    };

    console.log("user : ", user);



    const logout = () => {
        axios
            .get(`${server_url}/auth/logout`, { withCredentials: true })
            .then(() => {
                setUser(null);
                setToken(null);
                window.location.reload();
            });
    };

    return (
        <AuthContext.Provider
            value={{ user, userLoading, token, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
