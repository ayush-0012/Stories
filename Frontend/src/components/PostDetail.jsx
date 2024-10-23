import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { MdHome } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import { IoIosNotifications } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";

const PostDetail = () => {
  const { postId, userName } = useParams();
  const [postDetail, setPostDetail] = useState(null);
  const [commentValue, setCommentValue] = useState("");
  const [Comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [togglePostLike, settogglePostLike] = useState(false);
  const [toggleCommentLike, setToggleCommentLike] = useState(false);
  const [likesOnPost, setLikesOnPost] = useState(0);
  const [likesOncomments, setLikesOnComments] = useState(0);
  const [noOfComments, setNoOfComments] = useState(0);
  const navigate = useNavigate();
  const isLgScreenForNav = useMediaQuery({
    query: "(min-width: 800px)",
  });

  const isLgScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/posts/api/${userName}/${postId}`
        );
        setPostDetail(response.data);
      } catch (error) {
        console.log("error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [postId]);

  //to fetch comments
  useEffect(() => {
    fetchComments();
  }, []);

  async function fetchComments() {
    try {
      const response = await axios.get(
        `http://localhost:4000/posts/api/${userName}/${postId}`
      );

      setComments(response.data.comments);
      console.log("fetched comments successfully");
      console.log(response.data.comments);
    } catch (error) {
      console.log("error fetching comments", error);
    } finally {
      setCommentsLoading(false);
    }
  }

  async function postComment() {
    if (!commentValue.trim()) {
      toast.error("Commet cannot be empty");
      console.log("Comment cannot be empty");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:4000/posts/api/${userName}/${postId}/comments`,
        {
          commentValue,
          postId,
          userId,
        }
      );

      if (response.status === 201) {
        console.log("comment posted successfully");
        console.log(response.data);
        fetchComments();
        setCommentValue("");
      }
    } catch (error) {
      if (error.response.status === 500) {
        console.log("couldn't post comment, error occured");
      }
    }
  }

  function handlePostLike() {
    settogglePostLike(!togglePostLike);
    setLikesOnPost((prevValue) =>
      togglePostLike ? prevValue - 1 : prevValue + 1
    );
  }

  function handleCommentLike() {
    setToggleCommentLike(!toggleCommentLike);
    setLikesOnComments((prevValue) =>
      toggleCommentLike ? prevValue - 1 : prevValue + 1
    );
  }

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
      <div className="flex justify-center mt-5 w-full  ">
        {/* SIDE NAVIGATION */}
        <aside className="grid  pr-8  pt-12 lg:px-5 ml-3 lg:w-[220px] md:w-[200px] w-[100px]  ">
          {isLgScreenForNav ? (
            <>
              <div className="mr-6 cursor-pointer lg:w-[180px] md:w-[200px] ">
                <ul className="space-y-4 py-3 max-w-full">
                  <li className="side_nav_lg" onClick={() => navigate("/feed")}>
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
                <ul className="space-y-5 max-w-full max-h-full">
                  <li
                    className="side_nav_nonlg"
                    onClick={() => navigate("/feed")}
                  >
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
        <div className="lg:w-[700px] md:w-[600px] sm:w-[600px] w-[430px] px-5 border-l  md:border-r border-black mr-8 ">
          <div className="flex items-center">
            <IoIosArrowBack
              className="mr-6 text-xl cursor-pointer"
              onClick={() => navigate("/feed")}
            />
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
          <div className="flex justify-start items-center w-full mb-6 mt-8 pb-3 border-b border-black">
            <div className="mr-4 font-sans text-gray-600 text-[12px]">
              {formattedDate}
            </div>
            <div className="flex items-center mr-4 font-sans text-gray-600 text-[12px]">
              <button
                className="cursor-pointer"
                onClick={() => handlePostLike()}
              >
                {togglePostLike ? (
                  <FcLike className="w-6 h-6 " />
                ) : (
                  <FcLikePlaceholder className="w-6 h-6 " />
                )}
              </button>
              <div className=" text-sm ml-1">{likesOnPost}</div>
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
              className="w-[500px] focus:outline-none"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
            />
            <button
              className="bg-green-600 text-white font-sans lg:w-20 md:w-20 w-32 rounded-full font-bold cursor-pointer hover:bg-green-500 active:opacity-5 "
              onClick={() => postComment()}
            >
              Reply
            </button>
          </div>

          <div>
            {commentsLoading ? (
              <div className="mt-16 flex items-center justify-center">
                <div class="w-10 h-10 border-8 border-dashed rounded-full animate-spin border-black"></div>
              </div>
            ) : (
              ""
            )}
          </div>

          {/* COMMENTS DIV */}
          <div>
            {Comments.slice()
              .reverse()
              .map((comment) => {
                return (
                  // MAIN CONTENT DIV
                  <div className="flex cursor-pointer ">
                    <div className="border-b border-b-gray-400 lg:w-full md:w-[600px] sm:w-[600px] w-[400px]  mt-4 ">
                      <Link
                        to={`/${comment.userId.userName}`}
                        className="no-underline"
                      >
                        <div className="flex mb-3">
                          <FaUserCircle className="mr-2 mt-2 w-8 h-8" />
                          <p className="text-base font-sans font-bold mt-2">
                            {comment.userId.userName}
                          </p>
                        </div>
                        <div>
                          <p>{comment.commentValue}</p>
                        </div>
                      </Link>

                      {/* ACTION DIV */}
                      <div className="flex justify-start items-center my-3">
                        <div className="mr-4 font-sans text-gray-600 text-[12px]">
                          {formattedDate}
                        </div>
                        <div className="flex items-center mr-4 font-sans text-gray-600 text-[12px]">
                          <button
                            className="cursor-pointer"
                            onClick={() => handleCommentLike()}
                          >
                            {toggleCommentLike ? (
                              <FcLike className="w-6 h-6 " />
                            ) : (
                              <FcLikePlaceholder className="w-6 h-6 " />
                            )}
                          </button>
                          <div className=" text-sm ml-1">{likesOncomments}</div>
                        </div>
                        <div className="mr-4 font-sans text-gray-600 text-[12px] cursor-pointer">
                          Comments
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        {/* SUGGESTION BOX */}
        {isLgScreen ? (
          <div className="lg:w-[400px] md:w-[300px] hidden sm:block">
            SUGGESTIONS BOX
          </div>
        ) : (
          ""
        )}
      </div>
      <Toaster />
    </>
  );
};

export default PostDetail;
