import React, { useEffect, useState } from "react";
import { LuPenSquare } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import CommonNav from "./Navbar/CommonNav";
import formatDate from "../utils/formatDate";
import {
  Bell,
  Home,
  MessageCircle,
  Search,
  Settings,
  User2,
  Menu,
  SquarePen,
} from "lucide-react";

// const NavItem = ({ className, icon: Icon, label }) => (
//   <a
//     href="#"
//     className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-all hover:text-white no-underline ${className}`}
//   >
//     <Icon className="h-4 w-4" />
//     <span className="hidden md:inline-block">{label}</span>
//   </a>
// );

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
    window.location.href = "/";
  }

  const handleWriteRedirect = () => {
    navigate("/write");
  };

  return (
    <>
      {/* FEED NAVBAR */}
      {/* <nav className="flex justify-between w-full h-[50px]  items-center px-4  border-b border-bottom-2">
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
      </nav> */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#0a0a0f]/95 backdrop-blur">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-4 md:gap-6">
            <a
              href="/"
              className="flex items-center gap-2 font-semibold text-white text-2xl no-underline"
            >
              Stories
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Button
              className="text-gray-400 hover:text-white"
              onClick={() => navigate("/write")}
            >
              <SquarePen className="h-5 w-5" />
              <span className="sr-only">write</span>
            </Button>
            <Button className="text-gray-400 hover:text-white">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button
              className="text-gray-400 hover:text-white"
              onClick={toggleDropdown}
            >
              <User2 className="h-5 w-5" />
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
              <span className="sr-only">Profile</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex min-h-screen bg-black">
        {/* <MobileNav /> */}

        <CommonNav />
        {/* <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 transform overflow-y-auto bg-[#0a0a0f] p-4 transition-transform duration-200 ease-in-out md:static md:translate-x-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <nav className="flex flex-col gap-2">
            <NavItem icon={Home} label="Home" />
            <NavItem icon={Search} label="Explore" />
            <NavItem icon={MessageCircle} label="Messages" />
            <NavItem icon={Bell} label="Notifications" />
          </nav>
        </aside> */}
        {/* MAIN FEED DIV */}
        <div className="w-full mx-2 mb-16 overflow-y-auto relative">
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
                      className="flex cursor-pointer mt-2"
                      // onClick={() => navigate("/post")}
                    >
                      <div className="w-full rounded-lg border border-gray-800 bg-[#12121a] p-4 text-gray-100 shadow-sm transition-all hover:bg-[#16161f]">
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
