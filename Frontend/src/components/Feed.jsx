import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import CommonNav from "./Navbar/CommonNav";
import formatDate from "../utils/formatDate";
import {
  Bell,
  User2,
  SquarePen,
  Home,
  Search,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import MobileNav from "./Navbar/MobileNav";

const NavItem = ({ icon: Icon, label, to, active }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-all hover:text-white no-underline ${
      active ? "bg-[#16161f] text-white" : ""
    }`}
  >
    <Icon className="h-4 w-4" />
    <span className="hidden md:inline-block">{label}</span>
  </Link>
);

const Button = ({ children, className, ...props }) => (
  <button
    className={`rounded-md px-4 py-2 font-medium transition-colors ${className}`}
    {...props}
  >
    {children}
  </button>
);

function Feed() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  // const isLgScreen = useMediaQuery({ query: "(min-width : 900px)" });
  // const isSmScreen = useMediaQuery({ query: "(max-width : 600px)" });
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get("/posts/fetch-posts");

        console.log(response.data);
        setPosts(response.data);
        // console.log(response.data);
        console.log(posts);
      } catch (error) {
        console.log("Error fetching posts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (!userId) {
      console.log("userId is not available");
    }

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`/users/${userId}`);

        setUser(response.data);
      } catch (error) {
        console.log("error fetching user", error);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0f]">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-t-4 border-orange-500 rounded-full animate-spin"></div>
          <div className="absolute inset-4 border-t-4 border-amber-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  function handleLogout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    window.location.href = "/";
  }

  const handleWriteRedirect = () => {
    navigate("/write");
  };

  return (
    <>
      <div className="min-h-screen bg-[#0a0a0f] text-gray-100">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#0a0a0f]/95 backdrop-blur">
          <div className="container mx-auto flex h-14 items-center justify-between px-4">
            <div className="flex items-center gap-4 md:gap-6">
              <Link
                to="/"
                className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent no-underline"
              >
                Stories
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate("/write")}
                className="text-gray-400 hover:text-white flex items-center gap-2"
              >
                <SquarePen className="h-5 w-5" />
                <span className="hidden sm:inline">Write</span>
              </Button>
              <Button className="text-gray-400 hover:text-white">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="relative">
                <Button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-gray-400 hover:text-white"
                >
                  <User2 className="h-5 w-5" />
                </Button>

                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-56 rounded-lg border border-gray-800 bg-[#12121a] shadow-lg"
                  >
                    {user && (
                      <Link
                        to={`/${user.userName}`}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#16161f] no-underline"
                      >
                        Profile
                      </Link>
                    )}
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#16161f] no-underline"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#16161f] border-t border-gray-800"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto flex">
          {/* Sidebar */}
          <CommonNav />

          {/* Main Content */}
          <main className="flex-1 w-full md:ml-64 mb-16">
            <div className="max-w-6xl mx-auto p-4 space-y-4">
              {posts
                .slice()
                .reverse()
                .map((post) => (
                  <motion.article
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg border border-gray-800 bg-[#12121a] p-6 hover:bg-[#16161f] transition-colors"
                  >
                    <Link
                      to={`/${post.userId.userName}`}
                      className="no-underline"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold">
                          {post.userId.userName[0].toUpperCase()}
                        </div>
                        <div>
                          <h3 className="text-white font-medium">
                            {post.userId.userName}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {formatDate(post.createdAt)}
                          </p>
                        </div>
                      </div>
                    </Link>

                    <Link
                      to={`/post/${post.userId.userName}/${post._id}`}
                      className="no-underline"
                    >
                      <h2 className="text-xl font-bold text-white mb-2">
                        {post.titleValue}
                      </h2>
                      <p className="text-gray-400 line-clamp-3">
                        {post.storyValue}
                      </p>
                    </Link>
                  </motion.article>
                ))}
            </div>
          </main>
        </div>
      </div>

      {/* {isSmScreen ? <MobileNav user={user} /> : ""} */}
    </>
  );
}

export default Feed;
