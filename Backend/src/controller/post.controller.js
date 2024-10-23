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
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId)
      .populate("userId", "userName")
      .populate({
        path: "comments",
        populate: { path: "userId", select: "userName" },
      })
      .lean();

    res.status(200).json(post);
  } catch (error) {
    console.error("error fetching post: ", error);
    res.status(500).json({ message: "server error" });
  }
};

//controller to fetch all the posts created by a user
export const fetchUserPosts = async (req, res) => {
  const { userName } = req.params;

  try {
    const user = await User.findOne({ userName }).lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const posts = await Post.find({ userId: user._id })
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

export const likePost = async (req, res) => {
  const { likesOnPost, userId } = req.body;
  const { postId } = req.params;

  console.log(likesOnPost);

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(400).json({ message: "user not found" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      res.status(400).json({ message: "post not found" });
    }

    const hasLiked = post.likesOnPost.includes(userId);

    if (hasLiked) {
      post.likesOnPost = post.likesOnPost.filter((id) => id !== userId);
    } else {
      post.likesOnPost.push(userId);
    }
    await post.save();
    console.log(post);
    res.status(200).json({ message: "added like to the post successfully" });
  } catch (error) {
    res.status(500).json({ message: "unable to add like to the post " });
  }
};
