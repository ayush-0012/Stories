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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "user is required"],
    },
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post;
