import { selectUser } from "@/redux/userDetailsSlice";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { VscVerifiedFilled } from "react-icons/vsc";
import { MdScheduleSend } from "react-icons/md";
import Swal from "sweetalert2";
import { AesDecrypt } from "@/components/helperFunctions";

const ProfileInfo = ({ onEditDetailsClick }: any) => {
  const user = useSelector(selectUser);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const verifyEmail = () => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");
      const configHeaders = {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      fetch(`${process.env.baseUrl}/user/validate/email`, configHeaders)
        .then((response) => response.json())
        .then(async (response) => {
          const decryptedData = await AesDecrypt(response.payload);
          const finalResult = JSON.parse(decryptedData);
          Swal.fire({
            position: "center",
            icon: "success",
            title: finalResult.message,
            showConfirmButton: false,
            timer: 3000,
          });
        })
        .catch(async (errorInVerifyEmail) => {
          const decryptedData = await AesDecrypt(errorInVerifyEmail.payload);
          const finalResult = JSON.parse(decryptedData);
          Swal.fire({
            position: "center",
            icon: "error",
            title: finalResult.message,
            showConfirmButton: false,
            timer: 3000,
          });
        })
        .finally(() => {
          setIsLoading(false);
          setIsSubmitting(false);
        });
    }
  };

  return (
    <div>
      <div className="w-full p-4 text-white flex flex-col text-sm sm:text-base">
        <div className="mb-2 flex justify-between rounded-b-lg">
          <span className="font-bold">Name</span>
          <span>{user?.data?.name}</span>
        </div>
        <hr className="border-gray-500 my-1" />
        <div className="mb-2 flex justify-between">
          <span className="font-bold">Mobile Number</span>
          <span>{user?.data?.mobile_number}</span>
        </div>
        <hr className="border-gray-500 my-1" />
        <div className="mb-2 flex justify-between">
          <span className="font-bold">Date of Birth</span>
          <span>
            {new Date(user?.data?.dateOfBirth).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
        <hr className="border-gray-500 my-1" />
        <div className="mb-2 grid grid-cols-2 items-center">
          <span className="font-bold">Email ID</span>
          <span className="sm:flex items-center break-words justify-end">
            {user?.data?.email}
            <span className="pl-2 inline-block">
              {user?.data?.isEmailVerified ? (
                <VscVerifiedFilled
                  className="cursor-pointer"
                  color={"green"}
                  size={24}
                />
              ) : (
                <MdScheduleSend
                  onClick={verifyEmail}
                  className="cursor-pointer"
                  color={"yellow"}
                  size={24}
                />
              )}
            </span>
          </span>
        </div>
        <hr className="border-gray-500 my-1" />
        <div className="mb-2 flex justify-between">
          <span className="font-bold">Gender</span>
          <span>{user?.data?.gender?.toUpperCase()}</span>
        </div>
        <hr className="border-gray-500 my-1" />
        {/* <div className="flex justify-between">
                    <span className="font-bold">GST No.</span>
                    <span>{user.data.gst_number || 'N/A'}</span>
                </div> */}
      </div>
      <div className="mx-3 flex justify-center">
        <button
          className="font-semibold py-2 bg-themeBlue rounded px-3 text-center inline-block"
          onClick={onEditDetailsClick}
        >
          Edit Details
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
