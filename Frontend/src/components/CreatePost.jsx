import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance.js";
import { CgProfile } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import CommonNav from "./Navbar/CommonNav.jsx";
import { FaUserCircle } from "react-icons/fa";

function CreatePost() {
  const [titleValue, setTitleValue] = useState("");
  const [storyValue, setStoryValue] = useState("");
  const navigate = useNavigate();

  const adjustTextareaHeight = (textarea) => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  useEffect(() => {
    const titleTextarea = document.getElementById("title-textarea");
    const storyTextarea = document.getElementById("story-textarea");
    adjustTextareaHeight(titleTextarea);
    adjustTextareaHeight(storyTextarea);
  }, [titleValue, storyValue]);

  const handleTitleChange = (e) => {
    adjustTextareaHeight(e.target);
    setTitleValue(e.target.value);
  };

  const handleStoryChange = (e) => {
    adjustTextareaHeight(e.target);
    setStoryValue(e.target.value);
  };

  const handlePublish = async () => {
    if (!titleValue) {
      toast.error("Title is Required");
    }

    if (!storyValue) {
      toast.error("Story is Required");
    }

    const userId = localStorage.getItem("userId");
    console.log(userId);
    try {
      const response = await axiosInstance.post(
        "/posts/create-post",
        {
          titleValue,
          storyValue,
          userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        navigate("/feed");
        console.log("post created succesfully");
      } else {
        console.log("unable to create post");
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      <nav className="flex justify-around w-full h-[80px] items-center border-b border-bottom-2">
        <div>
          <h1 className="lg:text-4xl md:text-4xl sm:text-3xl text-3xl font-bold ">
            Stories
          </h1>
        </div>

        <div className="flex justify-around items-center w-60 cursor-pointer ">
          <div className="flex  mr">
            <button
              className="bg-green-600 text-white rounded-full h-9 w-[70px]"
              type="submit"
              onClick={() => handlePublish()}
            >
              Publish
            </button>
          </div>
          <div>
            <IoMdNotificationsOutline className="w-7 h-7 text-gray-300" />
          </div>
          <div>
            <FaUserCircle className="w-7 h-7 text-gray-300" />
          </div>
        </div>
      </nav>

      {/* TEXT SECTION */}
      <div className="flex">
        <CommonNav />
        <div className="h-full w-full lg:px-10 md:px-10">
          <div className="mt-[80px]">
            <textarea
              id="title-textarea"
              type="text"
              placeholder="Title"
              value={titleValue}
              onChange={handleTitleChange}
              className="lg:text-5xl text-4xl font-serif w-full px-3 focus:outline-none resize-none overflow-hidden bg-transparent"
              rows="1"
              wrap="soft"
            />
          </div>
          <div className="mt-10">
            <textarea
              id="story-textarea"
              type="text"
              placeholder="Tell your story..."
              className="lg:text-2xl text-xl font-serif lg:w-[700px] md:w-[650px] sm:w-[550px] w-full px-3 focus:outline-none resize-none overflow-hidden bg-transparent"
              value={storyValue}
              onChange={handleStoryChange}
              rows="3"
              wrap="soft"
            />
          </div>
        </div>
      </div>

      <Toaster />
    </>
  );
}

export default CreatePost;
