import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleSignupRedirect = () => {
    navigate("/signup");
  };
  return (
    <>
      <div className="w-full h-full flex  ">
        {/* MID SECTION */}
        <div className="lg:w-full md:w-full md:h-[600px] lg:py-[170px] lg:px-[100px] md:py-[170px] md:px-[40px] sm:py-[160px] sm:px-[50px] py-[200px] px-[40px]">
          <h1 className="lg:text-7xl md:text-7xl sm:text-7xl text-[38px] font-bold text-gray-800">
            Your Stories and Experiences
          </h1>
          <p className=" lg:text-xl md:text-xl sm:text-lg text-lg py-4 lg:pl-6 md:pl-4 pl-2">
            A space to read, write and share about you and your life.
          </p>
          <button
            className="rounded-full h-9 border-2 text-white bg-black border-black w-[120px] lg:ml-6 md:ml-4 ml-2"
            onClick={() => handleSignupRedirect()}
          >
            Get Started
          </button>
        </div>

        {/* RIGHT SECTION IMAGE */}
      </div>
    </>
  );
};

export default Hero;
