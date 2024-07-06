import React from "react";
import { useNavigate } from "react-router-dom";
import city from "../assets/city.jpg";
import Navbar from "./Navbar";

const SingUp = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };
  return (
    <>
      <Navbar />
      <div className="flex justify-between items-center lg:h-full md:h-[642px] sm:h-[630px] ">
        <div className="lg:w-[720px] md:w-0">
          <img
            src={city}
            alt="tajmahal"
            className="lg:h-[638px] lg:w-[560px] md:h-[708px] md:w-0 sm:w-0 sm:h-0 w-0 h-0"
          />
        </div>
        <div className="flex flex-col justify-center items-center lg:h-[540px] lg:w-[500px] md:h-[550px] md:w-[580px] sm:h-[500px] sm:w-[500px] h-[550px] w-[400px] lg:my-0 lg:mx-[60px] md:mx-auto md:my-auto sm:my-auto sm:mx-auto mx-auto my-[46px] rounded-lg border-2 border-solid border-gray-300 px-4">
          <h1 className="text-center py-2  text-3xl">Join Stories</h1>
          <div className="mt-4">
            <p className="pl-2">Email</p>
            <input
              type="text"
              placeholder="example@gmail.com"
              className="lg:w-[400px] md:w-[450px] sm:w-[420px] w-[350px] border-solid border-2 p-3 rounded-full border-black my-2"
            />
          </div>
          <div className="mt-4">
            <p className="pl-2">Password</p>
            <input
              type="password"
              placeholder="Password"
              className="lg:w-[400px] md:w-[450px] sm:w-[420px] w-[350px] border-solid border-2 p-3 rounded-full border-black my-2"
            />
          </div>
          <button className="rounded-full h-12 border-2 lg:mt-2 md:mt-5 sm:mt-5 text-white bg-black border-black lg:w-[400px] md:w-[450px] sm:w-[420px] w-[350px] mt-5">
            Sign up
          </button>
          <div className="flex py-4 pl-2  justify-center">
            <p>Already have an account?</p>
            <button
              className="text-blue-600 ml-2"
              onClick={() => handleLoginRedirect()}
            >
              Login
            </button>
          </div>
          <p className="pl-9 mt-12 font-sans">
            Click “Sign up” to agree to Stories’s{" "}
            <a href="">Terms of Service </a>
            and acknowledge that Stories’s <a href="">Privacy Policy</a> applies
            to you.
          </p>
        </div>
      </div>
    </>
  );
};

export default SingUp;
