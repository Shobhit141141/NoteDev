import { initializeApp } from "firebase/app";
import {
  browserSessionPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
} from "firebase/auth";

const firebaseConfig = JSON.parse(import.meta.env.VITE_FB_CONFIG);
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
setPersistence(auth, browserSessionPersistence);
