import { Bell, Home, MessageCircle, Search } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({ icon: Icon, label, to, active }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-all hover:text-white no-underline ${
      active ? "bg-[#16161f] text-white" : ""
    }`}
  >
    <Icon className="h-4 w-4" />
    <span className="hidden md:inline-block">{label}</span>
  </Link>
);
const MobileNav = () => {
  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0a0a0f] border-t border-gray-800">
        <div className="flex justify-around p-4">
          <NavItem icon={Home} to="/feed" active />
          <NavItem icon={Search} to="/" />
          <NavItem icon={MessageCircle} to="/" />
          <NavItem icon={Bell} to="/" />
        </div>
      </nav>
    </>
  );
};

export default MobileNav;
