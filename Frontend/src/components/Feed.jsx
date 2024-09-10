import React, { useEffect, useState } from "react";
import { LuPenSquare } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import userProfile from "../assets/profile4.jpg";
import { CiUser } from "react-icons/ci";
import axios from "axios";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const isLgScreen = useMediaQuery({ query: "(min-width : 1024px)" });
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/fetch/fetch-posts"
        );
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.log("Error fetching posts", error);
      }
    };

    fetchPosts();
  }, []);

  function handleLogout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    navigate("/");
  }

  const handleWriteRedirect = () => {
    navigate("/write");
  };

  return (
    <>
      {/* FEED NAVBAR */}
      <div className="flex justify-between w-full h-[50px]  items-center px-4  border-b border-bottom-2">
        <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold">Stories</h1>
        <div className="flex lg:justify-evenly justify-evenly w-[200px] h-[30px] items-center cursor-pointer">
          <div className="flex" onClick={() => handleWriteRedirect()}>
            <LuPenSquare className="w-7 h-6" />
            <p className="font-sans">Write</p>
          </div>
          <div>
            <IoMdNotificationsOutline className="w-7 h-7" />
          </div>
          <div className="relative">
            <button onClick={toggleDropdown} className="w-6 h-6">
              <FaUserCircle className="w-7 h-8 " />
            </button>
            {isOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <a
                    href="/profile"
                    className="no-underline block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Profile
                  </a>
                  <a
                    href="/settings"
                    className="no-underline block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Account Settings
                  </a>

                  <div className="border-t border-gray-100"></div>
                  <a
                    onClick={() => handleLogout()}
                    className="no-underline block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Logout
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MAIN FEED DIV */}

      <div className="flex mt-4">
        <div className="grid justify-center w-full">
          <div className="lg:w-[600px] ">
            {posts
              .slice()
              .reverse()
              .map((post) => {
                const formattedDate = new Date(
                  post.createdAt
                ).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                });

                return (
                  // MAIN CONTENT DIV
                  <>
                    <Link to={`/post/${post._id}`} className="no-underline">
                      <div
                        className="flex cursor-pointer"
                        // onClick={() => navigate("/post")}
                      >
                        <div
                          key={post._id}
                          className="border-b lg:w-full md:w-[600px] sm:w-[600px] w-[400px] px-10 border-b-gray-300 mb-4"
                        >
                          <Link
                            to={`/profile/${post.userId._id}`}
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
                            <p className="text-gray-500 font-sans line-clamp-2 overflow-hidden mb-6">
                              {post.storyValue}
                            </p>
                          </div>
                          {/* ACTION DIV */}
                          <div className="flex justify-starts mb-4 ml-3">
                            <div className="mr-4 font-sans text-gray-600 text-[12px]">
                              {formattedDate}
                            </div>
                            <div className="mr-4 font-sans text-gray-600 text-[12px]">
                              Likes
                            </div>
                            <div className="mr-4 font-sans text-gray-600 text-[12px]">
                              Comments
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </>
                );
              })}
          </div>
        </div>
        {/* SUGGESTIONS BOX */}
        {isLgScreen ? <div className="w-[600px]">SUGGESTIONS BOX</div> : ""}
      </div>
    </>
  );
}

export default Feed;
