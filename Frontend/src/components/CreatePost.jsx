import React, { useEffect, useState } from "react";
import { Bell, User, User2 } from "lucide-react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import CommonNav from "./Navbar/CommonNav.jsx";
import axiosInstance from "../utils/axiosInstance.js";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");

  const adjustTextareaHeight = (textarea) => {
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    const titleTextarea = document.getElementById("title-textarea");
    const storyTextarea = document.getElementById("story-textarea");
    adjustTextareaHeight(titleTextarea);
    adjustTextareaHeight(storyTextarea);
  }, [title, story]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    adjustTextareaHeight(e.target);
  };

  const handleStoryChange = (e) => {
    setStory(e.target.value);
    adjustTextareaHeight(e.target);
  };

  const handlePublish = async () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!story.trim()) {
      toast.error("Story is required");
      return;
    }

    const userId = localStorage.getItem("userId");
    try {
      const response = await axiosInstance.post("/posts/create-post", {
        titleValue: title,
        storyValue: story,
        userId,
      });

      if (response.status === 200) {
        toast.success("Post created successfully");
        window.location.href = "/feed";
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to create post");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-100">
      {/* Header */}
      <header className="sticky top-0 left-0 right-0 z-50 border-b border-gray-800 bg-[#0a0a0f]/95 backdrop-blur">
        <div className="container mx-auto px-4">
          <nav className="flex h-14 items-center justify-between">
            <a
              href="/"
              className="text-2xl font-semibold text-white no-underline"
            >
              Stories
            </a>

            <div className="flex items-center space-x-4">
              <button
                onClick={handlePublish}
                className="rounded-full bg-green-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Publish
              </button>
              {/* <button className="text-gray-300 hover:text-white">
                <Bell />
              </button>
              <button className="text-gray-300 hover:text-white">
                <User2 />
              </button> */}
            </div>
          </nav>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="sticky top-14 hidden w-64 flex-shrink-0 overflow-y-auto border-r border-gray-800 bg-[#0a0a0f] px-4 py-6 md:block">
          <CommonNav />
        </aside>

        {/* Main Content */}
        <main className="flex-grow px-4 py-10 md:px-8">
          <div className="max-w-3xl mx-auto">
            <textarea
              id="title-textarea"
              placeholder="Title"
              value={title}
              onChange={handleTitleChange}
              className="w-full resize-none bg-transparent text-3xl font-serif text-gray-100 placeholder-gray-500 focus:outline-none sm:text-4xl md:text-5xl"
              rows={1}
            />
            <div className="mt-8">
              <textarea
                id="story-textarea"
                placeholder="Tell your story..."
                value={story}
                onChange={handleStoryChange}
                className="w-full resize-none bg-transparent text-lg font-serif text-gray-100 placeholder-gray-500 focus:outline-none sm:text-xl md:text-2xl"
                rows={3}
              />
            </div>
          </div>
        </main>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}

export default CreatePost;
