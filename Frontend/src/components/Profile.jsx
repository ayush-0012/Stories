import React, { useEffect, useState } from "react";
import axios from "axios";
import "@uploadcare/react-uploader/core.css";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import MobileNav from "./Navbar/MobileNav";
import axiosInstance from "../utils/axiosInstance";

const Profile = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileStats, setProfileStats] = useState({
    followers: 0,
    following: 0,
    isFollowing: false,
  });

  const { userName } = useParams();
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await axiosInstance.get(`/posts/${userName}`);

        console.log(response.data);
        setUserPosts(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []);

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

  return (
    <>
      {/* PROFILE DIV */}
      <div className="flex justify-center mt-10 border-b border-b-gray-400 pb-10 ">
        <div className="flex">
          {/* PFP DIV */}
          <div>
            <div className="mr-32">
              <FaUserCircle className="mr-2 mt-2 w-20 h-20" />
            </div>
            <div>
              <label className="ml-1 cursor-pointer text-xs text-blue-500 py-2 rounded-md">
                uplaod photo
                <input type="file" name="upload photo" className="hidden" />
              </label>
            </div>
          </div>
          {/* PROFILE STATS DIV */}
          <div className="flex flex-wrap justify-between items-center ">
            <div>followers</div>
            <div>following</div>
            <div className="w-full text-center mt-4">
              <button className="">follow</button>
            </div>
          </div>
        </div>
      </div>

      {/* POST DIV */}
      <div className="grid justify-center w-full">
        <div className="lg:w-[600px]">
          {userPosts
            .slice()
            .reverse()
            .map((post) => {
              const formattedDate = new Date(post.createdAt).toLocaleDateString(
                "en-US",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              );

              return (
                // MAIN CONTENT DIV

                <div
                  className="flex cursor-pointer  lg:border-x border-x-gray-400"
                  // onClick={() => navigate("/post")}
                >
                  <div className="border-b border-b-gray-400 lg:w-full md:w-[600px] sm:w-[600px] w-full px-10 mt-4 ">
                    <div className="flex mb-3">
                      <FaUserCircle className="mr-2 mt-2 w-8 h-8" />
                      <p className="text-base font-sans font-bold mt-2">
                        {post.userId.userName}
                      </p>
                    </div>

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
                      {/* <div className="mr-4 font-sans text-gray-600 text-[12px]">
                        Likes
                      </div>
                      <div className="mr-4 font-sans text-gray-600 text-[12px]">
                        Comments
                      </div> */}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {/* <MobileNav /> */}
    </>
  );
};

export default Profile;
