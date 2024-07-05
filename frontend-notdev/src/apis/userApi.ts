import axios from "axios";

const serverurl = import.meta.env.VITE_SERVER_URL;
interface UserProfile {
  uid: string;
  name: string;
  email: string;
  picture: string;
}

export const createUser = async (userData: UserProfile, token: string) => {
  const response = await axios.post(
    `${serverurl}/api/users/profile`,
    userData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'uid': userData.uid,
      },
    }
  );
  return response;
};
