import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <nav className="fixed top-0 w-full border-b border-gray-800 bg-[#0a0a0f]/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent"
          >
            Stories
          </a>
          <div className="flex gap-4">
            <button
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              onClick={() => navigate("/signup")}
            >
              Start Writing
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-90 transition-opacity"
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
