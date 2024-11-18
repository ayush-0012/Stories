import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkEmail, checkPassword, checkUserName } from "../utils/validation";
import city from "../assets/city.jpg";
import Navbar from "./Navbar/Navbar";
import axiosInstance from "../utils/axiosInstance";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    emailErrors: [],
    passwordErrors: [],
    userNameErrors: [],
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/auth/signup",
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

      console.log(response.data);
      if (response.status === 201) {
        //setting userId
        const userId = response.data.userId;
        localStorage.setItem("userId", userId);
        localStorage.setItem("userName", userName);
        console.log("User Created successfully", userId);

        //setting token
        localStorage.setItem("token", response.data.token);
        return navigate("/feed", { replace: true });
      } else {
        toast.error("There is something wrong", {
          position: "top-center",
          theme: "dark",
        });
        console.log("registration failed");
      }
    } catch (error) {
      if (error.message && error?.response?.status === 400) {
        toast.error(error.response.data.message);
        setErrors((prevErrors) => ({
          ...prevErrors,
        }));
      } else {
        toast.error("Something went wrong, Please try again later", {
          theme: "dark",
          position: "top-center",
        });
        setErrors((prevErrors) => ({
          ...prevErrors,
          userNameErrors: ["Something went wrong, Please try again later"],
        }));

        // const notify = () => toast(errors.userNameErrors);
        // notify();
      }
      console.error(`Error registering the user : ${error}`);
    } finally {
      setLoading(false);
    }
  }

  const handleLoginRedirect = () => {
    navigate("/login");
  };
  return (
    <>
      <div className="min-h-screen bg-[#0a0a0f] text-gray-100">
        <Navbar />
        <div className="container mx-auto min-h-screen flex">
          {/* Left Side - Hero Image */}
          <motion.div
            className="hidden lg:block w-1/2 relative overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-transparent to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?auto=format&fit=crop&w=1200&q=80"
              alt="City skyline at sunset"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>

          {/* Right Side - Sign Up Form */}
          <motion.div
            className="w-full lg:w-1/2 flex items-center justify-center p-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-full max-w-md space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                  Join Stories
                </h2>
                <p className="mt-2 text-gray-400">
                  Start your journey with us today
                </p>
              </div>

              <form
                className="mt-8 space-y-6"
                onSubmit={onSubmit}
                method="post"
              >
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Username
                    </label>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      className="mt-1 block w-full px-4 py-3 rounded-lg bg-[#12121a] border border-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                      placeholder="Enter your username"
                      value={userName}
                      onChange={handleUserNameChange}
                    />
                    {errors.userNameErrors?.length > 0 && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.userNameErrors.join(", ")}
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="mt-1 block w-full px-4 py-3 rounded-lg bg-[#12121a] border border-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                      placeholder="Enter your email"
                      value={email}
                      onChange={handleEmailChange}
                    />
                    {errors.emailErrors?.length > 0 && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.emailErrors.join(", ")}
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Password
                    </label>
                    <div className="mt-1 relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        className="block w-full px-4 py-3 rounded-lg bg-[#12121a] border border-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                        placeholder="Enter your password"
                        value={password}
                        onChange={handlePasswordChange}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                    {errors.passwordErrors?.length > 0 && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.passwordErrors.join(", ")}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full px-4 py-3 text-white rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-90 transition-opacity font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 flex items-center justify-center ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Signing up...
                    </>
                  ) : (
                    "Sign up"
                  )}
                </button>

                <div className="text-center text-sm">
                  <p className="text-gray-400">
                    Already have an account?{" "}
                    <button
                      onClick={handleLoginRedirect}
                      className="text-orange-500 hover:text-orange-400"
                    >
                      Login
                    </button>
                  </p>
                </div>

                <div className="text-center text-xs text-gray-400">
                  <p>
                    By clicking "Sign up" you agree to our{" "}
                    <a
                      href="/terms"
                      className="text-orange-500 hover:text-orange-400"
                    >
                      Terms of Service
                    </a>{" "}
                    and acknowledge our{" "}
                    <a
                      href="/privacy"
                      className="text-orange-500 hover:text-orange-400"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Background Gradient */}
        <div className="fixed inset-0 -z-10 bg-[#0a0a0f]">
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-transparent to-amber-500/10 animate-gradient" />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignUp;
