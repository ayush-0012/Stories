import express from "express";
import {
  addCommentsToPost,
  createPost,
  fetchPostDetail,
  fetchPosts,
  fetchUserPosts,
} from "../controller/post.controller.js";

const router = express.Router();

//creating post
router.post("/create-post", createPost);

//for fetching all posts
router.get("/fetch-posts", fetchPosts);

//fetching post details in feed
router.get("/api/:postId", fetchPostDetail);

//fetching comments of a post
router.post("/api/:userName/:postId/comments", addCommentsToPost);

//to fetch all the posts of a particular user
router.get("/:userName", fetchUserPosts);

export const postRoutes = router;
