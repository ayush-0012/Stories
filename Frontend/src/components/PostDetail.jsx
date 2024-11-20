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
import formatDate from "../utils/formatDate";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, MessageCircle, User2 } from "lucide-react";

const PostDetail = () => {
  const { postId, userName } = useParams();
  const [postDetail, setPostDetail] = useState(null);
  const [commentValue, setCommentValue] = useState("");
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
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
    setCommentsLoading(true);
    try {
      const response = await axiosInstance.get(
        `/posts/api/${userName}/${postId}`
      );
      setComments(response.data.comments);
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

  // if (!postDetail) return <h1>Error fetching post</h1>;

  return (
    <>
      <div className="min-h-screen bg-[#0a0a0f] text-gray-100">
        <div className="flex">
          <CommonNav />

          <main className="flex-1 max-w-4xl mx-auto p-4 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => navigate("/feed")}
                    className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                  >
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                  <h1 className="text-2xl font-bold">Post</h1>
                </div>
              </div>

              {/* Post Content */}
              <div className="rounded-lg bg-[#12121a] p-6 space-y-4 w-full">
                <div className="flex items-start gap-4">
                  <Link
                    to={`/${postDetail?.userId?.userName}`}
                    className="no-underline"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold text-white">
                        {postDetail?.userId?.userName?.[0]?.toUpperCase()}
                      </span>
                    </div>
                  </Link>
                  <div className="flex-1">
                    <div className="lg:flex md:flex grid gap-2 justify-between items-start">
                      <Link
                        to={`/${postDetail?.userId?.userName}`}
                        className="no-underline"
                      >
                        <h2 className="text-xl font-semibold text-white hover:underline">
                          {postDetail?.userId?.userName}
                        </h2>
                      </Link>
                      <span className="text-sm text-gray-400">
                        {formatDate(postDetail?.createdAt)}
                      </span>
                    </div>
                    <p className="text-gray-200 mt-2 text-lg whitespace-pre-wrap pt-3">
                      {postDetail?.storyValue}
                    </p>
                    <div className="flex items-center gap-10 mt-4">
                      <button
                        onClick={handlePostLike}
                        className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                      >
                        <Heart
                          className={`w-6 h-6 ${
                            postLike.toggle ? "fill-red-500 stroke-red-500" : ""
                          }`}
                        />
                        <span className="text-lg">{postLike.count}</span>
                      </button>
                      <div className="flex items-center gap-1 text-gray-400">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-md">{comments?.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comment Form */}
              <div className="rounded-lg bg-[#12121a] p-4 w-full">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0">
                    <User2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={commentValue}
                      onChange={(e) => setCommentValue(e.target.value)}
                      placeholder="Post your reply"
                      className="w-full bg-[#16161f] border border-gray-700 rounded-lg p-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 resize-none"
                      rows="2"
                    />
                    <button
                      onClick={postComment}
                      className="mt-2 px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              </div>

              {/* Comments */}
              {commentsLoading ? (
                <div className="flex justify-center p-4">
                  <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="space-y-4 w-full">
                  {(comments || [])
                    .slice()
                    .reverse()
                    .map((comment) => (
                      <motion.div
                        key={comment._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-lg bg-[#12121a] p-4"
                      >
                        <div className="flex items-start gap-4">
                          <Link
                            to={`/${comment.userId.userName}`}
                            className="no-underline"
                          >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0">
                              <span className="text-lg font-bold text-white">
                                {comment.userId.userName[0].toUpperCase()}
                              </span>
                            </div>
                          </Link>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <Link
                                to={`/${comment.userId.userName}`}
                                className="font-semibold text-white hover:underline no-underline"
                              >
                                {comment.userId.userName}
                              </Link>
                              <span className="text-sm text-gray-400">
                                {formatDate(comment.createdAt)}
                              </span>
                            </div>
                            <p className="mt-1 text-gray-200">
                              {comment.commentValue}
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                              <button
                                onClick={() => handleCommentLike(comment._id)}
                                className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                              >
                                <Heart
                                  className={`w-5 h-5 ${
                                    commentsLike[comment._id]?.toggle
                                      ? "fill-red-500 stroke-red-500"
                                      : ""
                                  }`}
                                />
                                <span className="text-sm">
                                  {commentsLike[comment._id]?.count || 0}
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              )}
            </motion.div>
          </main>
        </div>
        <ToastContainer theme="dark" position="top-center" />
      </div>
    </>
  );
};

export default PostDetail;
