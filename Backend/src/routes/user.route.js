import express from "express";
import "dotenv/config";
import {
  authenticatingUser,
  registerUser,
} from "../controller/user.controller.js";

const router = express.Router();

//singUp route
router.post("/signup", registerUser);

//login route
router.post("/login", authenticatingUser);

export const authRoutes = router;
