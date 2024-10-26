import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import tajmahal from "../assets/tajmahal.jpg";
import Navbar from "./Navbar";
import { checkEmail } from "../utils/validation";
import { checkPassword } from "../utils/validation";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    emailErrors: [],
    passwordErrors: [],
  });
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();

    const emailResult = checkEmail(email);
    const passwordResult = checkPassword(password);

    setErrors({
      emailErrors: emailResult.errors,
      passwordErrors: passwordResult.errors,
    });

    if (emailResult.errors.length === 0 && passwordResult.errors.length === 0) {
      await authenticateUser();
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    const emailResult = checkEmail(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      emailErrors: emailResult.errors,
    }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    const passwordResult = checkPassword(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      passwordErrors: passwordResult.errors,
    }));
  };

  async function authenticateUser() {
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        //setting userId in localStorage
        const { userId, token } = response.data;

        localStorage.setItem("userId", userId);
        localStorage.setItem("token", token);
        return navigate("/feed", { replace: true });
      } else {
        console.log("login failed");
      }
    } catch (error) {
      if (error.message && error.response.status === 400) {
        toast.error(error.response.data.message);
        setErrors((prevErrors) => ({
          ...prevErrors,
        }));
      } else {
        toast.error("Something went wrong, Please try again later");
        setErrors((prevErrors) => ({
          ...prevErrors,
        }));
      }
      console.error(`Error logging in  the user : ${error}`);
    }
  }
  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-between items-center lg:h-full md:h-[642px] sm:h-[630px]">
        <div className="lg:w-[720px] md:w-0">
          <img
            src={tajmahal}
            alt="tajmahal"
            className="lg:h-[700px] lg:w-[560px]  md:w-0 sm:w-0 sm:h-0 w-0 h-0"
          />
        </div>

        <form className="login_form" onSubmit={onSubmit}>
          <h1 className="text-center py-2  text-3xl">Welcome Back</h1>
          <div className="mt-4">
            <p className="pl-2">Email</p>
            <input
              type="text"
              placeholder="example@gmail.com"
              className="lg:w-[400px] md:w-[450px] sm:w-[420px] w-[320px] border-solid border-2 p-3 rounded-full text-black border-black my-2 focus:outline-none"
              onChange={handleEmailChange}
            />
            {errors.emailErrors?.length > 0 && (
              <div className=" text-red-600">
                {errors.emailErrors.join(", ")}
              </div>
            )}
          </div>
          <div className="mt-4">
            <p className="pl-2">Password</p>
            <input
              type="password"
              placeholder="Password"
              className="lg:w-[400px] md:w-[450px] sm:w-[420px] w-[320px] border-solid border-2 p-3 rounded-full text-black border-black my-2 focus:outline-none"
              onChange={handlePasswordChange}
            />
            {errors.passwordErrors?.length > 0 && (
              <div className=" text-red-600">
                {errors.emailErrors.join(", ")}
              </div>
            )}
          </div>

          <button
            className="rounded-full h-12 border-2 lg:mt-2 md:mt-5 sm:mt-5 text-white bg-black border-gray-400 lg:w-[400px] md:w-[450px] sm:w-[420px] w-[320px] mt-5 hover:bg-gray-900 active:bg-opacity-5"
            type="submit"
          >
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

          <div className="text-center pl-4">
            <p className="w-92 lg:pl-9 lg:mt-5 md:pl-6 md:mt-5 sm:pl-7 sm:mt-6 px-14 font-sans">
              Click “Login” to agree to Stories’s{" "}
              <a href="">Terms of Service </a>
              and acknowledge that Stories’s <a href="">Privacy Policy</a>{" "}
              applies to you.
            </p>
          </div>
        </form>
      </div>
      <Toaster />
    </>
  );
};
export default Login;
