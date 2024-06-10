import { Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { signInWithPopup, UserCredential } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

interface UserProfile {
  uid: string; // Ensure uid is included in the UserProfile interface
  name: string;
  email: string;
  picture: string;
  // Add other profile fields as needed
}

const createUserProfile = async (token: string, userData: UserProfile) => {
  try {
    const response = await fetch('http://localhost:5000/api/users/profile', {
      method: 'POST', // Use POST method to create a new user
      headers: {
        'Content-Type': 'application/json',
         Authorization: token,
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Failed to create user profile');
    }
    const createdUserData = await response.json();
    console.log('Created User Data:', createdUserData);
    // Handle successful creation
  } catch (error) {
    console.error('Error creating user profile:', error);
    // Handle error
  }
};

const handleGoogleSignIn = async () => {
  try {
    const result: UserCredential = await signInWithPopup(auth, googleProvider);
    console.log(result);
    const token = await result.user.getIdToken();
    console.log(token)
    const userData: UserProfile = {
      uid: result.user.uid, 
      name: result.user.displayName || '',
      email: result.user.email || '',
      picture: result.user.photoURL || '',
    };
    await createUserProfile(token, userData);
  } catch (error) {
    console.error('Error during sign-in:', error);
  }
};

const SignIn = () => {
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

export default SignIn;
