import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import Swal from 'sweetalert2';
import { AesDecrypt, AesEncrypt } from '../helperFunctions';
import axios, { AxiosRequestConfig } from 'axios';
import { useRouter } from 'next/navigation';
import { setIsLoggedIn, setShowOTPmodal } from '@/redux/authSlice';
import { useDispatch } from 'react-redux';

const OTPModal = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [otp, setOtp] = useState('');
    const router = useRouter();
    const dispatch = useDispatch()

    // const openModal = () => {
    //     setModalOpen(true);
    // };

    // const closeModal = () => {
    //     setModalOpen(false);
    //     onClose();
    // };
    const [submitting, setSubmitting] = useState(false);
    const [otpError, setOtpError] = useState("");


    const handleSubmit = async () => {
        const mobile_number = localStorage.getItem("mobile_number");
        // setShowMobileNumber(mobile_number);
        if (otp === undefined) {
            setOtpError("Please Fill the OTP");
        } else {
            const data = {
                mobile_number: localStorage.getItem("mobile_number"),
                otp: otp,
                skipMobileNumber: false,
            };

            // e.preventDefault();
            try {
                setSubmitting(true);
                const resAfterEncrypt = await AesEncrypt(data);

                const body = {
                    payload: resAfterEncrypt,
                };
                const header: AxiosRequestConfig = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };

                const response = await axios.post(
                    `${process.env.baseUrl}/auth/verify/otp`,
                    body,
                    header
                );
                //
                const decryptedData = await AesDecrypt(response.data.payload);

                const result = JSON.parse(decryptedData);
                // log("🚀 ~ file: otpScreen.js:63 ~ handleSubmit ~ result:", result)

                if (result.status == true) {
                    if (result.data.isNewUser == false) {
                        localStorage.setItem("token", result?.data?.otpVarifiedToken);
                        // localStorage.setItem("isLogIn", true);
                        // dispatch(doShowLoginAside(false));
                        // dispatch(logInUser(true));
                        // dispatch(profileFilled(true));
                        // if (props.redirectData) {
                        //   props.redirectData({ redirect: "handleClick", data: "SELL" });
                        // }
                        // props.setToggle(0);
                        // props.onHide();
                        // log("result?.data : ", result?.data);
                        dispatch(setIsLoggedIn(true));
                        dispatch(setShowOTPmodal(false));
                        router.push('/')
                    } else {
                        localStorage.setItem("token", result?.data?.otpVarifiedToken);
                        // props.setToggle(2);
                    }
                } else {
                    setOtp("");
                    //   log("🚀 ~ file: otpScreen.js:112 ~ handleSubmit ~ setOtp:", setOtp)
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: result.message,
                    });
                }
                setSubmitting(false);
            } catch (error: any) {
                // log('asdasd');
                const decryptedData = await AesDecrypt(error?.response?.data?.payload);
                const result = JSON.parse(decryptedData);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: result.message,
                });
                setOtp("");
                setOtpError("");
            }
        }
    };

    return (
        <div>
            {/* {isModalOpen && ( */}
            <div
                id="popup-modal"
                tabIndex={-1}
                className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative coins_background rounded-lg shadow dark:bg-gray-700">
                        <button
                            type="button"
                            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="popup-modal"
                        // onClick={closeModal}
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-4 md:p-5 text-black">
                            {/* Rest of your modal content */}
                            <div className='mb-3 ml-3 text-white'>Enter OTP</div>
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                containerStyle={{
                                    padding: '2px',
                                    margin: '0 auto',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                }}
                                shouldAutoFocus={true}
                                renderSeparator={<span> </span>}
                                inputStyle={{
                                    width: '2.5rem',
                                    height: '2.5rem',
                                    textAlign: 'center',
                                    fontSize: '1rem',
                                    border: '2px solid #FCD34D',
                                    borderRadius: '10px',
                                    margin: '0 4px',
                                    outline: 'none',
                                }}
                                renderInput={(props) => <input {...props} />}
                            />

                            <button
                                data-modal-hide="popup-modal"
                                type="button"
                                className="mt-4 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                onClick={() => { handleSubmit() }}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* )} */}
        </div>
    );
};

export default OTPModal;
