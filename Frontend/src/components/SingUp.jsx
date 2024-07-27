import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { checkEmail, checkPassword, checkUserName } from "../utils/validation";
import axios from "axios";
import city from "../assets/city.jpg";
import Navbar from "./Navbar";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    emailErrors: [],
    passwordErrors: [],
    userNameErrors: [],
  });
  // const [emailErrors, setEmailErrors] = useState([]);
  // const [passwordErrors, setPasswordErrors] = useState([]);
  // const [userNameErrors, setUserNameErrors] = useState([]);
  // const [errors, setErrors] = useState({
  //   emailErrors: [],
  //   passwordErrors: [],
  // });

  const navigate = useNavigate();

  //onSubmit function for user auth
  async function onSubmit(e) {
    e.preventDefault();

    const userNameResult = checkUserName(userName);
    const emailResult = checkEmail(email);
    const passwordResult = checkPassword(password);

    // setErrors.emailErrors(emailResult.errors);
    // setErrors.passwordErrors(passwordResult.errors);
    // console.log(passwordResult.errors);

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
        "http://localhost:4000/signup",
        {
          userName,
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
        localStorage.setItem("token", response.data.token);
        navigate("/feed");
        // window.location.href = "/feed";
        console.log("registered successfully");
        return;
      } else {
        console.log("registration failed");
      }
    } catch (error) {
      if (error.message && error.response.status === 400) {
        toast.error(error.response.data.message);
        setErrors((prevErrors) => ({
          ...prevErrors,
          // userNameErrors: [error.response.data.message],
        }));
      } else {
        toast.error("Something went wrong, Please try again later");
        setErrors((prevErrors) => ({
          ...prevErrors,
          userNameErrors: ["Something went wrong, Please try again later"],
        }));

        const notify = () => toast(userNameErrors);
        notify();
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
            className="lg:h-[638px] lg:w-[560px] md:h-[708px] md:w-0 sm:w-0 sm:h-0 w-0 h-0"
          />
        </div>
        <form
          className="flex flex-col justify-center items-center lg:h-[620px] lg:w-[500px] md:h-[610px] md:w-[580px] sm:h-[600px] sm:w-[500px] h-[630px] w-[400px] lg:my-0 lg:mx-[60px] md:mx-auto md:my-auto sm:my-auto sm:mx-auto mx-auto border-x-2 px-4 my-[6px]"
          onSubmit={onSubmit}
          method="post"
        >
          <h1 className="text-center py-4 text-3xl ">Join Stories</h1>
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
              <div className=" text-red-500">
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
