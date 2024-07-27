import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import "react-quill/dist/quill.snow.css";

function CreatePost() {
  const [titleValue, setTitleValue] = useState("");
  const [storyValue, setStoryValue] = useState("");

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
    setTitleValue(e.target.value);
    adjustTextareaHeight(e.target);
  };

  const handleStoryChange = (e) => {
    setStoryValue(e.target.value);
    adjustTextareaHeight(e.target);
  };

  return (
    <>
      <div className="flex justify-between max-w-full h-[50px] items-center lg:px-[100px] md:px-[50px] sm:px-[30px] px-[20px] border-b border-bottom-2">
        <h1 className="text-4xl font-bold  ">Stories</h1>
        <nav className="flex justify-between w-[200px] h-[40px] items-center cursor-pointer py-4">
          <div className="flex  mr-2">
            <button
              className="bg-green-600 text-white rounded-full h-9 w-[70px]"
              type="submit"
              onClick={() => handleSubmit()}
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
        </nav>
      </div>

      {/* TEXT SECTION */}
      <div className="h-full w-full grid justify-center">
        <div className="mt-[80px]">
          <textarea
            id="title-textarea"
            type="text"
            placeholder="Title"
            value={titleValue}
            onChange={handleTitleChange}
            className="text-6xl font-serif w-[700px] px-3 focus:outline-none resize-none overflow-hidden"
            rows="1"
            wrap="soft"
          />
        </div>
        <div className="mt-4">
          <textarea
            id="story-textarea"
            type="text"
            placeholder="Tell your story..."
            className="text-2xl font-serif w-[700px] px-3 focus:outline-none resize-none overflow-hidden"
            value={storyValue}
            onChange={handleStoryChange}
            rows="3"
            wrap="soft"
          />
        </div>
      </div>
    </>
  );
}

export default CreatePost;
