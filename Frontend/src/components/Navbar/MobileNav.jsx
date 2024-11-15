import React from "react";
import { FiMessageSquare } from "react-icons/fi";
import { IoSearchSharp } from "react-icons/io5";
import { MdHome } from "react-icons/md";
import { NavLink } from "react-router-dom";

const MobileNav = () => {
  return (
    <>
      <nav className="fixed bottom-0  bg-black border-t border-t-white w-full h-12 mx-auto mt-10">
        <ul className="flex flex-row justify-around items-center py-2 h-full">
          <li>
            <NavLink to="/feed">
              <MdHome className="text-2xl" />
            </NavLink>
          </li>
          <li>
            <NavLink to="">
              <IoSearchSharp className="w-10 h-7" />
            </NavLink>
          </li>
          <li>
            <NavLink to="">
              <FiMessageSquare className="w-10 h-7" />
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default MobileNav;
