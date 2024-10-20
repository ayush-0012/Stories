import React from "react";
import Login from "./components/Login";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import SingUp from "./components/SignUp";
import Home from "./components/Home";
import Feed from "./components/Feed";
import CreatePost from "./components/CreatePost";
import Profile from "./components/Profile";
import PostDetail from "./components/PostDetail";

const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <SingUp /> },
    { path: "/feed", element: <Feed /> },
    { path: "/post/:userName/:postId", element: <PostDetail /> },
    { path: "/:userName", element: <Profile /> },
    { path: "/write", element: <CreatePost /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
