import React from "react";
import Login from "./components/Login";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Feed from "./components/Feed";
import CreatePost from "./components/CreatePost";
import Profile from "./components/Profile";
import PostDetail from "./components/PostDetail";

// Protected Route wrapper component
const ProtectedRoute = () => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    return <Navigate to="/signup" replace />;
  }
  return <Outlet />; //renders child routes
};

//public route wrapper component
const PublicRoute = () => {
  const userId = localStorage.getItem("userId");

  if (userId) {
    return <Navigate to="/feed" replace />;
  }
  return <Outlet />;
};

const App = () => {
  const router = createBrowserRouter([
    {
      element: <PublicRoute />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/signup", element: <SignUp /> },
        { path: "/login", element: <Login /> },
      ],
    },
    {
      element: <ProtectedRoute />,
      children: [
        { path: "/feed", element: <Feed /> },
        { path: "/post/:userName/:postId", element: <PostDetail /> },
        { path: "/:userName", element: <Profile /> },
        { path: "/write", element: <CreatePost /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
