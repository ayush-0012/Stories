import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { MdHome } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import { IoIosNotifications } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import axios from "axios";

const PostDetail = () => {
  const { id } = useParams();
  const [postDetail, setPostDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const isLgScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/posts/${id}`
        );
        setPostDetail(response.data);
        console.log(response);
      } catch (error) {
        console.log("error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [id]);

  if (loading) return <h1>Loading...</h1>;
  // if (!postDetail) return <h1>Error fetching post</h1>;

  const formattedDate = new Date(postDetail.createdAt).toLocaleDateString(
    "en-US",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <>
      <div className="flex mt-5 w-full  ">
        {/* SIDE NAVIGATION */}
        <aside className=" grid items-center pt-12 lg:px-5 lg:w-[400px] md:w-[100px] w-[100px] lg:mr-10  ">
          {isLgScreen ? (
            <>
              <div className="lg:px-14 cursor-pointer lg:w-[300px] md:w-[200px] ">
                <ul className="space-y-4 py-3 max-w-full">
                  <li className="side_nav_lg">
                    <MdHome className="w-10 h-7" />
                    <p>Home</p>
                  </li>
                  <li className="side_nav_lg">
                    <IoSearchSharp className="w-10 h-7" />
                    <p>Explore</p>
                  </li>
                  <li className="side_nav_lg">
                    <FiMessageSquare className="w-10 h-7" />
                    <p>Messages</p>
                  </li>
                  <li className="side_nav_lg">
                    <IoIosNotifications className="w-10 h-7" />
                    <p>Notifications</p>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="ml-4   w-[60px] ">
                <ul className="space-y-5 max-w-full max-h-full ">
                  <li className="side_nav_nonlg">
                    <MdHome className="w-10 h-7 " />
                  </li>
                  <li className="side_nav_nonlg">
                    <IoSearchSharp className="w-10 h-7" />
                  </li>
                  <li className="side_nav_nonlg">
                    <FiMessageSquare className="w-10 h-7" />
                  </li>
                  <li className="side_nav_nonlg">
                    <IoIosNotifications className="w-10 h-7" />
                  </li>
                </ul>
              </div>
            </>
          )}
        </aside>

        {/* STORY DIV */}
        <div className="lg:w-[700px] md:w-[600px] sm:w-[600px] w-[440px] px-8 border-l  md:border-r border-black mr-8 ">
          <div className="flex items-center">
            <IoIosArrowBack className="mr-6 text-xl" />
            <p className="font-sans font-bold text-2xl">Post</p>
          </div>

          <div className="flex my-6 border-b border-black h-12 ">
            <div className="mr-2">
              <FaUserCircle className="h-9 w-9 " />
            </div>
            <p className="font-sans font-bold">{postDetail.userId.userName}</p>
          </div>

          <div>{postDetail.storyValue}</div>

          {/* ACTION DIV */}
          <div className="flex justify-start w-full mb-4 mt-2 border-b border-black">
            <div className="mr-4 font-sans text-gray-600 text-[12px]">
              {formattedDate}
            </div>
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
            <button className="bg-green-600 text-white font-sans lg:w-20 md:w-20 w-32 rounded-full font-bold cursor-pointer">
              Reply
            </button>
          </div>

          <div>comments</div>
        </div>

        {/* SUGGESTION BOX
        {isLgScreen ? (
          <div className="lg:w-full md:w-[300px] hidden sm:block">
            SUGGESTIONS BOX
          </div>
        ) : (
          ""
        )} */}
      </div>
    </>
  );
};

export default PostDetail;
