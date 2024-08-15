import React, { useEffect, useState } from "react";
import { LuPenSquare } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function Feed() {
  const [posts, setPosts] = useState([]);
  const titleValue = useSelector((state) => state.createPost.titleValue);
  const storyValue = useSelector((state) => state.createPost.storyValue);
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
      <div className="flex justify-between lg:w-full lg:h-[50px] items-center px-[100px] border-b border-bottom-2">
        <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold">Stories</h1>
        <div className="flex justify-between w-[200px] h-[30px] items-center cursor-pointer">
          <div className="flex  mr-2" onClick={() => handleWriteRedirect()}>
            <LuPenSquare className="lg:w-[40px] lg:h-[25px]" />
            <p className="font-sans">Write</p>
          </div>
          <div>
            <IoMdNotificationsOutline className="lg:w-[40px] lg:h-[25px]" />
          </div>
          <div>
            <CgProfile className="lg:w-[40px] lg:h-[25px]" />
          </div>
        </div>
      </div>

      {/* MAIN FEED DIV */}

      <div className="grid justify-center border-b border-black-2 min-w-max">
        <div className="lg:w-[600px]">
          {posts.map((post) => (
            <div key={post._id}>
              <div className="flex">
                <img src="" alt="profilePic" className="mr-2" />
                <p>{post.userName}</p>
              </div>
              ;{/* CONTENT DIV */}
              <div>
                <h2>{post.titleValue}</h2>
                <p>{post.storyValue}</p>
              </div>
              ;{/* ACTION DIV */}
              <div className="flex justify-starts">
                <div className="mr-4">{post.createdAt}</div>
                <div className="mr-4">Likes</div>
                <div className="mr-4">Comments</div>
              </div>
              ;
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Feed;
