import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { MdHome } from "react-icons/md";
import { NavLink } from "react-router-dom";

const MobileNav = ({ user }) => {
  return (
    <>
      <nav className="fixed bottom-0  bg-gray-800 w-full h-12">
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
            <NavLink to="/write">
              <FiPlusCircle className="text-2xl" />
            </NavLink>
          </li>
          <li>
            <NavLink to={`/${user.userName}`}>
              <FaUserCircle className="text-2xl" />
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default MobileNav;
