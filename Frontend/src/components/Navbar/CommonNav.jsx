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
    query: "(min-width: 768px)",
  });
  return (
    <>
      {isLgScreenForNav ? (
        <>
          <aside className="sticky top-0 hidden h-screen w-64 flex-shrink-0 border-r border-gray-800 bg-[#0a0a0f] md:block">
            <nav className="p-4 space-y-2">
              <NavItem icon={Home} label="Home" to="/feed" active />
              <NavItem icon={Search} label="Explore" to="/explore" />
              <NavItem icon={MessageCircle} label="Messages" to="/messages" />
              {/* <NavItem icon={Bell} label="Notifications" to="/notifications" /> */}
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
