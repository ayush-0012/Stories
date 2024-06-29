import React from "react";
import { useNavigate } from "react-router-dom";
import tajmahal from "../assets/tajmahal.jpg";

const Login = () => {
  const navigate = useNavigate();

  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="lg:w-[720px] md:w-0">
          <img
            src={tajmahal}
            alt="tajmahal"
            className="lg:h-[711px] lg:w-[560px] md:h-[711px] md:w-0 sm:w-0 sm:h-0 w-0 h-0"
          />
        </div>

        <div className="flex flex-col justify-center items-center lg:h-[540px] lg:w-[500px] md:h-[550px] md:w-[580px] sm:h-[500px] sm:w-[500px] h-[550px] w-[400px] lg:my-0 lg:mx-[60px] md:mx-auto md:my-auto sm:my-[100px] sm:mx-auto mx-auto my-[80px] rounded-lg border-2 border-solid border-gray-300 px-4">
          <h1 className="text-center py-2  text-3xl">Welcome Back</h1>
          <div className="mt-4">
            <p className="pl-2">Email</p>
            <input
              type="text"
              placeholder="Email"
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

          <button className="rounded-full h-12 border-2 lg:mt-2 md:mt-5 sm:mt-5 text-white bg-black border-black lg:w-[400px] md:w-[450px] sm:w-[420px] w-[350px] mt-5 ">
            Login
          </button>
          <div className="flex py-4 pl-2  justify-center">
            <p>No Account?</p>
            <button
              className="text-blue-600 ml-2 "
              onClick={() => handleSignupRedirect()}
            >
              Create one
            </button>
          </div>
          <p className="lg:pl-9 lg:mt-12 md:pl-6 md:mt-5 sm:pl-7 sm:mt-6 px-4 font-sans">
            Click “Login” to agree to Stories’s <a href="">Terms of Service </a>
            and acknowledge that Stories’s <a href="">Privacy Policy</a> applies
            to you.
          </p>
        </div>
      </div>
    </>
  );
};
export default Login;
