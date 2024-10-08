import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { checkEmail, checkPassword, checkUserName } from "../utils/validation";
import axios from "axios";
import city from "../assets/city.jpg";
import Navbar from "./Navbar";
import "../global.css";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    emailErrors: [],
    passwordErrors: [],
    userNameErrors: [],
  });

  const navigate = useNavigate();

  //onSubmit function for user auth
  async function onSubmit(e) {
    e.preventDefault();

    const userNameResult = checkUserName(userName);
    const emailResult = checkEmail(email);
    const passwordResult = checkPassword(password);

    setErrors({
      userNameErrors: userNameResult.errors,
      emailErrors: emailResult.errors,
      passwordErrors: passwordResult.errors,
    });

    if (
      userNameResult.errors.length === 0 &&
      emailResult.errors.length === 0 &&
      passwordResult.errors.length === 0
    ) {
      await registerUser();
    }
  }

  const handleUserNameChange = async (e) => {
    setUserName(e.target.value);
    const userNameResult = checkUserName(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      userNameErrors: userNameResult.errors,
    }));
  };

  //email validation
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    const emailResult = checkEmail(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      emailErrors: emailResult.errors,
    }));
  };

  //password validation
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    const passwordResult = checkPassword(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      passwordErrors: passwordResult.errors,
    }));
  };

  //registering a user and navigating the user to feed
  async function registerUser() {
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/signup",
        {
          userName,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer {token}",
          },
        }
      );

      if (response.status === 201) {
        //setting userId
        const userId = response.data.userId;
        localStorage.setItem("userId", response.data.userId);
        console.log("User Created successfully", userId);

        //setting token
        localStorage.setItem("token", response.data.token);
        navigate("/feed");
        console.log("registered successfully", response.data);
        return;
      } else {
        toast.error("There is something wrong");
        console.log("registration failed");
      }
    } catch (error) {
      if (error.message && error?.response?.status === 400) {
        toast.error(error.response.data.message);
        setErrors((prevErrors) => ({
          ...prevErrors,
        }));
      } else {
        toast.error("Something went wrong, Please try again later");
        setErrors((prevErrors) => ({
          ...prevErrors,
          userNameErrors: ["Something went wrong, Please try again later"],
        }));

        // const notify = () => toast(errors.userNameErrors);
        // notify();
      }
      console.error(`Error registering the user : ${error}`);
    }
  }

  const handleLoginRedirect = () => {
    navigate("/login");
  };
  return (
    <>
      <Navbar />
      <div className="flex justify-between items-center lg:h-full md:h-[40.125rem] sm:h-[641px] ">
        <div className="lg:w-[45rem] md:w-0">
          <img
            src={city}
            alt="city"
            className="lg:w-[560px] lg:h-[700px] md:w-0 sm:w-0 sm:h-0 w-0 h-0"
          />
        </div>
        <form className="signUp_form" onSubmit={onSubmit} method="post">
          <h1 className="text-center pt-2 text-3xl ">Join Stories</h1>
          <div className="mt-4">
            <p className="pl-2">User Name</p>
            <input
              type="text"
              placeholder="Enter your User Name"
              className="lg:w-[400px] md:w-[450px] sm:w-[420px] w-[350px] border-solid border-2 p-3 rounded-full border-black my-1"
              onChange={handleUserNameChange}
              value={userName}
            />
            {errors.userNameErrors?.length > 0 && (
              <div className=" text-red-500 ">
                {errors.userNameErrors.join(", ")}
              </div>
            )}
          </div>
          <div className="mt-4">
            <p className="pl-2">Email</p>
            <input
              type="text"
              placeholder="example@gmail.com"
              className="lg:w-[400px] md:w-[450px] sm:w-[420px] w-[350px] border-solid border-2 p-3 rounded-full border-black my-1"
              onChange={handleEmailChange}
              value={email}
            />
            {errors.emailErrors?.length > 0 && (
              <div className=" text-red-500">
                {errors.emailErrors.join(", ")}
              </div>
            )}
          </div>
          <div className="mt-4">
            <p className="pl-2">Password</p>
            <input
              type="password"
              placeholder="Password"
              className="lg:w-[400px] md:w-[450px] sm:w-[420px] w-[350px] border-solid border-2 p-3 rounded-full border-black my-2"
              onChange={handlePasswordChange}
              value={password}
            />
            {errors.passwordErrors?.length > 0 && (
              <div className=" text-red-500">
                {errors.passwordErrors.join(", ")}
              </div>
            )}
          </div>
          <button
            className="rounded-full h-[50px] border-2 mt-2 py-3 text-white bg-black border-black lg:w-[400px] md:w-[450px] sm:w-[425px] w-[350px] "
            // onClick={() => registerUser()}
            type="submit"
          >
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
          <p className="pl-9 my-5 font-sans">
            Click “Sign up” to agree to Stories’s{" "}
            <a href="">Terms of Service </a>
            and acknowledge that Stories’s <a href="">Privacy Policy</a> applies
            to you.
          </p>
        </form>
      </div>
      <Toaster />
    </>
  );
};

export default SignUp;
