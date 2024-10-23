import { MongoServerClosedError } from "mongodb";
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    titleValue: {
      type: String,
      required: [true, "title is required"],
    },
    storyValue: {
      type: String,
      required: [true, "story is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "user is required"],
    },
    profilePic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likesOnPost: {
      type: [String],
      default: [],
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post;
