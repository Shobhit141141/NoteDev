import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/GoogleAuthContext';
import { useNavigate } from 'react-router-dom';

const PublicRoute: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (user) {
    navigate('/', { state: { from: location } });
    return null;
  }

  return <Outlet />;
};

export default PublicRoute;
