import React from "react";
import oldSchool from "../assets/oldschool.jfif";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Hero = () => {
  return (
    <>
      <Navbar />
      <div className="w-full h-full flex  ">
        {/* MID SECTION */}
        <div className="lg:w-full md:w-full md:h-[600px] lg:py-[170px] lg:px-[100px] md:py-[170px] md:px-[40px] sm:py-[160px] sm:px-[50px] py-[200px] px-[40px]">
          <h1 className="lg:text-7xl md:text-7xl sm:text-7xl text-5xl font-bold text-gray-800">
            Your Stories and Experiences
          </h1>
          <p className=" lg:text-xl md:text-xl sm:text-lg text-lg py-8 lg:pl-6 md:pl-4 pl-2">
            A space to read, write, and deepen your understanding.
          </p>
          <button className="rounded-full h-9 border-2 text-white bg-black border-black w-[120px] lg:ml-6 md:ml-4 ml-2">
            Get Started
          </button>
        </div>

        {/* RIGHT SECTION IMAGE */}
      </div>
      <Footer />
    </>
  );
};

export default Hero;
