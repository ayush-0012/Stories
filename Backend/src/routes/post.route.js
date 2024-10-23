import express from "express";
import {
  createPost,
  fetchPostDetail,
  fetchPosts,
  fetchUserPosts,
  likePost,
} from "../controller/post.controller.js";
import { addCommentsToPost } from "../controller/comment.controller.js";

const router = express.Router();

//creating post
router.post("/create-post", createPost);

//for fetching all posts
router.get("/fetch-posts", fetchPosts);

//fetching post details in feed
router.get("/api/:userName/:postId", fetchPostDetail);

//fetching comments of a post
router.post("/api/:userName/:postId/comments", addCommentsToPost);

//to fetch all the posts of a particular user
router.get("/:userName", fetchUserPosts);

//to like a post
router.post("/api/likes/:postId", likePost);

export const postRoutes = router;
