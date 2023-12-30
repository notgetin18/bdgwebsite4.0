'use client'
import { AesDecrypt, AesEncrypt } from '@/components/helperFunctions';
import { profileFilled, setIsLoggedIn, setShowOTPmodal } from '@/redux/authSlice';
import axios, { AxiosRequestConfig } from 'axios';
// import { format } from 'date-fns';
import { ErrorMessage, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { Calendar } from 'react-date-range';
import { FaCalendarAlt, FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import format from "date-fns/format";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";



const SetProfileForNewUser: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showCalendar, setshowCalendar] = useState(false);
    const [ageError, setAgeError] = useState("");
    const refOne = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);


    const onClose = () => {
        setIsOpen(false);
    };

    const initialValues = {
        mobile_number: localStorage.getItem("mobile_number"),
        name: "",
        dob: "",
        email: "",
        gender: "",
        referCode: "",
        termsAndConditions: false,
        mobileVerified: true,
    };
    const validationSchema = Yup.object({
        name: Yup.string().matches(/^[a-zA-Z ]+$/, 'Special characters are not allowed.')
            .required("Name is required"),
        dob: Yup.string().required("DOB is required"),
        gender: Yup.string().required("Gender is required"),
        email: Yup.string()
            .email("Invalid email address").matches(/\./, 'Invalid email address')
            .required("Email is required"),
        termsAndConditions: Yup.boolean().oneOf(
            [true],
            "Terms and conditions are required"
        ),
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
        }
        document.addEventListener("keydown", hideOnEscape, true);
        document.addEventListener("click", hideOnClickOutside, true);
    });

    // hide dropdown on ESC press
    const hideOnEscape = (e: any) => {
        if (e.key === "Escape") {
            setshowCalendar(false);
        }
    };

    const hideOnClickOutside = (e: any) => {
        if (refOne.current && !refOne.current.contains(e.target)) {
            setshowCalendar(false);
        }
    };

    const onSubmit = async (values: { mobile_number: any; name: any; email: any; gender: any; dob: any; }, { setSubmitting, resetForm }: any) => {
        setIsSubmitting(true);
        //   Notiflix.Loading.init({ svgColor: "rgba(241,230,230,0.985)" });

        const dataToBeEncrypted = {
            mobile_number: values.mobile_number,
            name: values.name,
            email: values.email,
            gender: values.gender,
            // referralCode: values.referCode,
            dateOfBirth: values.dob,
            mobileVerified: "true",
        };

        try {
            const resAfterEncrypt = await AesEncrypt(dataToBeEncrypted);
            // const formData = new FormData()
            // formData.append('payload', resAfterEncrypt)
            const token = localStorage.getItem("token");

            const configHeaders = {
                headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    // onUploadProgress: Notiflix.Loading.circle(),
                },
            };
            const body = {
                payload: resAfterEncrypt,
            };
            const result = await axios.post(
                `${process.env.baseUrl}/auth/signup`,
                body,
                configHeaders
            );

            const decryptedData = await AesDecrypt(result.data.payload);
            const finalResult = JSON.parse(decryptedData);

            if (finalResult.status == true) {
                dispatch(profileFilled(true));
                dispatch(setIsLoggedIn(true));
                dispatch(setShowOTPmodal(false));
                router.push('/')
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: finalResult.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: finalResult.message,
                    showConfirmButton: false,
                });
            }
        } catch (error: any) {
            let decryptedData = await AesDecrypt(error.response.data.payload);
            let finalResult = JSON.parse(decryptedData);
            Swal.fire({
                position: "center",
                icon: "error",
                title: finalResult.message,
                showConfirmButton: false,
                timer: 1500,
            });
        } finally {
            setIsSubmitting(false);
            // Notiflix.Loading.remove();
        }
    };


    const getAge = (birthDate: string | number | Date) => {
        const currentDate = new Date();
        const birthDateTime = new Date(birthDate as any).getTime();
        const millisecondsInYear = 3.15576e10;
        return Math.floor((currentDate.getTime() - birthDateTime) / millisecondsInYear);
    };



    return (
        <aside
            className={`fixed top-0 right-0 h-full lg:w-4/12 md:w-5/12 sm:w-6/12 coins_background shadow-lg transform translate-x-${isOpen ? '0' : 'full'
                } transition-transform ease-in-out z-50`}
            style={{ zIndex: 1000 }}
        >
            <div className="grid h-screen place-items-center w-full">
                <div className='w-full p-6'>
                    <button
                        onClick={() => onClose()}
                        className="absolute top-3 end-2.5 text-gray-500 hover:text-red-600 text-xl cursor-pointer"
                    >
                        <FaTimes />
                    </button>
                    <h1 className="text-2xl font-bold mb-4 text-white text-center">Set Up Your Profile</h1>
                    {/* <h3 className="text-2xl mb-4 text-blue-300 text-center italic">LogIn to start <span className='text-yellow-400 italic'>INVESTING</span></h3> */}
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
                                    }}
                                >
                                    <div className='mb-3'>
                                        <label className='text-white'>Name</label>
                                        <br />
                                        <input
                                            className='text-white tracking-widest font-semibold border-1 rounded mt-1 w-full p-2 coins_backgroun outline-none'
                                            name="name"
                                            type="text"
                                            minLength={3}
                                            maxLength={25}
                                            placeholder="Enter name as per Aadhar Card"
                                            onChange={(event) => {
                                                const { name, value } = event.target;
                                                const updatedValue = value.replace(/[^A-Za-z\s]/g, '');
                                                setFieldValue('name', updatedValue);
                                            }}
                                            onBlur={handleBlur}
                                            value={values.name}
                                        />
                                        <ErrorMessage
                                            name="name"
                                            component="div"
                                            className="text-red-600"
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label className='text-white'>Date of Birth</label>
                                        <br />
                                        <div className="flex justify-between items-center cursor-pointer relative font-semibold border-1 rounded mt-1 w-full p-2 coins_backgroun outline-none">
                                            <input
                                                className='coins_backgroun outline-none'
                                                name="dob"
                                                type="text"
                                                placeholder="Enter Your DOB"
                                                value={values.dob}
                                                minLength={3}
                                                readOnly={true}
                                                onClick={() => setshowCalendar(!showCalendar)}
                                            />
                                            <FaCalendarAlt
                                                className="calendar-icon cursor-pointer  text-white"
                                                size={26}
                                                onClick={() => setshowCalendar(!showCalendar)}
                                            />
                                            <div className='absolute' ref={refOne}>
                                                {showCalendar && (
                                                    <Calendar
                                                        onChange={(date) => {
                                                            if (getAge(date) >= 18) {
                                                                setFieldValue("dob", format(date, "yyyy-MM-dd"));
                                                                setshowCalendar(false);
                                                                setAgeError("");
                                                            } else {
                                                                setshowCalendar(false);
                                                                setAgeError("must be 18 or above to register");
                                                            }
                                                        }}
                                                        date={values.dob ? new Date(values.dob) : undefined}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className='text-red-600'>{ageError}</div>
                                        <ErrorMessage
                                            name="dob"
                                            component="div"
                                            className="text-red-600"
                                        />
                                    </div>

                                    <div className='mb-3'>
                                        <label className='text-white'>Gender</label>
                                        <br />
                                        <select
                                            className='cursor-pointer form-control text-gray-400 tracking-widest font-semibold border-1 rounded mt-1 w-full p-2 coins_backgroun outline-none'
                                            id="myDropdown"
                                            name="gender"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.gender}
                                        >
                                            <option className='tracking-widest text-white' value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                        <ErrorMessage
                                            name="gender"
                                            component="div"
                                            className="text-red-600"
                                        />
                                    </div>

                                    <div className=''>
                                        <label className='text-white'>E-mail</label>
                                        <br />
                                        <input
                                            className='text-white tracking-widest font-semibold border-1 rounded mt-1 w-full p-2 coins_backgroun outline-none'
                                            name="email"
                                            type="text"
                                            placeholder="Enter your E-mail Address."
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="text-red-600"
                                        />
                                    </div>

                                    {/* <div className={style.user_mobile_no}>
                  <label>Referral Code</label>
                  <br />
                  <input
                    name="referCode"
                    type="text"
                    placeholder="Enter your Refer code."
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.referCode}
                  />
                </div> */}
                                    <div className='flex items-center mt-3'>
                                        <input
                                            className="cursor-pointer w-4 h-5 text-theme coins_background  rounded-lg focus:outline-none "
                                            id="checkbox"
                                            type="checkbox"
                                            name="termsAndConditions"
                                            checked={values.termsAndConditions}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <label className='text-white ml-2'>
                                            I am at least 18 years old and agree to the following terms
                                            <br />
                                        </label>
                                    </div>
                                    <ErrorMessage
                                        name="termsAndConditions"
                                        component="div"
                                        className="text-red-600"
                                    />
                                    <div className='text-white'>
                                        By tapping continue. I’ve read and agree to the E-Sign
                                        Disclosure and Consent to receive all the communications
                                        electronically.
                                    </div>
                                    <div onClick={() => handleSubmit()} className='cursor-pointer mt-3 rounded border-yellow-400 text-yellow-400 border-2 px-2 py-2 text-center'>
                                        <button
                                            type="submit"
                                            onClick={() => handleSubmit()}
                                            disabled={isSubmitting}
                                        >
                                            CONTINUE
                                        </button>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default SetProfileForNewUser;
