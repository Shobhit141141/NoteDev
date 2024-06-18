import React from "react";
import icon from "/google.svg";
import { useAuth } from "../context/GoogleAuthContext";
import { LiaFileCode } from "react-icons/lia";
import { LuCode } from "react-icons/lu";
import { TbPhotoCode } from "react-icons/tb";

const GoogleSignInPage: React.FC = () => {
  const { login } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await login();
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <div className="w-[100vw] h-[80vh] flex justify-center items-center">
      <div className="login-prompt-card p-6 bg-[#00000090] shadow-md text-center rounded-2xl">
        <div className="flex w-[100%] justify-center gap-4">
          <span className="text-white">
            <TbPhotoCode className="text-[30px]" />
          </span>
          <span className="text-white">
            <LuCode className="text-[30px]" />
          </span>
          <span className="text-white">
            <LiaFileCode className="text-[30px]" />
          </span>
        </div>
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-800 via-pink-500 to-pink-300 bg-clip-text text-transparent my-4">
          Welcome to NOTEDEV
        </h2>
        <div
          className="flex justify-center items-center gap-4 bg-[#ffffff] px-4 py-2 cursor-pointer rounded-[16px] text-black"
          onClick={handleGoogleSignIn}
        >
          <img src={icon} alt="" className="w-[40px] h-[40px]" />
          <p className="text-[20px]">Sign in with Google</p>
        </div>
      </div>
    </div>
  );
};

export default GoogleSignInPage;
