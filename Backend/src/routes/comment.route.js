import express from "express";
import {
  fetchCommentLikes,
  likeComment,
} from "../controller/comment.controller.js";

const router = express.Router();

//to like a comment
router.patch("/api/comment/likes", likeComment);

//to fetch likes on a particular comment
router.get("/api/comment/likes/:commentId", fetchCommentLikes);

export const commentRoutes = router;
