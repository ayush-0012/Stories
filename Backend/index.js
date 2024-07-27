import express from "express";
import { connectDB } from "./src/database/database.js";
import dotenv from "dotenv";
import cors from "cors";
import { authRoutes } from "./src/routes/user.js";
import User from "./src/model/user.model.js";

dotenv.config({
  path: "./.env",
});

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get("/home", (req, res) => {
  res.send("hello ");
});

app.use("/", authRoutes);

app.listen(4000, (err) => {
  console.log("server is running");

  if (err) {
    console.log(err);
  }
});
