import { Link } from "react-router-dom";
import logo from "../../public/NotdevLogo.png";
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

function Header() {
  const [position, setPosition] = useState("bottom");

  return (
    <div className="flex justify-between w-[100vw] items-center header-container">
      <div className="logo flex flex-row justify-center items-center h-[100px]">
        <img src={logo} alt="Notdev Logo" className="logo-image w-[50px]" />
        <h1 className="header-title text-[35px] font-bold font-mono bg-gradient-to-r from-purple-800 via-pink-500 to-pink-300 bg-clip-text text-transparent">
          NOTEDEV
        </h1>
      </div>

      <div className="dropdown-menu-container m-6">
        <DropdownMenu>
          <DropdownMenuTrigger className="dropdown-trigger w-[200px] bg-gradient-to-r from-purple-800 to-pink-500 rounded-[6px] h-[50px] flex items-center justify-center text-white font-bold">
            {position}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="dropdown-content w-[200px] rounded-[6px] mt-2 bg-appbg shadow-lg">
            <DropdownMenuLabel className="dropdown-label p-2 font-bold">
              Navbar
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="dropdown-separator my-1 border-t" />
            <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
              <Link to="/question">
                <DropdownMenuRadioItem
                  className="dropdown-item"
                  value="Question"
                >
                  Question
                </DropdownMenuRadioItem>
              </Link>
              <Link to="/questions">
                <DropdownMenuRadioItem
                  className="dropdown-item "
                  value="allQuestions"
                >
                  All Questions
                </DropdownMenuRadioItem>
              </Link>
              <Link to="/temp">
                <DropdownMenuRadioItem
                  className="dropdown-item"
                  value="Team"
                >
                  temp
                </DropdownMenuRadioItem>
              </Link>
              <Link to="/">
                <DropdownMenuRadioItem
                  className="dropdown-item"
                  value="Home"
                >
                  Home
                </DropdownMenuRadioItem>
              </Link>
              <Link to="/editor">
                <DropdownMenuRadioItem
                  className="dropdown-item"
                  value="Text"
                >
                  TextEditor
                </DropdownMenuRadioItem>
              </Link>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default Header;
