import { AppDispatch } from '@/redux/store';
import { fetchUserDetails, selectUser } from '@/redux/userDetailsSlice';
import React, { useEffect } from 'react'
import { FaEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

const ProfileInfo = ({ onEditDetailsClick }: any) => {
    const user = useSelector(selectUser);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchUserDetails());
        };

        fetchData();
        // console.log('user details fetched', user)
    }, [dispatch]);


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
                    <span className='flex'>{user.data.email}<span className='pl-2'><FaEdit className="cursor-pointer" color={'yellow'} size={20} /></span></span>
                </div>
                <hr className="border-gray-500 my-1" />
                <div className="mb-2 flex justify-between">
                    <span className="font-bold">Gender</span>
                    <span>{user.data.gender.toUpperCase()}</span>
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

