import express from "express";
import {
  fetchCommentLikes,
  likeComment,
} from "../controller/comment.controller.js";

const router = express.Router();

router.patch("/api/comment/likes", likeComment);
router.get("/api/comment/likes/:commentId", fetchCommentLikes);

export const commentRoutes = router;
