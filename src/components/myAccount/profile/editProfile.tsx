import { AppDispatch } from '@/redux/store';
import { fetchUserDetails, selectUser } from '@/redux/userDetailsSlice';
import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { AesDecrypt, AesEncrypt, funForAesEncrypt, funcForDecrypt } from '@/components/helperFunctions';
import axios from 'axios';
import Swal from 'sweetalert2';
import ProfileInput from '@/utils/profileInput';

const EditProfile = ({ onSaveDetails, onCancel }: any) => {
    const user = useSelector(selectUser);
    const dispatch: AppDispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // console.log('user.data.name from edit profile', user.data?.dateOfBirth)
    useEffect(() => {
        formik.setFieldValue("name", user.data?.name);
        formik.setFieldValue("email", user.data?.email);
        formik.setFieldValue("gender", user.data?.gender);
        formik.setFieldValue("gst_number", user.data?.gst_number);
        formik.setFieldValue("dateOfBirth", new Date(user.data?.dateOfBirth).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }));
    }, [fetchUserDetails]);

    useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchUserDetails());
        };

        fetchData();
    }, [dispatch]);

    const formik = useFormik({
        initialValues: {
            name: "",
            dateOfBirth: "",
            gender: "",
            email: "",
            gst_number: ""
        },
        enableReinitialize: true,
        validate(values) {
            // console.log('values 43', values);
            const errors: any = {};
            const isValidLength = /^.{2,50}$/;
            //validation on name
            if (!values.name) {
                errors.name = "Name Is Required!";
            } else if (!isValidLength.test(values.name)) {
                errors.name =
                    "Name should be greater than 2 character and less than 50 character";
            } else if (!/^[A-Za-z][A-Za-z]/.test(values.name)) {
                errors.name = "Invalid name";
            }

            //validation for Email
            if (!values.email) {
                errors.email = "Email Is Required";
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
                errors.email = "Please enter a valid Email address.";
            }


            return errors;
        },

        onSubmit: async (values, { resetForm }) => {
            console.log('values from 78', values);
            setIsSubmitting(true);
            try {
                const resAfterEncrypt = await AesEncrypt(values);

                const body = {
                    payload: resAfterEncrypt,
                };
                const token = localStorage.getItem("token");
                const configHeaders = {
                    headers: {
                        authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                };
                const response = await axios.post(
                    `${process.env.baseUrl}/user/profile/details`,
                    body,
                    configHeaders
                );

                const decryptedData = await AesDecrypt(response.data.payload);
                const finalResult = JSON.parse(decryptedData);

                if (finalResult.status) {
                    Swal.fire({
                        icon: "success",
                        title: finalResult.message,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    resetForm()
                    onSaveDetails()
                }

            } catch (error: any) {
                const decryptedData = AesDecrypt(error.response.data.payload);
                //
                const finalResult = JSON.parse(decryptedData);
                console.error(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: finalResult.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            } finally {
                setIsSubmitting(false);
            }
        }
    },
    )
    const verifyGst = async (gst_number: string) => {
        const dataToBeDecrypt = {
            value: gst_number,
        };

        const resAfterEncryptData = await funForAesEncrypt(dataToBeDecrypt);

        const payloadToSend = {
            payload: resAfterEncryptData,
        };
        const token = localStorage.getItem("token");

        const configHeaders = {
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };

        axios.post(`${process.env.baseUrl}/user/kyc/gst/verify`, payloadToSend, configHeaders)
            .then(async (resAfterVerfiyGst) => {
                const decryptedData = await funcForDecrypt(
                    resAfterVerfiyGst.data.payload
                );
                let decodedData = JSON.parse(decryptedData);
                if (decodedData.status) {
                    // setIsGstVerified(true);
                    // setErrorMess("");
                }
            })
            .catch(async (errInGst) => {
                const decryptedData = await funcForDecrypt(
                    errInGst.response.data.payload
                );
                let response = JSON.parse(decryptedData);

                if (JSON.parse(decryptedData).code == 400) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: JSON.parse(decryptedData).message,
                    });
                }
            });
    };

    return (
        <div>
            <div className="relative top-2 left-80 text-gray-400 hover:text-gray-200 focus:outline-none">
                <FaTimes onClick={onSaveDetails} className="cursor-pointer" color={'yellow'} size={20} />
            </div>
            <ProfileInput
                type="text"
                label="Full Name *"
                name="name"
                formik={formik}
                readonly={true}
            />

            <ProfileInput
                type="text"
                label="Date of Birth *"
                name="dateOfBirth"
                placeholder="01/01/2000"
                formik={formik}
                extra={{ max: "2005-01-01" }}
                readonly={true}
            />

            <ProfileInput
                type="gender"
                label="Gender"
                name="gender"
                formik={formik}
                readonly={true}
            />

            <ProfileInput
                type="email"
                label="Email Address"
                name="email"
                formik={formik}
                readonly={user.data?.isEmailVerified ? true : false}
            />

            {/* <ProfileInput
                type="text"
                label="GST Number"
                name="gst_number"
                placeholder="Enter GST Number"
                formik={formik}
            /> */}
            <div className='border-2 border-yellow-400 rounded mb-4 text-center'>
                <button className='text-yellow-400 px-14 py-2 ' onClick={() => {
                    // verifyGst(formik.values.gst_number);
                    formik.submitForm()
                }}>
                    Save Details
                </button>
            </div>
        </div>
    );
};

export default EditProfile;
