import React, { useEffect, useState } from "react";
import { LuPenSquare } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Feed() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const resposnse = await axios.get(
          "http://localhost:4000/fetch/fetch-posts"
        );
        setPosts(resposnse.data);
      } catch (error) {
        console.log("Error fetching posts", error);
      }
    };

    fetchPosts();
  }, []);

  const handleWriteRedirect = () => {
    navigate("/write");
  };

  return (
    <>
      {/* FEED NAVBAR */}
      <div className="flex justify-between w-full h-[50px]  items-center lg:px-[100px] px-11 border-b border-bottom-2">
        <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold">Stories</h1>
        <div className="flex lg:justify-evenly justify-evenly w-[200px] h-[30px] items-center cursor-pointer">
          <div className="flex" onClick={() => handleWriteRedirect()}>
            <LuPenSquare className="w-[40px] h-[25px]" />
            <p className="font-sans">Write</p>
          </div>
          <div>
            <IoMdNotificationsOutline className="w-[40px] h-[25px]" />
          </div>
          <div>
            <CgProfile className="w-[40px] h-[25px]" />
          </div>
        </div>
      </div>

      {/* MAIN FEED DIV */}

      <div className="grid justify-center  min-w-max ">
        <div className="lg:w-[600px] ">
          {posts.map((post) => {
            const formattedDate = new Date(post.createdAt).toLocaleDateString(
              "en-US",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }
            );

            return (
              <div key={post._id} className="border-b border-b-gray-300 mb-4">
                <div className="flex">
                  <img src="" alt="profilePic" className="mr-2" />
                  <p>{post.user}</p>
                </div>
                {/* CONTENT DIV */}
                <div>
                  <p className="text-2xl mb-3">{post.titleValue}</p>
                  <p className="text-gray-500 font-sans line-clamp-2 overflow-hidden mb-6">
                    {post.storyValue}
                  </p>
                </div>
                {/* ACTION DIV */}
                <div className="flex justify-starts">
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
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Feed;
