// AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, UserCredential } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import CryptoJS from "crypto-js";
import { createUser } from "@/apis/userApi";

interface UserProfile {
  uid: string;
  name: string;
  email: string;
  picture: string;
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  login: () => Promise<void>;
  logout: () => void;
  userLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);
const encryptData = (data: string, privateKey: string) => {
  const ciphertext = CryptoJS.AES.encrypt(data, privateKey).toString();
  return ciphertext;
};

const decryptData = (ciphertext: string, privateKey: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, privateKey);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};
const createUserProfile = async (token: string, userData: UserProfile) => {
  try {
    const encryptedToken = encryptData(token, import.meta.env.VITE_ENCRYPTION_KEY || "");
    localStorage.setItem("encryptedToken", encryptedToken);
    const encryptedUid = encryptData(userData.uid, import.meta.env.VITE_ENCRYPTION_KEY || "");
    localStorage.setItem("encryptedUid", encryptedUid);
    const response = await createUser(userData,token)

    if (response.status !== 200) {
      throw new Error("Failed to create user profile");
    }
    const createdUserData = await response.data;
    console.log("Created User Data:", createdUserData);
  } catch (error) {
    console.error("Error creating user profile:", error);
  }
};

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [userLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = async () => {
    try {
      const result: UserCredential = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      const userData: UserProfile = {
        uid: result.user.uid,
        name: result.user.displayName || "",
        email: result.user.email || "",
        picture: result.user.photoURL || "",
      };

      await createUserProfile(token, userData);
      setUser(userData);
      setToken(token); 
    } catch (error) {
      console.error("Error during sign-in:", error);
      throw error;
    }
  };

  const logout = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null);
        setToken(null); // Clear the token on logout
        localStorage.removeItem("encryptedToken");
        localStorage.removeItem("encryptedUid");
      })
      .catch((error) => {
        console.error("Error during sign-out:", error);
      });
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("encryptedToken");
    if (storedToken) {
      const decryptedToken = decryptData(storedToken, import.meta.env.VITE_ENCRYPTION_KEY || "");
      setToken(decryptedToken);
    }
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          const userData: UserProfile = {
            uid: user.uid,
            name: user.displayName || "",
            email: user.email || "",
            picture: user.photoURL || "",
          };
          setUser(userData);
        } else {
          setUser(null);
        }
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, userLoading: userLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
