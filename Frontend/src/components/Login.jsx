import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

const Login = () => {
  return (
    <>
      {/* opening div of layout */}
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-center py-2  text-3xl">Welcome Back</h1>
        <input
          type="text"
          placeholder="Email"
          className="lg:w-[400px] border-solid border-2 p-3 mt-8 rounded-full border-black my-2"
        />

        <input
          type="password"
          placeholder="Password"
          className="lg:w-[400px] border-solid border-2 p-3 rounded-full border-black my-2"
        />
        <button className="rounded-full h-12 border-2 mt-2 text-white bg-black border-black lg:w-[400px] md:w-[80px] w-[70px]">
          Sign in
        </button>
        <div className="flex py-4 pl-2  justify-center">
          <p>No Account?</p>
          <button className="text-blue-600 ml-2">Create one</button>
        </div>
        <p className="pl-9 mt-12 font-sans">
          Click “Sign in” to agree to Stories’s <a href="">Terms of Service </a>
          and acknowledge that Stories’s <a href="">Privacy Policy</a> applies
          to you.
        </p>
      </div>
    </>
  );
};

export default Login;
