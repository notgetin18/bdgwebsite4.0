import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails, selectUser } from '../../../redux/userDetailsSlice';
import { useEffect, useRef, useState } from 'react';
import { AppDispatch } from '@/redux/store';
import Image from 'next/image';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';
import { AesDecrypt } from '@/components/helperFunctions';

const ProfileTab = () => {
  const user = useSelector(selectUser);
  const dispatch: AppDispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false);



  const handleProfileImageChange = async (event: any) => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      setIsLoading(true);
      event.stopPropagation();
      const formData = new FormData();
      formData.append("profile_image", event.target.files[0]);
      formData.append('payload', 'CD46F0B542BF044C3F5CEC4AFA6AC27A')

      try {
        const token = localStorage.getItem('token')
        const configHeaders = { headers: { authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
        const response = await axios.post(`${process.env.baseUrl}/user/profile/image`, formData, configHeaders
        )
        // 
        const decryptedData = AesDecrypt(response.data.payload)
        const finalResult = JSON.parse(decryptedData)
        // 
        if (finalResult.status) {
          setIsLoading(false);
          // props?.setToggle(!props.toggle);

        } else {
          alert("Error while uploading Profile Image")
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
    <>
      <div className="coins_background rounded-lg w-full flex flex-col items-center justify-center relative">
        <Image src={user.data.profile_image} alt="profile image" width={100} height={100} className="mt-4 rounded-full h-24 w-24 flex items-center justify-center" />

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
            <label
              htmlFor="file"
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-200 focus:outline-none"
            >
              <FaEdit className="cursor-pointer" color={'yellow'} size={20} />
            </label>
          </div>
        </div>

        <div className="w-full p-4 text-white flex flex-col">
          <div className="mb-2 flex justify-between rounded-b-lg">
            <span className="font-bold">Name</span>
            <span>{user.data.name}</span>
          </div>
          <hr className="border-gray-500 my-1" />
          <div className="mb-2 flex justify-between">
            <span className="font-bold">Mobile Number</span>
            <span>{user.data.mobile_number}</span>
          </div>
          <hr className="border-gray-500 my-1" />
          <div className="mb-2 flex justify-between">
            <span className="font-bold">Date of Birth</span>
            <span>{new Date(user.data.dateOfBirth).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}</span>
          </div>
          <hr className="border-gray-500 my-1" />
          <div className="mb-2 flex justify-between">
            <span className="font-bold">Email ID</span>
            <span>{user.data.email}</span>
          </div>
          <hr className="border-gray-500 my-1" />
          <div className="mb-2 flex justify-between">
            <span className="font-bold">Gender</span>
            <span>{user.data.gender.toUpperCase()}</span>
          </div>
          <hr className="border-gray-500 my-1" />
          <div className="flex justify-between">
            <span className="font-bold">GST No.</span>
            <span>{user.data.gst_number || 'N/A'}</span>
          </div>
        </div>
        <div className='border-2 border-yellow-400 rounded mb-4'>
          <button className='text-yellow-400 px-14 py-2'>Edit Details</button>
        </div>
      </div>
    </>
  );
};

export default ProfileTab;
