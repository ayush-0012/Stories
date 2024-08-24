import React, { useEffect, useState } from "react";
import { LuPenSquare } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
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
          <div className="relative ">
            <button onClick={toggleDropdown} className="w-[40px] h-[25px]">
              <CgProfile className="w-[40px] h-[25px]" />
            </button>
            {isOpen && (
              <div className="absolute right-0  mt-2 w-72 bg-white border border-gray-300 shadow-lg rounded">
                <ul>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full block px-4 py-2 text-gray-700 hover:bg-gray-100 "
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MAIN FEED DIV */}

      <div className="flex">
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
                    <div className="flex">
                      <div
                        key={post._id}
                        className="border-b lg:w-full md:w-[600px] sm:w-[600px] w-[400px] border-b-gray-300 mb-4"
                      >
                        <div className="flex">
                          <img src="" alt="profilePic" className="mr-2" />
                          <p>{post.userId.userName}</p>
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
                    </div>
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
