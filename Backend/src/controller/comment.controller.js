import mongoose from "mongoose";
import Comment from "../model/comments.model.js";
import Post from "../model/post.model.js";
import User from "../model/user.model.js";

//controller to add comments to a post
export const addCommentsToPost = async (req, res) => {
  const { postId } = req.params;
  const { userId, commentValue } = req.body;

  console.log(commentValue);
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //creating a new comment
    const comments = new Comment({
      postId,
      userId,
      commentValue,
      userName: user.userName,
    });

    await comments.save(); //saving the comment

    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { comments: comments._id },
      },
      { new: true }
    );

    // console.log("post after adding comment", post);

    res
      .status(201)
      .json({ message: "comment added successfully", comment: comments });
  } catch (error) {
    console.log("an error occured", error);
    res.status(500).json({ message: "server error" });
  }
};

//to like a comment under a post
export const likeComment = async (req, res) => {
  const { commentId, userId } = req.body;

  console.log("commentId", commentId);
  console.log("userId", userId);

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(400).json({ message: "user not found " });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      res.status(400).json({ message: "comment not found" });
    }

    const userIdObj = new mongoose.Types.ObjectId(userId);

    const hasLikedComment = comment.likesOnComment.some((id) =>
      id.equals(userIdObj)
    );
    if (hasLikedComment) {
      // Remove the user's like
      comment.likesOnComment = comment.likesOnComment.filter(
        (id) => !id.equals(userIdObj)
      );
      console.log("Unliked the comment");
    } else {
      comment.likesOnComment.push(userIdObj);
      console.log("liked the comment");
    }

    await comment.save();

    await comment.populate("likesOnComment", "userName");

    res.status(200).json({
      message: hasLikedComment ? "unliked the comment" : "liked the comment",
      comment: comment,
      likes: comment.likesOnComment.length,
      hasliked: !hasLikedComment,
      likedBy: comment.likesOnComment,
    });
  } catch (error) {
    console.log("error liking the comment", error);
    res
      .status(500)
      .json({ message: "error liking the comment", error: error.message });
  }
};

export const fetchCommentLikes = async (req, res) => {
  const { commentId } = req.params;
  const { userId } = req.body; // userId sent in the request body

  try {
    // Find the comment by ID
    const comment = await Comment.findById(commentId);

    // Check if the comment exists
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Determine if the user has liked the comment and count the total likes
    const hasLiked = comment.likesOnComment.some((id) => !id.equals(userId));
    const likesCount = comment.likesOnComment.length;

    // Respond with both the like status and the count
    res.status(200).json({
      hasLiked: hasLiked,
      likesCount: likesCount,
    });
  } catch (error) {
    console.error("Error fetching comment likes:", error);
    res.status(500).json({ message: "Error fetching comment likes" });
  }
};
