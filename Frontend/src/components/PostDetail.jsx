import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import Comments from "./Comments";
import CommonNav from "./Navbar/CommonNav";
import axiosInstance from "../utils/axiosInstance";

const PostDetail = () => {
  const { postId, userName } = useParams();
  const [postDetail, setPostDetail] = useState(null);
  const [commentValue, setCommentValue] = useState("");
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [postLike, setPostLike] = useState({
    toggle: false,
    count: 0,
  });
  const [commentsLike, setCommentsLikes] = useState({});

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
        const response = await axiosInstance.get(
          `/posts/api/${userName}/${postId}`
        );
        setPostDetail(response.data);

        const post = response.data;
        const hasLiked = post.likesOnPost.includes(userId);
        setPostLike({ toggle: hasLiked, count: post.likesOnPost.length });
      } catch (error) {
        console.log("error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [postId]);

  useEffect(() => {
    async function fetchPostLikes() {
      try {
        const response = await axiosInstance.get(
          `/posts/api/fetch/post/likes/${postId}`
        );

        // console.log(response.data);
        setPostLike((prevValue) => ({
          ...prevValue,
          count: response.data.likeCount,
        }));

        // console.log(postLike.toggle);
      } catch (error) {
        console.log("error fetching like count", error);
      }
    }

    fetchPostLikes();
  }, []);

  //to fetch comments
  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    if (!Array.isArray(comments) || comments.length === 0) return;

    comments.forEach((comment) => {
      axiosInstance
        .get(`/comments/api/comment/likes/${comment._id}`)
        .then((response) => {
          setCommentsLikes((prev) => ({
            ...prev,
            [comment._id]: {
              toggle: response.data.hasLiked,
              count: response.data.likesCount,
            },
          }));
        })
        .catch((error) => {
          console.error("Error fetching comment likes:", error);
        });
    });
  }, [comments]);

  async function postComment() {
    if (!commentValue.trim()) {
      toast.error("Commet cannot be empty", {
        position: "top-center",
        theme: "dark",
      });
      return;
    }

    try {
      const response = await axiosInstance.post(
        `/posts/api/${userName}/${postId}/comments`,
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
        toast.success("Comment posted successfully", {
          theme: "dark",
          position: "top-center",
        });
      }
    } catch (error) {
      if (error.response.status === 500) {
        console.log("couldn't post comment, error occured");
      }
    }
  }

  async function fetchComments() {
    try {
      const response = await axiosInstance.get(
        `/posts/api/${userName}/${postId}`
      );

      setComments(response.data.comments);
      // console.log(response.data.comments);
      console.log(comments);
      console.log("fetched comments successfully");
    } catch (error) {
      console.log("error fetching comments", error);
    } finally {
      setCommentsLoading(false);
    }
  }

  async function handlePostLike() {
    const newToggle = !postLike.toggle;
    const newCount = postLike.toggle ? postLike.count - 1 : postLike.count + 1;

    // Update the state
    setPostLike({
      toggle: newToggle,
      count: newCount,
    });

    try {
      const response = await axiosInstance.patch(
        `/posts/api/post/likes/${postId}`,
        {
          userId,
          postId,
        }
      );
    } catch (error) {
      toast.error(error.message.data.response, {
        position: "top-center",
        theme: "dark",
      });
      console.log("error liking the post", error.response.data.message);
    }
  }

  async function handleCommentLike(commentId) {
    const hasLikedComment = commentsLike[commentId]?.toggle ?? false;
    const initialCount = commentsLike[commentId]?.count ?? 0;

    // Optimistically update the local state
    setCommentsLikes((prev) => ({
      ...prev,
      [commentId]: {
        toggle: !hasLikedComment,
        count: hasLikedComment
          ? Math.max(initialCount - 1, 0)
          : initialCount + 1,
      },
    }));

    try {
      const response = await axiosInstance.patch(
        "/comments/api/comment/likes",
        {
          userId,
          commentId,
        }
      );

      console.log(response.data);
      // Update the state with the response data from the backend
      setCommentsLikes((prev) => ({
        ...prev,
        [commentId]: {
          toggle: response.data.hasliked,
          count: response.data.likes,
        },
      }));
    } catch (error) {
      // Rollback state on error
      setCommentsLikes((prev) => ({
        ...prev,
        [commentId]: {
          toggle: hasLikedComment,
          count: initialCount,
        },
      }));

      toast.error(error.response?.data?.message || "Error liking the comment", {
        position: "top-center",
        theme: "dark",
      });
      console.error("Error liking the comment:", error.response?.data?.message);
    }
  }

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

  // if (!postDetail) return <h1>Error fetching post</h1>;

  const formatTimeAgo = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 31536000)
      return `${Math.floor(diffInSeconds / 2592000)} months ago`;
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
  };

  return (
    <>
      <div className="flex justify-center mt-5">
        <CommonNav />
        {/* STORY DIV */}
        <div className="lg:w-full md:w-[750px] sm:w-[650px] w-full px-5 ">
          <div className="flex items-center">
            <IoIosArrowBack
              className="mr-6 text-xl cursor-pointer"
              onClick={() => navigate("/feed")}
            />
            <p className="font-sans font-bold text-2xl">Post</p>
          </div>
          <Link to={`/${postDetail.userId.userName}`} className="no-underline">
            <div className="flex my-6 border-b border-black h-12 ">
              <div className="mr-2">
                <FaUserCircle className="h-9 w-9 " />
              </div>
              <p className="font-sans font-bold">
                {postDetail.userId.userName}
              </p>
            </div>
          </Link>

          <div>{postDetail.storyValue}</div>
          {/* ACTION DIV */}
          <div className="flex justify-start items-center w-full mb-6 mt-8 pb-3 border-b border-black">
            <div className="mr-4 font-sans text-gray-400 text-[12px]">
              {formatTimeAgo(postDetail?.createdAt)}
            </div>
            <div className="flex items-center mr-4 font-sans text-gray-600 text-[12px]">
              <button
                className="cursor-pointer"
                onClick={() => handlePostLike()}
              >
                {postLike.toggle ? (
                  <FcLike className="w-6 h-6 " />
                ) : (
                  <FcLikePlaceholder className="w-6 h-6 " />
                )}
              </button>
              <div className=" text-sm ml-1 text-gray-400">
                {postLike.count}
              </div>
            </div>
            {/* <div className="mr-4 font-sans text-gray-400 text-[12px] ">
              Comments
            </div> */}
          </div>
          <div className="flex mb-4 ">
            <div className="mr-4">
              <FaUserCircle className="h-9 w-9" />
            </div>
            <input
              type="text"
              placeholder="Post your reply"
              className="w-[500px] focus:outline-none bg-transparent"
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

          {/* COMMENTS DIV */}
          <div>
            {commentsLoading ? (
              <div className="mt-16 flex items-center justify-center ">
                <div className="w-8 h-8 border-8 border-dashed rounded-full animate-spin border-gray-300"></div>
              </div>
            ) : (
              <Comments
                comments={comments}
                commentsLike={commentsLike}
                handleCommentLike={handleCommentLike}
                commentsLoading={commentsLoading}
              />
            )}
          </div>
        </div>
        {/* SUGGESTION BOX */}
      </div>

      <ToastContainer />
    </>
  );
};

export default PostDetail;
