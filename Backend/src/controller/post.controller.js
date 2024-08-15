import Post from "../model/post.model.js";
import User from "../model/user.model.js";

//creating a post and storing it in the db
export const createPost = async (req, res) => {
  console.log("creating post", req.body);
  const { titleValue, storyValue, userId } = req.body;

  console.log("received userId", userId);

  if (!userId) {
    res.status(400).json({ message: "userId is required" });
  }
  const existingUser = await User.findById(userId);
  if (!existingUser) {
    res.status(400).json({ message: "User does not exists" });
  }

  try {
    const newPost = new Post({ titleValue, storyValue, userId });
    await newPost.save();
    console.log(newPost);
    if (newPost) {
      return res.status(200).json({ message: "Post created successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//controller for fetching already created posts from the db
export const fetchPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "userName");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
