import { Home, MessageCircle, Search } from "lucide-react";
import React from "react";
import { FiMessageSquare } from "react-icons/fi";
import { IoSearchSharp } from "react-icons/io5";
import { MdHome } from "react-icons/md";
import { NavLink } from "react-router-dom";

const MobileNav = () => {
  return (
    <>
      <nav className="fixed bottom-0 z-50 bg-black border-t border-t-white w-full h-12 mx-auto mt-10">
        <ul className="flex flex-row justify-around items-center py-2 h-full">
          <li>
            <NavLink to="/feed">
              <Home />
            </NavLink>
          </li>
          <li>
            <NavLink to="">
              <Search />
            </NavLink>
          </li>
          <li>
            <NavLink to="">
              <MessageCircle />
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default MobileNav;
