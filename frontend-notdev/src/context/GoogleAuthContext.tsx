// src/AuthContext.tsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  uid: string;
  name: string;
  email: string;
  picture: string;
  token: string | null; // Updated to include token
}

interface AuthContextProps {
  user: User | null;
  userLoading: boolean;
  token: string | null; // Token in context
  login: () => void;
  logout: () => void;
}



const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }: React.PropsWithChildren<{}>) => {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null); 

  useEffect(() => {
    axios.get('http://localhost:5000/user/profile', { withCredentials: true })
      .then(response => {
        setUser(response.data.user);
        setToken(response.data.token); // Set token from response
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const login = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  console.log("user : ",user)

  const logout = () => {
    axios.get('http://localhost:5000/auth/logout', { withCredentials: true }).then(() => {
      setUser(null);
      setToken(null); 
      window.location.reload();
   
    });
  };

  return (
    <AuthContext.Provider value={{ user, userLoading, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
