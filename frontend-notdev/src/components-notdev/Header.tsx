import { Link } from "react-router-dom";
import logo from "/NotdevLogo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import "./Header.css"; // Assuming your styles are in this CSS file
import { useAuth } from "@/context/GoogleAuthContext";
import { RiLogoutCircleRLine } from "react-icons/ri";

const navItems = [
  { label: "Home", path: "/" },
];

function Header() {
  const [position, setPosition] = useState("Navbar");
  const { user } = useAuth();

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
      </div>

      <div className="dropdown-menu-container m-2 sm:m-6">
        <DropdownMenu>
          <div className="flex justify-between items-center gap-6">
            <span>
              <h2 className="hidden sm:block">{user?.name}</h2>
            </span>
            <DropdownMenuTrigger className="dropdown-trigger w-[50px] h-[50px] bg-gradient-to-r from-purple-800 to-pink-500   sm:h-[50px] flex items-center justify-center text-white font-bold rounded-full overflow-hidden">
              <img src={user?.picture} alt="" />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="dropdown-content w-[100px] sm:w-[200px] rounded-[6px] bg-appbg shadow-lg m-4 mt-2">
            <DropdownMenuLabel className="dropdown-label p-2 font-bold">
              Navbar
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="dropdown-separator my-1 border-t" />
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
            <div className="bg-[#ff2323] h-[30px] flex justify-center items-center rounded-[6px] mt-2"><RiLogoutCircleRLine />Logout</div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default Header;
