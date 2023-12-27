'use client'
import { AesDecrypt, AesEncrypt } from '@/components/helperFunctions';
import OTPModal from '@/components/homepage/otp';
import axios, { AxiosRequestConfig } from 'axios';
import { Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import * as Yup from 'yup';

interface LoginAsideProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginAside: React.FC<LoginAsideProps> = ({ isOpen, onClose }) => {
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [termsLinkColor, setTermsLinkColor] = useState('text-black');
    const [showOTPModal, setShowOTPModal] = useState(false);

    const handleTermsClick = () => {
        onClose();
        setTermsLinkColor('text-yellow-500');
    };

    const initialValues = {
        mobile_number: '',
        termsAndConditions: false,
        buttonType: ''
    };

    const validationSchema = Yup.object({
        termsAndConditions: Yup.boolean().oneOf(
            [true],
            'Terms and conditions are Required'
        ),
        mobile_number: Yup.string()
            .required('Required')
            .matches(/^[6789][0-9]{9}$/, 'Mobile No. is not valid')
            .matches(phoneRegex, 'Invalid Number, Kindly enter a valid number')
            .min(10, 'Please enter a 10-digit mobile number')
            .max(10, 'Too long'),
    });

    const onSubmit = async (values: any) => {
        try {
            setSubmitting(true);
            if (values.buttonType == 'OtpLogin') {
                const resAfterEncrypt = await AesEncrypt(values);
                const body = {
                    payload: resAfterEncrypt,
                };
                const header: AxiosRequestConfig = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
                const result = await axios.post(
                    `${process.env.baseUrl}/auth/send/otp`,
                    body,
                    header
                );
                const decryptedData = await AesDecrypt(result.data.payload);
                if (JSON.parse(decryptedData).status) {
                    localStorage.setItem('mobile_number', values.mobile_number);
                    setShowOTPModal(true); // Show the OTP modal
                }
                setSubmitting(false);
                onClose();
            } else {
                setSubmitting(false);
            }
        } catch (error) {
            // Handle error
            console.error(error);
            setSubmitting(false);
        }
    };

    const closeOTPModal = () => {
        setShowOTPModal(false);
        onClose(); // Close the modal from the parent component
    };

    return (
        <aside
            className={`fixed top-0 right-0 h-full lg:w-4/12 md:w-5/12 sm:w-6/12 bg-white shadow-lg transform translate-x-${isOpen ? '0' : 'full'
                } transition-transform ease-in-out z-50`}
            style={{ zIndex: 1000 }}
        >
            {showOTPModal && <OTPModal onClose={closeOTPModal} />}

            <div className="p-6 mt-32">
                <button
                    onClick={onClose}
                    className="absolute top-3 end-2.5 text-gray-500 hover:text-gray-700 text-xl cursor-pointer"
                >
                    <FaTimes />
                </button>
                <h1 className="text-2xl font-bold mb-4">Login/Sign Up</h1>
                <h3 className="text-2xl mb-4">Log in to start <span className='text-yellow-400'>INVESTING</span></h3>

                <div className="mb-4">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            setFieldValue,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                        }) => (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSubmit();
                                }}
                            >
                                <div className="">
                                    <label>Mobile Number</label>
                                    <br />
                                    <input
                                        name="mobile_number"
                                        type="text"
                                        minLength={10}
                                        maxLength={10}
                                        placeholder="Enter Your Number"
                                        onChange={(event) => {
                                            const { name, value } = event.target;
                                            const updatedValue = value.replace(/[^0-9]/g, '');
                                            setFieldValue('mobile_number', updatedValue);
                                        }}
                                        onBlur={handleBlur}
                                        value={values.mobile_number}
                                    />
                                    {touched.mobile_number && errors.mobile_number ? (
                                        <div
                                            style={{
                                                color: '#ab0000',
                                                marginLeft: 5,
                                                fontWeight: 'bold',
                                                marginTop: 8,
                                                fontSize: 15,
                                            }}
                                        >
                                            {errors.mobile_number}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="">
                                    <input
                                        id="termsAndConditions"
                                        type="checkbox"
                                        name="termsAndConditions"
                                        checked={values.termsAndConditions}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <label
                                        onClick={handleTermsClick}
                                        className={`cursor-pointer ${termsLinkColor}`}
                                    >
                                        I agree to these{" "}
                                        <span>
                                            <Link href="/termsAndConditions"> Terms and Conditions</Link>
                                        </span>
                                    </label>
                                </div>
                                {touched.termsAndConditions && errors.termsAndConditions ? (
                                    <div
                                        style={{
                                            color: 'black',
                                            marginLeft: 4,
                                            fontWeight: 'bold',
                                            marginTop: 0,
                                            fontSize: 10,
                                        }}
                                    >
                                        <span className='text-red-800 text-md'>{errors.termsAndConditions}</span>
                                    </div>
                                ) : null}
                                <div className="">
                                    <button
                                        type="submit"
                                        className='border-2 border-yellow-400 px-2 py-2 rounded'
                                        onClick={() => {
                                            values.buttonType = 'OtpLogin';
                                        }}
                                        disabled={submitting}
                                    >
                                        SEND OTP
                                    </button>
                                </div>
                                <div className="">
                                    <div className=""></div>
                                    <div className="">Or</div>
                                    <div className=""></div>
                                </div>
                                <div className="">
                                    <button
                                        type="submit"
                                        onClick={() => {
                                            values.buttonType = 'missCallLogin';
                                        }}
                                        disabled={submitting}
                                    >
                                        Give a missed call
                                    </button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </aside>
    );
};

export default LoginAside;
