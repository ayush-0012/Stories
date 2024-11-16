import React from "react";
import { FiMessageSquare } from "react-icons/fi";
import { IoIosNotifications } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { MdHome } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import MobileNav from "./MobileNav";

const CommonNav = () => {
  const isLgScreenForNav = useMediaQuery({
    query: "(min-width: 850px)",
  });
  return (
    <>
      {isLgScreenForNav ? (
        <>
          <aside className="grid pr-8 pt-12 lg:px-5 lg:w-[230px] md:w-[200px] w-[100px] ">
            <div className="mr-6 cursor-pointer lg:w-[180px] md:w-[200px] ">
              <ul className="space-y-4 py-3 max-w-full">
                <li className="side_nav_lg" onClick={() => navigate("/feed")}>
                  <MdHome className="w-10 h-7" />
                  <p>Home</p>
                </li>
                <li className="side_nav_lg">
                  <IoSearchSharp className="w-10 h-7" />
                  <p>Explore</p>
                </li>
                <li className="side_nav_lg">
                  <FiMessageSquare className="w-10 h-7" />
                  <p>Messages</p>
                </li>
                <li className="side_nav_lg">
                  <IoIosNotifications className="w-10 h-7" />
                  <p>Notifications</p>
                </li>
              </ul>
            </div>
          </aside>
        </>
      ) : (
        <>
          <MobileNav />
        </>
      )}
    </>
  );
};

export default CommonNav;
