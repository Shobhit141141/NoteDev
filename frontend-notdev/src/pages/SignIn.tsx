// GoogleSignInPage.tsx
import React from 'react';
import { Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { useAuth } from '../context/GoogleAuthContext';

const GoogleSignInPage: React.FC = () => {
  const { login } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await login();
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-purple-900 text-white">
      <Button
        type="primary"
        size="large"
        icon={<GoogleOutlined />}
        onClick={handleGoogleSignIn}
        className="p-3 rounded-md"
      >
        Sign In with Google
      </Button>
    </div>
  );
};

export default GoogleSignInPage;
