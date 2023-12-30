'use client'
import { AesDecrypt, AesEncrypt } from '@/components/helperFunctions';
import { setIsLoggedIn, setShowOTPmodal } from '@/redux/authSlice';
import axios, { AxiosRequestConfig } from 'axios';
import { format } from 'date-fns';
import { ErrorMessage, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { Calendar } from 'react-date-range';
import { FaCalendarAlt, FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

interface LoginAsideProps {
    isOpen: boolean;
    onClose: () => void;
}

const SetProfileForNewUser: React.FC<LoginAsideProps> = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showDate, setShowDate] = useState(null);
    const [showCalendar, setshowCalendar] = useState(false);
    const [ageError, setAgeError] = useState("");
    const refOne = useRef<HTMLDivElement>(null);

    //
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
            // props.setToggle(0);
        }
        document.addEventListener("keydown", hideOnEscape, true);
        document.addEventListener("click", hideOnClickOutside, true);
    });

    // hide dropdown on ESC press
    const hideOnEscape = (e: any) => {
        //
        if (e.key === "Escape") {
            setshowCalendar(false);
        }
    };

    // Hide on outside click
    const hideOnClickOutside = (e: any) => {
        //
        //
        if (refOne.current && !refOne.current.contains(e.target)) {
            setshowCalendar(false);
        }
    };
    // const handleDateChange = (dateStr: any) => {
    //     setShowDate(dateStr);
    //     var date = new Date(dateStr),
    //         month = ("0" + (date.getMonth() + 1)).slice(-2),
    //         day = ("0" + date.getDate()).slice(-2);
    //     const formattedDate = [date.getFullYear(), month, day].join("-");

    //     setSelectedDate(formattedDate);
    // };
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
                //   dispatch(logInUser(true));
                //   dispatch(profileFilled(true));
                //   dispatch(doShowLoginAside(false));
                //   props.setToggle(0);
                dispatch(setIsLoggedIn(true));
                dispatch(setShowOTPmodal(false));
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: finalResult.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
                //   props.onHide();
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

    // const decryptedData = await AesDecrypt(result.data.payload);
    // const finalResult = JSON.parse(decryptedData);

    //   if (finalResult.status == true) {
    //     dispatch(logInUser(true));
    //     dispatch(profileFilled(true));
    //     dispatch(doShowLoginAside(false));
    //     props.setToggle(0);
    //     Notiflix.Loading.remove();
    //     Swal.fire({
    //       position: "centre",
    //       icon: "success",
    //       title: finalResult.message,
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //     props.onHide();
    //   } else {
    //     Swal.fire({
    //       position: "centre",
    //       icon: "error",
    //       title: finalResult.message,
    //       showConfirmButton: false,
    //     });
    //   }

    const getAge = (birthDate: string | number | Date) => {
        const currentDate = new Date();
        const birthDateTime = new Date(birthDate as any).getTime();
        const millisecondsInYear = 3.15576e10; // milliseconds in a year

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
                        onClick={onClose}
                        className="absolute top-3 end-2.5 text-gray-500 hover:text-red-600 text-xl cursor-pointer"
                    >
                        <FaTimes />
                    </button>
                    <h1 className="text-2xl font-bold mb-4 text-white text-center">Login/Sign Up</h1>
                    <h3 className="text-2xl mb-4 text-blue-300 text-center italic">LogIn to start <span className='text-yellow-400 italic'>INVESTING</span></h3>
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
                                    <div className=''>
                                        <label>Name</label>
                                        <br />
                                        <input
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
                                            className="error text-danger"
                                        />
                                    </div>
                                    <div className=''>
                                        <label>Date of Birth</label>
                                        <br />
                                        <div className="calendar-input-container">
                                            <input
                                                name="dob"
                                                type="text"
                                                placeholder="Enter Your DOB"
                                                value={values.dob}
                                                minLength={3}
                                                readOnly={true}
                                                onClick={() => setshowCalendar(!showCalendar)}
                                            />
                                            <FaCalendarAlt
                                                className="calendar-icon"
                                                onClick={() => setshowCalendar(!showCalendar)}
                                            />
                                            <div className='' ref={refOne}>
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
                                        <div>{ageError}</div>
                                        <ErrorMessage
                                            name="dob"
                                            component="div"
                                            className="error text-danger"
                                        />
                                    </div>

                                    <div className=''>
                                        <label>Gender</label>
                                        <br />
                                        <select
                                            id="myDropdown"
                                            name="gender"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="form-control"
                                            value={values.gender}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                        <ErrorMessage
                                            name="gender"
                                            component="div"
                                            className="error text-danger"
                                        />
                                    </div>

                                    <div className=''>
                                        <label>E-mail</label>
                                        <br />
                                        <input
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
                                            className="error text-danger"
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
                                    <div className=''>
                                        <input
                                            id="checkbox"
                                            type="checkbox"
                                            name="termsAndConditions"
                                            checked={values.termsAndConditions}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <label className=''>
                                            I am at least 18 years old and agree to the following terms
                                            <br />
                                        </label>
                                    </div>
                                    <ErrorMessage
                                        name="termsAndConditions"
                                        component="div"
                                        className="error text-danger"
                                    />
                                    <div className=''>
                                        By tapping continue. I’ve read and agree to the E-Sign
                                        Disclosure and Consent to receive all the communications
                                        electronically.
                                    </div>
                                    <div className=''>
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
