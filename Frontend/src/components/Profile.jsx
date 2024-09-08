import React, { useEffect, useState } from "react";
import axios from "axios";
import { FileUploaderMinimal } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";

import { FaUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";

const Profile = () => {
  const [image, setImage] = useState("");
  const [profileStats, setProfileStats] = useState({
    followers: 0,
    following: 0,
    isFollowing: false,
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      async function fetchProfilePhoto() {
        try {
          const response = axios.get(
            `http://localhost:4000/api/user/${userId}`
          );
          const user = response.data;

          setImage(user.profilePic);
        } catch (error) {
          console.log("error fetching photo", error);
        }
      }
      fetchProfilePhoto();
    }
  }, []);

  //handling image upload
  function uplaodImage(e) {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  }

  //sending the image to the backend
  function uploadImage(e) {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);

      // Immediately upload the image to the server
      async function handleImageUpload() {
        const userId = localStorage.getItem("userId");

        if (imageUrl && userId) {
          try {
            const formData = new FormData();
            formData.append("image", file); // Append the file
            formData.append("userId", userId);

            const response = await axios.post(
              "http://localhost:4000/api/update-profile",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );

            if (response.status === 200) {
              toast.success("Image updated successfully");
            }
          } catch (error) {
            console.error("Error occurred:", error);
            toast.error("Error occurred, unable to update image");
          }
        }
      }

      handleImageUpload();
    }
  }

  return (
    <>
      <div className="flex items-center justify-center mt-10">
        <div className="flex">
          {/* PFP DIV */}
          <div>
            <div className="mr-32">
              {image ? (
                <img
                  src={image}
                  alt="profile picture"
                  className="mr-2 mt-2 w-20 h-20 rounded-full"
                />
              ) : (
                <FaUserCircle className="mr-2 mt-2 w-20 h-20" />
              )}
            </div>
            <div>
              <label className="ml-1 cursor-pointer text-xs text-blue-500 py-2 rounded-md">
                uplaod photo
                <input
                  type="file"
                  name="upload photo"
                  className="hidden"
                  onChange={uplaodImage}
                />
              </label>
            </div>
          </div>
          {/* PROFILE STATS DIV */}
          <div className="flex flex-wrap justify-between items-center ">
            <div>followers</div>
            <div>following</div>
            <div className="w-full text-center mt-4">
              <button className="">follow</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
