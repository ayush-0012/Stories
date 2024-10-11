import express from "express";
import { fetchUser, updateProfile } from "../controller/user.controller.js";

const router = express.Router();

//fetching all users
router.get("/:id", fetchUser);

router.post("/update-profile", updateProfile);

export const userRoutes = router;
