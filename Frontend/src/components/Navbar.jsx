import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Model from "react-modal";
import Login from "./Login";
import SingUp from "./SingUp";

const Navbar = () => {
  const [singUp, setSignUp] = useState(false);
  const [login, setLogin] = useState(false);

  function renderSignup() {
    setSignUp(true);
    singUp ? <SingUp /> : null;
  }
  function renderLogin() {
    setLogin(true);
    login ? <Login /> : null;
  }

  return (
    <>
      <div className="flex justify-around align-items w-full bg-white border-b border-b-black py-4">
        <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold">Stories</h1>
        <div>
          <button
            className="ml-3 lg:text-[18px] md:text-[16px] text-[15px]"
            onClick={() => renderSignup}
          >
            Start Writing
          </button>
          <button
            className="rounded-full h-9 border-2 text-white bg-black border-black ml-6 lg:w-[90px] md:w-[80px] w-[70px]"
            onClick={() => renderLogin}
          >
            Sign in
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
