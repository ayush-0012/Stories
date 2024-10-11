import express from "express";
import { connectDB } from "./src/database/database.js";
import dotenv from "dotenv";
import cors from "cors";
import { authRoutes } from "./src/routes/auth.route.js";
import bodyParser from "body-parser";
import { postRoutes } from "./src/routes/post.route.js";
import { userRoutes } from "./src/routes/user.route.js";

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "HEAD", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

dotenv.config({
  path: "./.env",
});

const app = express();
connectDB();

app.get("/home", (req, res) => {
  res.send("hello ");
});

//using middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

app.listen(4000, (err) => {
  console.log("server is running");

  if (err) {
    console.log(err);
  }
});
