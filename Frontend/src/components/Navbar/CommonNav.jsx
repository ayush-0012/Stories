import React from "react";
import { FiMessageSquare } from "react-icons/fi";
import { IoIosNotifications } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { MdHome } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import MobileNav from "./MobileNav";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Home,
  MessageCircle,
  Search,
  Settings,
  User2,
  Menu,
} from "lucide-react";

const CommonNav = () => {
  const navigate = useNavigate();

  const NavItem = ({ className, icon: Icon, label }) => (
    <a
      href="/feed"
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-all hover:text-white no-underline ${className}`}
    >
      <Icon className="h-5 w-5" />
      <span className="hidden md:inline-block">{label}</span>
    </a>
  );

  const isLgScreenForNav = useMediaQuery({
    query: "(min-width: 850px)",
  });
  return (
    <>
      {isLgScreenForNav ? (
        <>
          <aside className="fixed top-0 left-0 z-50 w-64 h-screen overflow-y-auto bg-[#0a0a0f] p-4 md:sticky md:top-0 transform transition-transform duration-200 ease-in-out md:translate-x-0 ">
            <nav className="flex flex-col gap-2 sticky top-0">
              <NavItem icon={Home} label="Home" />
              <NavItem icon={Search} label="Explore" />
              <NavItem icon={MessageCircle} label="Messages" />
              <NavItem icon={Bell} label="Notifications" />
            </nav>
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
