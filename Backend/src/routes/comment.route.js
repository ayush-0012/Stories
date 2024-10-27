import express from "express";
import { likeComment } from "../controller/comment.controller.js";

const router = express.Router();

router.patch("/api/comment/likes", likeComment);

export const commentRoutes = router;
