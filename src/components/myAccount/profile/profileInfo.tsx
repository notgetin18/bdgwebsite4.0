import { AppDispatch } from '@/redux/store';
import { fetchUserDetails, selectUser } from '@/redux/userDetailsSlice';
import React, { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { VscVerifiedFilled } from 'react-icons/vsc';
import { MdScheduleSend } from 'react-icons/md';
import Swal from 'sweetalert2';
import { AesDecrypt } from '@/components/helperFunctions';


const ProfileInfo = ({ onEditDetailsClick }: any) => {
    const user = useSelector(selectUser);
    const dispatch: AppDispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchUserDetails());
        };
        fetchData();
        // console.log('user details fetched', user)
    }, [dispatch]);

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
                    const decryptedData = await AesDecrypt(response.payload)
                    const finalResult = JSON.parse(decryptedData);
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: finalResult.message,
                        showConfirmButton: false,
                        timer: 3000
                    })
                })
                .catch(async (errorInVerifyEmail) => {
                    // log(errorInVerifyEmail.payload);
                    const decryptedData = await AesDecrypt(errorInVerifyEmail.payload)
                    const finalResult = JSON.parse(decryptedData);
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: finalResult.message,
                        showConfirmButton: false,
                        timer: 3000
                    })
                }).finally(() => {
                    setIsLoading(false);
                    setIsSubmitting(false);
                })
        }
    }


    return (
        <div>
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
                    <span className='flex items-center'>{user?.data?.email}<span className='pl-2'>{user?.data?.isEmailVerified ? <VscVerifiedFilled className="cursor-pointer" color={'green'} size={24} /> : <MdScheduleSend onClick={verifyEmail} className="cursor-pointer" color={'yellow'} size={24} />}</span></span>
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
            <div className='border-2 border-yellow-400 rounded mb-4 text-center'>
                <button className='text-yellow-400 py-2 ' onClick={onEditDetailsClick}>
                    Edit Details
                </button>
            </div>
        </div>
    )
}

export default ProfileInfo

