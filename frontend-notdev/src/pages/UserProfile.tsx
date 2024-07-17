import { useAuth } from "@/context/GoogleAuthContext";

function UserProfile() {
  const { user } = useAuth(); // Extract user from useAuth

  return (
    <div className="user-profile-container">
      {user ? (
        <div className="user-details flex flex-col items-center">
          <img src={user.picture} alt={`${user.name}'s profile`} className="user-profile-picture w-24 h-24 rounded-full" />
          <h2 className="user-name text-2xl font-bold mt-4">{user.name}</h2>
          <p className="user-email text-lg text-gray-600">{user.email}</p>
        </div>
      ) : (
        <p className="text-center text-lg">No user is logged in.</p>
      )}
    </div>
  );
}

export default UserProfile;
