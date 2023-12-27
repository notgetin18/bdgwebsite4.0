import { AesDecrypt, AesEncrypt } from '@/components/helperFunctions';
import axios from 'axios';
import { ErrorMessage, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import * as Yup from "yup";

const AddNewAddress = ({ onCancel, onAddressListUpdate }: any) => {
    const formikRef = useRef<any>();
    const [state, setState] = useState([]);
    const [commonError, setCommonError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [delivered, setDelivered] = useState(false);

    const fetchPincode = async (pincode: Number) => {
        setCommonError("");
        if (pincode.toString().length === 6) {
            try {
                const token = localStorage.getItem("token");
                const configHeaders = {
                    headers: {
                        authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                };
                const response = await axios.get(
                    `${process.env.baseUrl}/user/ecom/pincode/${pincode}`,
                    configHeaders
                );
                const decryptedData = AesDecrypt(response.data.payload);
                const finalResult = JSON.parse(decryptedData);
                if (finalResult.data.length > 0) {
                    formikRef.current?.setFieldValue("city", finalResult.data[0].city);
                    formikRef.current?.setFieldValue("state", finalResult.data[0].state);
                    setDelivered(true);
                    setCommonError("");
                    setDelivered(true);
                    setIsSubmitting(false);
                } else {
                    formikRef.current?.setFieldValue("city", "");
                    formikRef.current?.setFieldValue("state", "");
                    setCommonError("Sorry, We do not provide service on this pincode");
                    setDelivered(false);
                }
            } catch (error) {
                alert(error)
            }
        }
    };


    useEffect(() => {
        fetch(`${process.env.baseUrl}/public/state/list`, {
            headers: { "content-type": "application/json" },
        })
            .then((response) => response.json())
            .then(async (data) => {
                const decryptedData = AesDecrypt(data.payload);
                const stateList = JSON.parse(decryptedData).data;
                setState(stateList);
            })
            .catch((error) => console.error(error));
    }, []);

    const initialValues = {
        line1: '',
        line2: '',
        city: '',
        state: '',
        pincode: ""
    };

    const validationSchema = Yup.object().shape({
        line1: Yup.string().required('This field is required.').max(120, 'maximum 120 character allowed'),
        line2: Yup.string().required('This field is required.').max(120, 'maximum 120 character allowed'),
        city: Yup.string().required('This field is required.'),
        state: Yup.string().required('This field is required.'),
        pincode: Yup.string().matches(/^\d{6}$/, "PinCode is not valid")
            .required('This field is required.'),
    });

    const onSubmit = async (values: any, { resetForm }: any) => {

        setIsSubmitting(true);
        if (delivered) {
            setCommonError('')
            try {
                const resAfterEncrypt = AesEncrypt(values);
                const body = { "payload": resAfterEncrypt }
                const token = localStorage.getItem('token')
                const configHeaders = { headers: { authorization: `Bearer ${token}`, 'Content-Type': 'application/json', } }
                const response = await axios.post(`${process.env.baseUrl}/user/address/create`, body, configHeaders);
                const decryptedData = AesDecrypt(response.data.payload)
                const finalResult = JSON.parse(decryptedData)
                if (finalResult.status) {
                    Swal.fire({
                        position: "center",
                        icon: 'success',
                        title: finalResult.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                onAddressListUpdate()
                onCancel()
            } catch (error) {
                alert(error);
            } finally {
                setIsSubmitting(false);
            }
        } else {
            setCommonError('Sorry, We do not provide service on this pincode')
        }
    };

    return (
        <div>
            <div className='text-white text-xl mt-2 cursor-pointer'>
                <FaTimes onClick={onCancel} />
            </div>
            <div className='p-3'>
                <Formik innerRef={formikRef} initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ values, errors, touched, handleChange, handleBlur, setFieldValue, handleSubmit }) => (
                        <form className='pt-2' onSubmit={(e) => { e.preventDefault(); }}>
                            <div className=''>
                                <label className='text-white'>Address Line 1</label><br />
                                <input
                                    name="line1"
                                    type="text"
                                    placeholder="Enter Your Address"
                                    value={values.line1}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage name="line1" component="div" className="text-red-600" />
                            </div>
                            <div className=''>
                                <label className='text-white'>Address Line 2</label><br />
                                <input
                                    name="line2"
                                    type="text"
                                    placeholder="Enter Your Address"
                                    value={values.line2}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage name="line2" component="div" className="text-red-600" />
                            </div>

                            <div className=''>
                                <label className='text-white'>PIN Code</label><br />
                                <input
                                    name="pincode"
                                    type="tel"
                                    placeholder="Enter Your Pin Code"
                                    value={values.pincode}
                                    maxLength={6}
                                    onChange={(event) => {
                                        setDelivered(false);
                                        const { name, value } = event.target;
                                        const updatedValue = value.replace(/[^0-9]/g, '');
                                        fetchPincode(+updatedValue);
                                        setFieldValue("pincode", +updatedValue);
                                    }}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage name="pincode" component="div" className="text-red-600" />
                                {commonError && <div className='text-danger'>{commonError}</div>}
                            </div>
                            <div className=''>
                                <label className='text-white'>City</label><br />
                                <input
                                    name="city"
                                    type="text"
                                    placeholder="Enter Your City Name"
                                    value={values.city}
                                    onChange={(event) => {
                                        const { name, value } = event.target;
                                        const updatedValue = value.replace(/[^a-zA-Z ]/g, '');
                                        setFieldValue("city", updatedValue);
                                    }}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage name="city" component="div" className="text-red-600" />
                            </div>
                            <div className=''>
                                <label className='text-white'>State</label><br />
                                <select name="state" id="state" onChange={handleChange} value={values.state}
                                    onBlur={handleBlur}>
                                    <option value="">Please choose an option</option>
                                    {state.map((item: any) => (
                                        <option key={item._id} value={item.name}>{item.name}</option>
                                    ))}
                                </select>
                                <ErrorMessage name="state" component="div" className="text-red-600" />
                            </div>
                            <div className='justify-center items-center'>
                                <button className='text-yellow-400 rounded border-2 border-yellow-400 px-2 py-2 mt-4' type="submit" onClick={() => { handleSubmit() }} disabled={isSubmitting}>Save Details</button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default AddNewAddress;