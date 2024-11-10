import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="flex justify-around align-items w-full bg-black border-b border-b-gray-300 py-2">
        <h1
          className="lg:text-4xl md:text-3xl text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Stories
        </h1>
        <div>
          <button
            className="ml-3 lg:text-[18px] md:text-[16px] text-[15px]"
            onClick={() => handleSignupRedirect()}
          >
            Start Writing
          </button>
          <button
            className="rounded-full h-9 border-2 text-black bg-white border-black ml-6 lg:w-[90px] md:w-[80px] w-[70px]"
            onClick={() => handleLoginRedirect()}
          >
            Sign in
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
