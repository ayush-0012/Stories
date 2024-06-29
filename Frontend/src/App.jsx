import React from "react";
import Login from "./components/Login";
import { createBrowserRouter } from "react-router-dom";
import { Outlet, RouterProvider } from "react-router-dom";
import SingUp from "./components/SingUp";
import Home from "./components/Home";

const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <SingUp /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
