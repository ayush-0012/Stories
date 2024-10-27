import express from "express";
import {
  createPost,
  fetchPostDetail,
  fetchPostLikes,
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
router.patch("/api/post/likes/:postId", likePost);

router.get("/api/fetch/post/likes/:postId", fetchPostLikes);

export const postRoutes = router;
