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
