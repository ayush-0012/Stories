import React, { useEffect, useState } from "react";
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
        setUserPosts(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [userName]);

  const getInitials = (name) => {
    return name.charAt(0).toUpperCase();
  };

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
    <div className="min-h-screen bg-[#0a0a0f] text-gray-100">
      <div className="flex">
        {/* Sidebar */}

        <CommonNav />

        {/* Main Content */}
        <main className="flex-1">
          {/* Profile Section */}
          <div className="border-b border-gray-800 px-4 py-8">
            <div className="mx-auto max-w-4xl">
              <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
                {/* Profile Picture */}
                <div className="relative h-24 w-24 overflow-hidden rounded-full bg-gray-800">
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-500 to-yellow-500 text-2xl font-bold text-white">
                    {getInitials(userName)}
                  </div>
                  <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/50 opacity-0 transition-opacity hover:opacity-100">
                    <input type="file" className="hidden" accept="image/*" />
                    <span className="text-sm font-medium text-white">
                      Change
                    </span>
                  </label>
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  <h1 className="mb-4 text-2xl font-bold">{userName}</h1>
                  <div className="flex gap-6">
                    <div>
                      <span className="text-xl font-bold">
                        {profileStats.followers}
                      </span>
                      <span className="ml-2 text-gray-400">followers</span>
                    </div>
                    <div>
                      <span className="text-xl font-bold">
                        {profileStats.following}
                      </span>
                      <span className="ml-2 text-gray-400">following</span>
                    </div>
                  </div>
                  <button className="mt-4 rounded-lg bg-gray-800 px-6 py-2 font-medium text-white transition-colors hover:bg-gray-700">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="mx-auto max-w-5xl px-4 py-6 mb-16">
            <div className="space-y-4">
              {userPosts
                .slice()
                .reverse()
                .map((post) => (
                  <Link
                    key={post._id}
                    to={`/post/${post.userId.userName}/${post._id}`}
                    className="block no-underline"
                  >
                    <div className="rounded-lg border border-gray-800 bg-[#12121a] p-4 transition-all hover:bg-[#16161f]">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 text-lg font-bold text-white">
                          {getInitials(post.userId.userName)}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-100">
                            {post.userId.userName}
                          </span>
                          <span className="text-sm text-gray-500">
                            {formatDate(post.createdAt)}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h2 className="text-xl font-bold text-gray-100">
                          {post.titleValue}
                        </h2>
                        <p className="line-clamp-2 text-gray-400">
                          {post.storyValue}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
