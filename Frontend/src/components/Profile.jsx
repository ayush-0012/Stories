import React, { useEffect, useState } from "react";
import "@uploadcare/react-uploader/core.css";
import { FaUserCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import CommonNav from "./Navbar/CommonNav";
import formatDate from "../utils/formatDate";

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

  return (
    <>
      {/* PROFILE DIV */}

      <div className="flex justify-around w-full mt-10  pb-10 px-8 mb-5">
        {/* PFP DIV */}
        <div className="w-[150px]">
          <div className="mr-32">
            <FaUserCircle className="mr-2 mt-2 w-20 h-20" />
          </div>
          <div>
            <label className="ml-1 cursor-pointer text-xs text-blue-500 py-2 rounded-md">
              <input type="file" name="upload photo" className="hidden" />
            </label>
          </div>
        </div>
        {/* PROFILE STATS DIV */}
        <div className="flex flex-wrap items-center justify-around w-[500px]">
          <div className="text-center">
            <p>0</p>
            <p>followers</p>
          </div>
          <div className="text-center">
            <p>0</p>
            <p>following</p>
          </div>
          <div className="w-full text-center mt-4">
            <button className="bg-gray-700 w-full rounded-xl h-8 cursor-pointer">
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* POST DIV */}
      <div className="flex w-full">
        <CommonNav />
        <div className="w-full">
          {userPosts
            .slice()
            .reverse()
            .map((post) => {
              const timeAgo = formatDate(post.createdAt);

              return (
                // MAIN CONTENT DIV

                <div
                  className="flex cursor-pointer px-2 mb-5"
                  // onClick={() => navigate("/post")}
                >
                  <div className="rounded-lg border border-gray-800 bg-[#12121a] p-4 text-gray-100 shadow-sm transition-all hover:bg-[#16161f] w-full px-5 ">
                    <div className="flex mb-3">
                      <FaUserCircle className="mr-2 mt-2 w-8 h-8" />
                      <p className="text-base font-sans font-bold mt-2">
                        {post.userId.userName}
                      </p>
                    </div>

                    {/* CONTENT DIV */}
                    <Link
                      key={post._id}
                      to={`/post/${post.userId.userName}/${post._id}`}
                      className="no-underline"
                    >
                      <div className="ml-3">
                        <p className="text-2xl font-bold mb-3">
                          {post.titleValue}
                        </p>
                        <p className="text-gray-300 font-sans line-clamp-2 overflow-hidden mb-6">
                          {post.storyValue}
                        </p>
                      </div>
                    </Link>

                    {/* ACTION DIV */}
                    <div className="flex justify-starts mb-4 ml-3">
                      <div className="mr-4 font-sans text-gray-400 text-[12px]">
                        {timeAgo}
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
