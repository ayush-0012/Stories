import React from "react";
import { useSelector } from "react-redux";

const StoryCard = () => {
  const titleValue = useSelector((state) => state.createPost.titleValue);
  const storyValue = useSelector((state) => state.createPost.storyValue);

  return (
    <>
      <div className="grid justify-center border-b border-black-2 min-w-max">
        <div className="lg:w-[600px]">
          <div className="flex">
            <img src="" alt="profilePic" className="mr-2" />
            <p>User name</p>
          </div>

          {/* CONTENT DIV */}
          <div>
            <h2>{titleValue}</h2>
            <p>{storyValue}</p>
          </div>

          {/* ACTION DIV */}
          <div className="flex justify-starts">
            <div className="mr-4">created at</div>
            <div className="mr-4">Likes</div>
            <div className="mr-4">Comments</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoryCard;
