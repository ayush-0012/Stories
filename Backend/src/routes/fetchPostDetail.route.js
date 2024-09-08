import express from "express";
import { fetchPostDetail } from "../controller/post.controller.js";

const router = express.Router();

router.get("/posts/:id", fetchPostDetail);

export const fetchPostDetailRoute = router;
