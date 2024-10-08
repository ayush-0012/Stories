import mongoose from "mongoose";
import Post from "../model/post.model.js";
import User from "../model/user.model.js";

//creating a post and storing it in the db
export const createPost = async (req, res) => {
  console.log("creating post", req.body);
  const { titleValue, storyValue, userId } = req.body;

  console.log("received userId", userId);

  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }
  const existingUser = await User.findById(userId);
  if (!existingUser) {
    return res.status(400).json({ message: "User does not exists" });
  }

  try {
    const newPost = new Post({ titleValue, storyValue, userId });
    await newPost.save();
    console.log(newPost.userId._id);
    // console.log(newPost.userId.userName);
    if (newPost) {
      return res.status(200).json({ message: "Post created successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//controller for fetching already created posts from the db to display them on the feed
export const fetchPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate("userId", "userName");

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//function to fetch all the details of a particular post of a particular user
export const fetchPostDetail = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const post = await Post.findById(id).populate("userId", "userName").lean();

    console.log("fetched posts", post);

    res.status(200).json(post);
  } catch (error) {
    console.error("error fetching post: ", error);
    res.status(500).json({ message: "server error" });
  }
};

//controller to fetch all the posts created by a user
export const fetchUserPosts = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid userId" });
  }
  try {
    const posts = await Post.find({ userId })
      .populate("userId", "userName")
      .lean();

    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No posts found for this user" });
    }
    res.status(200).json(posts);
  } catch (error) {
    console.error("error fetching post: ", error);
    res.status(500).json({ message: "server error" });
  }
};
