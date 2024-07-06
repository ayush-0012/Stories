import React from "react";
import { LuPenSquare } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";

function Feed() {
  const navigate = useNavigate();

  const handleWriteRedirect = () => {
    navigate("/write");
  };

  return (
    <>
      {/* FEED NAVBAR */}
      <div className="flex justify-between lg:w-full lg:h-[50px] items-center px-[100px] border-b border-bottom-2">
        <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold">Stories</h1>
        <div className="flex justify-between w-[200px] h-[30px] items-center cursor-pointer">
          <div className="flex  mr-2" onClick={() => handleWriteRedirect()}>
            <LuPenSquare className="lg:w-[40px] lg:h-[25px]" />
            <p className="font-sans">Write</p>
          </div>
          <div>
            <IoMdNotificationsOutline className="lg:w-[40px] lg:h-[25px]" />
          </div>
          <div>
            <CgProfile className="lg:w-[40px] lg:h-[25px]" />
          </div>
        </div>
      </div>

      {/* MAIN FEED DIV */}

      <div>
        <h1>{titleValue}</h1>
        <p>{storyValue}</p>
      </div>
    </>
  );
}

export default Feed;
