import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [titleValue, setTitleValue] = useState("");
  const [storyValue, setStoryValue] = useState("");

  return (
    <>
      <div className="flex justify-between lg:w-full lg:h-[50px] items-center px-[100px] border-b border-bottom-2">
        <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold">Stories</h1>
        <div className="flex justify-between w-[200px] h-[30px] items-center cursor-pointer">
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
            <IoMdNotificationsOutline className="lg:w-[40px] lg:h-[25px]" />
          </div>
          <div>
            <CgProfile className="lg:w-[40px] lg:h-[25px]" />
          </div>
        </div>
      </div>

      {/* TEXT SECTION */}
      <div className="h-full w-full grid justify-center">
        <div className="mt-[80px]">
          <input
            type="text"
            placeholder="Title"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            className=" text-5xl font-bold font-sans w-[700px] px-3 focus:outline-none "
          />
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Tell your story..."
            className=" text-xl font-sans w-[700px] px-3 focus:outline-none ml-2"
            value={storyValue}
            onChange={(e) => setStoryValue(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}

export default CreatePost;
