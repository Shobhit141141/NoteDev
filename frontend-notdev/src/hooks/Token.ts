import { useAuth } from "../context/GoogleAuthContext";

export const useFetchToken = () => {
  const { token } = useAuth();

  return token;
};
