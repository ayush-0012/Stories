import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import tajmahal from "../assets/tajmahal.jpg";
import Navbar from "./Navbar/Navbar";
import { checkEmail } from "../utils/validation";
import { checkPassword } from "../utils/validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../utils/axiosInstance";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    emailErrors: [],
    passwordErrors: [],
  });
  const [showPassword, setShowPassword] = useState(false);
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
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/auth/login",
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

        // localStorage.setItem("token", token);
        toast.success("Loggged In succesfully", {
          position: "top-center",
          theme: "dark",
        });
        return navigate("/feed", { replace: true });
      } else {
        console.log("login failed");
      }
    } catch (error) {
      if (error.message && error.response.status === 400) {
        toast.error(error.response.data.message, {
          position: "top-center",
          theme: "dark",
        });
        setErrors((prevErrors) => ({
          ...prevErrors,
        }));
      } else {
        toast.error("Something went wrong, Please try again later", {
          position: "top-center",
          theme: "dark",
        });
        setErrors((prevErrors) => ({
          ...prevErrors,
        }));
      }
      console.error(`Error logging in  the user : ${error}`);
    } finally {
      setLoading(false);
    }
  }
  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  return (
    <>
      <div className="min-h-screen bg-[#0a0a0f] text-gray-100">
        <Navbar />
        <div className="container mx-auto min-h-screen flex">
          {/* Left Side - Cool Image */}
          <motion.div
            className="hidden lg:block w-1/2 relative overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-transparent to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?auto=format&fit=crop&w=1200&q=80"
              alt="Vibrant aurora borealis over a mountain lake"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            className="w-full lg:w-1/2 flex items-center justify-center p-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-full max-w-md space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                  Welcome Back
                </h2>
                <p className="mt-2 text-gray-400">
                  Sign in to continue your journey
                </p>
              </div>

              <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                <div className="space-y-4">
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
                      placeholder="example@gmail.com"
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
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>

                <div className="text-center text-sm">
                  <p className="text-gray-400">
                    No Account?{" "}
                    <button
                      onClick={handleSignupRedirect}
                      className="text-orange-500 hover:text-orange-400"
                    >
                      Create one
                    </button>
                  </p>
                </div>

                <div className="text-center text-xs text-gray-400">
                  <p>
                    By clicking "Login" you agree to our{" "}
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
                    </a>{" "}
                    applies to you.
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
export default Login;
