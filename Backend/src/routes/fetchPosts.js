import express from "express";
import { fetchPosts } from "../controller/post.controller.js";

const router = express.Router();

router.get("/fetch-posts", fetchPosts);

export const fetchPost = router;
