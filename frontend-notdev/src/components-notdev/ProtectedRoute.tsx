import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../context/GoogleAuthContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const { user, userLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (userLoading) {
    return (
      <div className="w-[100vw] h-[100vh] fixed top-0 left-0 flex justify-center items-center bg-[#00000080] bg-opacity-50 z-50">
        <span className="loading loading-dots loading-sm text-white"></span>
      </div>
    );
  }

  if (!user) {
    navigate("/signin", { state: { from: location } });
    return null;
  }

  return <Outlet />;
};

export default ProtectedRoute;
