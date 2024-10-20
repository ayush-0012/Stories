import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    commentValue: {
      type: String,
      required: false,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userName: {
      type: String,
    },
  },
  { timestamps: true }
);

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
