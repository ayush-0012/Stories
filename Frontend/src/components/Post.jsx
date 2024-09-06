import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { MdHome } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import { IoIosNotifications } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

const Post = () => {
  const isLgScreen = useMediaQuery({ query: "(min-width : 1024px)" });

  return (
    <>
      <div className="flex justify-evenly mt-5  ">
        {/* SIDE NAVIGATION */}
        <aside className="ml-4 grid items-center pt-12 pr-10  ">
          {isLgScreen ? (
            <>
              <div className="ml-24">
                <ul className="space-y-6 ">
                  <li className="flex ">
                    <MdHome className="w-9 h-6 cursor-pointer" />
                    <p>Home</p>
                  </li>
                  <li className="flex ">
                    <IoSearchSharp className="w-9 h-6 cursor-pointer" />
                    <p>Explore</p>
                  </li>
                  <li className="flex ">
                    <FiMessageSquare className="w-9 h-6 cursor-pointer" />
                    <p>Messages</p>
                  </li>
                  <li className="flex">
                    <IoIosNotifications className="w-9 h-6 cursor-pointer" />
                    <p>Notifications</p>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="ml-4">
                <ul className="space-y-6 ">
                  <li>
                    <MdHome className="w-9 h-6 cursor-pointer" />
                  </li>
                  <li>
                    <IoSearchSharp className="w-9 h-6 cursor-pointer" />
                  </li>
                  <li>
                    <FiMessageSquare className="w-9 h-6 cursor-pointer" />
                  </li>
                  <li>
                    <IoIosNotifications className="w-9 h-6 cursor-pointer" />
                  </li>
                </ul>
              </div>
            </>
          )}
        </aside>

        {/* STORY DIV */}
        <div className="w-full px-8 border-l border-r border-black mr-14">
          <div className="flex items-center">
            <IoIosArrowBack className="mr-6 text-xl" />
            <p className="font-sans font-bold text-2xl">Post</p>
          </div>

          <div className="flex my-6 border-b border-black h-12 ">
            <div className="mr-2">
              <FaUserCircle className="h-9 w-9 " />
            </div>
            <div>userName</div>
          </div>

          <div>story</div>

          {/* ACTION DIV */}
          <div className="flex justify-starts mb-4 mt-2 border-b border-black">
            <div className="mr-4 font-sans text-gray-600 text-[12px]">date</div>
            <div className="mr-4 font-sans text-gray-600 text-[12px]">
              Likes
            </div>
            <div className="mr-4 font-sans text-gray-600 text-[12px] ">
              Comments
            </div>
          </div>

          <div className="flex mb-4 ">
            <div className="mr-4">
              <FaUserCircle className="h-9 w-9" />
            </div>
            <input
              type="text"
              placeholder="Post your reply"
              className="w-[500px] focus:outline-none "
            />
            <button className="bg-green-600 text-white font-sans w-20 rounded-full font-bold cursor-pointer">
              Reply
            </button>
          </div>

          <div>comments</div>
        </div>

        {isLgScreen ? <div className="w-[600px]">SUGGESTIONS BOX</div> : ""}
      </div>
    </>
  );
};

export default Post;
