import { AesDecrypt } from "@/components/helperFunctions";
import { AppDispatch } from "@/redux/store";
import { fetchUserDetails, selectUser } from "@/redux/userDetailsSlice";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";

const ProfileImage = () => {
  const user = useSelector(selectUser);
  const dispatch: AppDispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleProfileImageChange = async (event: any) => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      setIsLoading(true);
      event.stopPropagation();
      const formData = new FormData();
      formData.append("profile_image", event.target.files[0]);
      formData.append("payload", "CD46F0B542BF044C3F5CEC4AFA6AC27A");

      try {
        const token = localStorage.getItem("token");
        const configHeaders = {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        };
        const response = await axios.post(
          `${process.env.baseUrl}/user/profile/image`,
          formData,
          configHeaders
        );
        const decryptedData = AesDecrypt(response.data.payload);
        const finalResult = JSON.parse(decryptedData);
        if (finalResult.status) {
          setIsLoading(false);
        } else {
          alert("Error while uploading Profile Image");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        setIsSubmitting(false);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchUserDetails());
    };

    fetchData();
  }, [dispatch, handleProfileImageChange]);
  return (
    <div className="coins_background rounded-t-lg w-full flex flex-col items-center justify-center relative">
      <div className=" relative">
        <Image
          src={user.data.profile_image}
          alt="profile image"
          width={100}
          height={100}
          className="my-4 rounded-full h-24 w-24 flex items-center justify-center"
        />
        <label
          htmlFor="file"
          className="absolute bottom-4 right-2 text-themeBlueLight focus:outline-none p-2 bg-theme rounded-full"
        >
          <FaEdit className="cursor-pointer" size={16} />
        </label>
      </div>
      {/* Edit icon */}
      <div className="absolute top-2 right-2 text-gray-400 hover:text-gray-200 focus:outline-none">
        <div className="relative">
          <input
            type="file"
            id="file"
            ref={fileInputRef}
            name="profileImage"
            className="sr-only"
            onChange={handleProfileImageChange}
            accept="image/*"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;
