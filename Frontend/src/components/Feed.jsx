import React, { useEffect, useState } from "react";
import { LuPenSquare } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  const isLgScreenForNav = useMediaQuery({
    query: "(min-width: 800px)",
  });

  const isLgScreen = useMediaQuery({ query: "(min-width : 900px)" });
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/posts/fetch-posts"
        );

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
        const response = await axios.get(
          `http://localhost:4000/users/${userId}`
        );

        setUser(response.data);
        console.log(response);
      } catch (error) {
        console.log("error fetching user", error);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading)
    return (
      <div className="flex items-center justify-center w-full h-[100vh] text-gray-300 dark:text-gray-100 dark:bg-gray-950">
        <div>
          <h1 className="text-xl md:text-7xl font-bold flex items-center">
            L
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              className="animate-spin"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM13.6695 15.9999H10.3295L8.95053 17.8969L9.5044 19.6031C10.2897 19.8607 11.1286 20 12 20C12.8714 20 13.7103 19.8607 14.4956 19.6031L15.0485 17.8969L13.6695 15.9999ZM5.29354 10.8719L4.00222 11.8095L4 12C4 13.7297 4.54894 15.3312 5.4821 16.6397L7.39254 16.6399L8.71453 14.8199L7.68654 11.6499L5.29354 10.8719ZM18.7055 10.8719L16.3125 11.6499L15.2845 14.8199L16.6065 16.6399L18.5179 16.6397C19.4511 15.3312 20 13.7297 20 12L19.997 11.81L18.7055 10.8719ZM12 9.536L9.656 11.238L10.552 14H13.447L14.343 11.238L12 9.536ZM14.2914 4.33299L12.9995 5.27293V7.78993L15.6935 9.74693L17.9325 9.01993L18.4867 7.3168C17.467 5.90685 15.9988 4.84254 14.2914 4.33299ZM9.70757 4.33329C8.00021 4.84307 6.53216 5.90762 5.51261 7.31778L6.06653 9.01993L8.30554 9.74693L10.9995 7.78993V5.27293L9.70757 4.33329Z"></path>
            </svg>{" "}
            ading . . .
          </h1>
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

  return (
    <>
      {/* FEED NAVBAR */}
      <nav className="flex justify-between w-full h-[50px]  items-center px-4  border-b border-bottom-2">
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
                  <Link
                    to={`/${user.userName}`}
                    className="no-underline block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Profile
                  </Link>
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
      </nav>

      <div className="flex">
        {/* MAIN FEED DIV */}
        <div className="grid justify-center w-full">
          <div className="lg:w-[600px]">
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

                  <Link
                    key={post._id}
                    to={`/post/${post.userId.userName}/${post._id}`}
                    className="no-underline"
                  >
                    <div
                      className="flex cursor-pointer  border-x border-x-gray-400"
                      // onClick={() => navigate("/post")}
                    >
                      <div className="border-b border-b-gray-400 lg:w-full md:w-[600px] sm:w-[600px] w-[400px] px-10 mt-4 ">
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
                          <div className="mr-4 font-sans text-gray-600 text-[12px]">
                            {formattedDate}
                          </div>
                          <div className="flex items-center mr-4 font-sans text-gray-600 text-[12px]">
                            <button className="cursor-pointer">
                              <FcLike className="w-6 h-6 " />
                            </button>
                            <div className=" text-sm ml-1">1</div>
                          </div>
                          <div className="mr-4 font-sans text-gray-600 text-[12px]">
                            Comments
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
        {/* SUGGESTIONS BOX */}
        {isLgScreen ? (
          <div className="w-[600px] ml-10">SUGGESTIONS BOX</div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Feed;
