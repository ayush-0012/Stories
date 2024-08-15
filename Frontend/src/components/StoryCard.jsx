import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const StoryCard = () => {
  const titleValue = useSelector((state) => state.createPost.titleValue);
  const storyValue = useSelector((state) => state.createPost.storyValue);

  // useEffect(() => {
  //   try {
  //     const fetchUserName = async () => {
  //       const response = await axios.get(
  //         "http://localhost:4000/auth/signup",
  //         {
  //           userName,
  //         },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );

  //       fetchUserName();
  //       if (response.status === 200) {
  //         console.log("userName fetched successfully");
  //       }
  //     };
  //   } catch (error) {
  //     console.log(error.response.data.message);
  //   }
  // }, []);

  return <></>;
};

export default StoryCard;
