import React, { useEffect, useState } from "react";
import { LuPenSquare } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import CommonNav from "./Navbar/CommonNav";
import MobileNav from "./Navbar/MobileNav";
import formatDate from "../utils/formatDate";

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

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div class="banter-loader">
          <div class="banter-loader__box"></div>
          <div class="banter-loader__box"></div>
          <div class="banter-loader__box"></div>
          <div class="banter-loader__box"></div>
          <div class="banter-loader__box"></div>
          <div class="banter-loader__box"></div>
          <div class="banter-loader__box"></div>
          <div class="banter-loader__box"></div>
          <div class="banter-loader__box"></div>
        </div>
      </div>
    );

  function handleLogout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/");
  }

  const handleWriteRedirect = () => {
    navigate("/write");
  };

  // const formatDate = (dateString) => {
  //   if (!dateString) return "";
  //   const date = new Date(dateString);
  //   const now = new Date();
  //   const diffInSeconds = Math.floor((now - date) / 1000);

  //   if (diffInSeconds < 60) return "just now";
  //   if (diffInSeconds < 3600)
  //     return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  //   if (diffInSeconds < 86400)
  //     return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  //   if (diffInSeconds < 2592000)
  //     return `${Math.floor(diffInSeconds / 86400)} days ago`;
  //   if (diffInSeconds < 31536000)
  //     return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  //   return `${Math.floor(diffInSeconds / 31536000)} years ago`;
  // };

  return (
    <>
      {/* FEED NAVBAR */}
      <nav className="flex justify-between w-full h-[50px]  items-center px-4  border-b border-bottom-2">
        <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold">Stories</h1>
        <div className="flex lg:justify-evenly justify-evenly w-[200px] h-[30px] items-center cursor-pointer">
          <div className="flex" onClick={() => handleWriteRedirect()}>
            <LuPenSquare className="w-7 h-6 text-gray-300" />
            <p className="font-sans text-gray-300">Write</p>
          </div>
          <div>
            <IoMdNotificationsOutline className="w-7 h-7 text-gray-300" />
          </div>

          <div className="relative">
            <button onClick={toggleDropdown} className="w-6 h-6">
              <FaUserCircle className="w-7 h-7 text-gray-300" />
            </button>
            {isOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-black border-2  ring-opacity-5 focus:outline-none">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <Link
                    to={`/${user.userName}`}
                    className="no-underline block px-4 py-2 text-sm text-white hover:bg-gray-800"
                    role="menuitem"
                  >
                    Profile
                  </Link>
                  <a
                    href="/settings"
                    className="no-underline block px-4 py-2 text-sm text-white hover:bg-gray-800 border-t border-gray-100"
                    role="menuitem"
                  >
                    Account Settings
                  </a>

                  <div className="border-t border-gray-100"></div>
                  <a
                    onClick={() => handleLogout()}
                    className="no-underline block px-4 py-2 text-sm text-white hover:bg-gray-800"
                    role="menuitem"
                  >
                    Logout
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* <MobileNav /> */}
        <CommonNav />
        {/* MAIN FEED DIV */}
        <div className="w-full mx-2 mb-16">
          <div className="w-full px-auto">
            {posts
              .slice()
              .reverse()
              .map((post) => {
                const timeAgo = formatDate(post.createdAt);
                return (
                  // MAIN CONTENT DIV

                  <Link
                    key={post._id}
                    to={`/post/${post.userId.userName}/${post._id}`}
                    className="no-underline"
                  >
                    <div
                      className="flex cursor-pointer"
                      // onClick={() => navigate("/post")}
                    >
                      <div className="border-b border-b-gray-500 rounded-md  w-full  px-6 mt-4 ">
                        <Link
                          to={`/${post.userId.userName}`}
                          className="no-underline"
                        >
                          <div className="flex mb-3">
                            <FaUserCircle className="mr-2 mt-2 w-8 h-8" />
                            <p className="text-base font-sans font-bold mt-2">
                              {post.userId.userName}
                            </p>
                          </div>
                        </Link>

                        {/* CONTENT DIV */}
                        <div className="ml-3">
                          <p className="text-2xl font-bold mb-3">
                            {post.titleValue}
                          </p>
                          <p className="text-gray-300 font-semibold font-sans line-clamp-2 overflow-hidden mb-6">
                            {post.storyValue}
                          </p>
                        </div>
                        {/* ACTION DIV */}
                        <div className="flex justify-start items-center mb-4 ml-3">
                          <div className="mr-4 font-sans text-gray-400 text-[12px]">
                            {timeAgo}
                          </div>
                          {/* <div className="flex items-center mr-4 font-sans text-gray-600 text-[12px]">
                            <button className="cursor-pointer">
                              <FcLike className="w-6 h-6 " />
                            </button>
                            <div className=" text-sm ml-1">1</div>
                          </div> */}
                          {/* <div className="mr-4 font-sans text-gray-600 text-[12px]">
                            Comments
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>

      {/* {isSmScreen ? <MobileNav user={user} /> : ""} */}
    </>
  );
}

export default Feed;
