import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiMessageSquare, FiPlusCircle } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { MdHome } from "react-icons/md";
import { NavLink } from "react-router-dom";

const MobileNav = ({ user }) => {
  return (
    <>
      <nav className="fixed bottom-0  bg-black border-t border-t-white w-full h-12">
        <ul className="flex flex-row justify-around items-center py-2 h-full">
          <li>
            <NavLink to="/feed">
              <MdHome className="text-2xl" />
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/explore" activeClassName="">
              <IoIosSearch className="text-2xl" />
            </NavLink>
          </li> */}
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
