import { createPost } from "../controller/post.controller.js";
import express from "express";

const router = express.Router();

router.post("/create-post", createPost);

export const createPostRoute = router;
