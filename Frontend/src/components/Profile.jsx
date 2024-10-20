import React, { useEffect, useState } from "react";
import axios from "axios";
import "@uploadcare/react-uploader/core.css";
import { FaUserCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { IoPushOutline } from "react-icons/io5";

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
        const response = await axios.get(
          `http://localhost:4000/posts/${userName}`
        );

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
      <div className="flex items-center justify-center w-full h-[100vh] text-gray-900 dark:text-gray-100 dark:bg-gray-950">
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
                  className="flex cursor-pointer  border-x border-x-gray-400"
                  // onClick={() => navigate("/post")}
                >
                  <div className="border-b border-b-gray-400 lg:w-full md:w-[600px] sm:w-[600px] w-[400px] px-10 mt-4 ">
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
                      <div className="mr-4 font-sans text-gray-600 text-[12px]">
                        Likes
                      </div>
                      <div className="mr-4 font-sans text-gray-600 text-[12px]">
                        Comments
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Profile;
