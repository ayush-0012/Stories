import React from "react";
import Hero from "./Hero";
import Navbar from "./Navbar/Navbar";
import { Navigate } from "react-router-dom";

const Home = () => {
  const userId = localStorage.getItem("userId");

  if (userId) {
    window.location.href = "/feed";
  }
  return (
    <>
      {/* <Navbar /> */}
      <Hero />
      {/* <Footer /> */}
    </>
  );
};

export default Home;
