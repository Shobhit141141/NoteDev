import { Link, useNavigate } from "react-router-dom";
import logo from "/NotdevLogo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import "./Header.css"; // Assuming your styles are in this CSS file
import { useAuth } from "@/context/GoogleAuthContext"; // Make sure the path is correct
import { RiLogoutCircleRLine } from "react-icons/ri";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Profile", path: "/profile" },
];

function Header() {
  const [position, setPosition] = useState("Navbar");
  const { user, logout,userLoading } = useAuth();
  const [countdown, setCountdown] = useState(0);
  const [color, setColor] = useState("text-[#ffffff]"); // Default color
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/signin");
  };


  useEffect(() => {

    const expiryCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('expiry='));
    console.log(expiryCookie)
    if (expiryCookie) {
      const expiryTime = decodeURIComponent(expiryCookie.split('=')[1]);
      const matchResult = expiryTime.match(/"([^"]+)"/);
      const expiryDateString = matchResult ? matchResult[1] : ""; 
      const expiryDate = new Date(expiryDateString).getTime();
      const now = Date.now();

      const remainingTime = expiryDate - now;
      setCountdown(remainingTime > 0 ? remainingTime : 0);

      const timer = setInterval(() => {
        setCountdown(prevCountdown => {
          if (prevCountdown <= 1000) {
            clearInterval(timer);
            window.location.reload(); // Reload the page when countdown reaches 0
            return 0; // Stop the countdown at 0
          }

          if (prevCountdown <= 2000) {
            setColor("text-red-500"); // Change color to red when 1 second is left
          }

          return prevCountdown - 1000; // Decrease countdown by 1 second
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [location.search]);

  const formatTime = (milliseconds:any) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return { minutes, seconds };
  };

  const { minutes, seconds } = formatTime(countdown);



  return (
    <div className="flex justify-between w-full items-center header-container px-4 sm:px-8">
      <div className="logo flex flex-row justify-center items-center h-[100px]">
        <Link to={"/"}>
          <img src={logo} alt="Notdev Logo" className="logo-image w-[50px]" />
        </Link>
        <Link to={"/"}>
          <h1 className="header-title text-[24px] sm:text-[35px] font-bold bg-gradient-to-r from-purple-800 via-pink-500 to-pink-300 bg-clip-text text-transparent">
            NOTEDEV
          </h1>
        </Link>

        <div className={`flex gap-5 ${color} ml-6 text-md sm:text-lg`}>
        <div>
          <span className="countdown font-mono ">
            <span style={{ "--value": minutes } as React.CSSProperties}></span>
          </span>
          min
        </div>
        <div>
          <span className="countdown font-mono ">
            <span style={{ "--value": seconds } as React.CSSProperties}></span>
          </span>
          sec
        </div>
      </div>
      </div>

      { userLoading || user ? (
        <div className="dropdown-menu-container m-2 sm:m-6">
          <DropdownMenu>
            <div className="flex justify-between items-center gap-6">
              <span>
                <h2 className="hidden sm:block">{user?.name}</h2>
              </span>
              <DropdownMenuTrigger className="dropdown-trigger w-[50px] h-[50px] bg-gradient-to-r from-purple-800 to-pink-500 sm:h-[50px] flex items-center justify-center text-white font-bold rounded-full overflow-hidden">
                <img src={user?.picture} alt="" />
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="dropdown-content w-[100px] sm:w-[200px] rounded-[6px] bg-appbg shadow-lg m-4">
              <DropdownMenuSeparator className="dropdown-separator" />
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={setPosition}
              >
                {navItems.map((item) => (
                  <Link key={item.label} to={item.path}>
                    <DropdownMenuRadioItem
                      className="dropdown-item"
                      value={item.label}
                    >
                      {item.label}
                    </DropdownMenuRadioItem>
                  </Link>
                ))}
              </DropdownMenuRadioGroup>
              <div
                className="bg-[#e81919] h-[30px] flex justify-center items-center rounded-[6px] mt-1 cursor-pointer gap-2"
                onClick={handleLogout} // Attach logout function to onClick event
              >
                <RiLogoutCircleRLine className="" />
                Logout
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex items-center">
          <Link
            to="/signin"
            className="signin-button bg-gradient-to-r from-purple-800 to-pink-500 text-white px-4 py-2 rounded-[6px]"
          >
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;