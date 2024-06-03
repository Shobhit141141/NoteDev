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

const navItems = [
  { label: "Question", path: "/question" },
  { label: "All Questions", path: "/questions" },
  { label: "Temp", path: "/temp" },
  { label: "Home", path: "/" },
  { label: "Text Editor", path: "/editor" },
];

function Header() {
  const [position, setPosition] = useState("bottom");

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
          <DropdownMenuTrigger className="dropdown-trigger w-[150px] sm:w-[200px] bg-gradient-to-r from-purple-800 to-pink-500 rounded-[6px] h-[40px] sm:h-[50px] flex items-center justify-center text-white font-bold">
            {position}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="dropdown-content w-[150px] sm:w-[200px] rounded-[6px] mt-2 bg-appbg shadow-lg">
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
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default Header;
