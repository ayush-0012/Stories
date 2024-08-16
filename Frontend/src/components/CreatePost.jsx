import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setTitle, setStory } from "../features/createPost/slice";
import { CgProfile } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

function CreatePost() {
  const [titleValue, setTitleValue] = useState("");
  const [storyValue, setStoryValue] = useState("");
  const [publishBtn, setPublishBtn] = useState(false);

  const userName = useSelector((state) => state.createPost.userName);
  const dispatch = useDispatch();
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

    dispatch(setTitle(titleValue));
  };

  const handleStoryChange = (e) => {
    adjustTextareaHeight(e.target);
    setStoryValue(e.target.value);

    dispatch(setStory(storyValue));
  };

  const handlePublish = async () => {
    setPublishBtn(true);

    if (!titleValue) {
      toast.error("Title is Required");
    }

    if (!storyValue) {
      toast.error("Story is Required");
    }

    const userId = localStorage.getItem("userId");
    console.log(userId);
    try {
      const response = await axios.post(
        "http://localhost:4000/posts/create-post",
        {
          userName,
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
      <nav className="flex justify-between max-w-full h-[50px] items-center lg:px-[100px] md:px-[50px] sm:px-[30px] px-[20px] border-b border-bottom-2">
        <h1 className="lg:text-4xl md:text-4xl sm:text-3xl text-3xl font-bold  ">
          Stories
        </h1>
        <div className="flex justify-evenly w-[200px] h-[40px] items-center cursor-pointer ">
          <div className="flex  mr-2">
            <button
              className="bg-green-600 text-white rounded-full h-9 w-[70px]"
              type="submit"
              onClick={() => handlePublish()}
            >
              Publish
            </button>
          </div>
          <div>
            <IoMdNotificationsOutline className="icons" />
          </div>
          <div>
            <CgProfile className="icons" />
          </div>
        </div>
      </nav>

      {/* TEXT SECTION */}
      <div className="h-full w-full grid justify-center">
        <div className="mt-[80px]">
          <textarea
            id="title-textarea"
            type="text"
            placeholder="Title"
            value={titleValue}
            onChange={handleTitleChange}
            className="text-6xl font-serif lg:w-[700px] md:w-[650px] sm:w-[550px] w-[450px] px-3 focus:outline-none resize-none overflow-hidden"
            rows="1"
            wrap="soft"
          />
        </div>
        <div className="mt-4">
          <textarea
            id="story-textarea"
            type="text"
            placeholder="Tell your story..."
            className="text-2xl font-serif lg:w-[700px] md:w-[650px] sm:w-[550px] w-[450px] px-3 focus:outline-none resize-none overflow-hidden"
            value={storyValue}
            onChange={handleStoryChange}
            rows="3"
            wrap="soft"
          />
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default CreatePost;
