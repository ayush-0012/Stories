import React from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

const Comments = ({
  comments = [],
  commentsLike = {},
  handleCommentLike,
  commentsLoading,
}) => {
  // Helper function to format date
  const formatDate = (dateString) => {
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

  // Ensure comments is an array even if undefined is passed
  const safeComments = Array.isArray(comments) ? comments : [];

  // Early return for loading state
  if (commentsLoading) {
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
  }

  // Handle empty comments
  // if (safeComments.length === 0) {
  //   return <div className="p-4">No comments available</div>;
  // }

  return (
    <div className="space-y-4">
      {safeComments
        .filter((comment) => comment && comment._id) // Filter out any null/undefined comments
        .slice()
        .reverse()
        .map((comment) => {
          const timeAgo = formatDate(comment.createdAt);
          const commentLikes = commentsLike[comment._id] || {
            toggle: false,
            count: 0,
          };

          return (
            <div
              key={comment._id}
              className=" rounded-lg shadow p-4 border-b border-b-gray-300"
            >
              <div className="flex items-center gap-2 mb-2 ">
                <span className="font-medium">
                  {comment.userId?.userName || "Anonymous"}
                </span>
              </div>

              <p className="text-white">{comment.commentValue || ""}</p>

              <div className="flex items-center gap-4 mt-2">
                <div className="text-sm text-gray-400">{timeAgo}</div>

                <button
                  onClick={() => handleCommentLike?.(comment._id)}
                  className="flex items-center gap-1 px-2 py-1 rounded "
                >
                  {commentLikes.toggle ? (
                    <span>
                      <FcLike className="w-6 h-6 " />
                    </span>
                  ) : (
                    <span>
                      <FcLikePlaceholder className="w-6 h-6 " />
                    </span>
                  )}
                  <span>{commentLikes.count}</span>
                </button>

                {/* <button className="text-sm text-gray-500 hover:text-gray-700">
                  Reply
                </button> */}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Comments;
