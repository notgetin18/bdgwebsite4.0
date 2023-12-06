'use client'
import { api } from '@/api/DashboardServices';
import { AesDecrypt, ParseFloat, funcForDecrypt } from '@/components/helperFunctions';
import { RootState } from '@/redux/store';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';


const page = ({ params }: any) => {
    const id = params.slug;
    const [productsDetailById, setProductDetailById] = useState<any>();
    const [quantity, setQuantity] = useState<number>(1);
    const goldData = useSelector((state: RootState) => state.gold);
    const silverData = useSelector((state: RootState) => state.silver);
    const formRef = useRef<HTMLFormElement>(null);
    const [pincodeError, setPincodeError] = useState<string | null>(null);
    const [delivery, setDeliverey] = useState<boolean>(false)

    const getProductById = async () => {
        try {
            const response = await api.get(`/public/product/${id}/details`);
            if (response.status) {
                const responseOfApi = await funcForDecrypt(response.data.payload);
                const productDetails = JSON.parse(responseOfApi);
                setProductDetailById(productDetails.data);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error;
        }
    };

    useEffect(() => {
        getProductById();
    }, []);

    const increaseQty = () => {
        if (quantity <= 9) {
            setQuantity(quantity + 1);
        }
    };

    const decreaseQty = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const pincodeValue = e.currentTarget.pincode.value;
        // Validate pincode
        if (!pincodeValue) {
            setPincodeError("Please enter a 6-digit pincode.");
            return;
        }
        if ((pincodeValue).toString() < 6) {
            setPincodeError("Please enter a 6-digit pincode.");
            return;
        }
        if (!pincodeValue.match(/^\d{6}$/)) {
            setPincodeError("Invalid pincode. Please enter a 6-digit pincode.");
            return;
        } else {
            setPincodeError(null);
        }

        // Handle form submission logic here
        // console.log("Form submitted:", pincodeValue);
        try {
            // console.log('pincode2', pincodeValue);
            const token = localStorage.getItem("token");
            const configHeaders = { headers: { authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
            const response = await axios.get(`${process.env.baseUrl}/user/ecom/pincode/${pincodeValue}`, configHeaders);
            const decryptedData = AesDecrypt(response.data.payload)
            const finalResult = JSON.parse(decryptedData)
            // console.log('finalResult', finalResult)
            if (finalResult.data.length > 0) {
                setDeliverey(true);
                setPincodeError(`Available at ${pincodeValue} pincode`)
            } else {
                setDeliverey(false);
                setPincodeError(`Not available at ${pincodeValue} pincode`)
            }
        } catch (error: any) {
            setPincodeError(error)
        }
    };



    if (!productsDetailById) {
        return <div>Loading...</div>;
    }

    return (
        <div className='text-white'>
            <div className='flex gap-x-12 w-full'>
                <div>
                    <div>Image swiper, metal price {productsDetailById.iteamtype === "GOLD" ? goldData.totalPrice : silverData.totalPrice}</div>
                    <div className=''>
                        <div>Add to cart</div>
                        <div>Buy Now</div>
                    </div>
                </div>
                <div className='flex items-center justify-between'>
                    <div className=''>
                        <div>{productsDetailById.name}</div>
                        <div>Total Price <span className='text-yellow-500'>₹{ParseFloat(+productsDetailById.weight * quantity * (productsDetailById.iteamtype === "GOLD" ? goldData.totalPrice : silverData.totalPrice), 2)}</span><span className='text-yellow-500'>+3% GST</span></div>
                        <div>Making Charge ₹{productsDetailById.makingcharges}</div>
                        <div className='py-2'>
                            <form ref={formRef} onSubmit={handleFormSubmit}>
                                <label>Check pincode availability</label><br />
                                <input
                                    name="pincode"
                                    type="tel"
                                    className='text-black'
                                    placeholder="Enter Your Pincode"
                                    maxLength={6}
                                    // pattern="\d{6}"
                                    // required
                                    onChange={(event) => {
                                        const { value } = event.target;
                                        const updatedValue = value.replace(/[^0-9]/g, '');
                                        event.target.value = updatedValue;
                                        setPincodeError(null); // Clear pincode error on input change
                                    }}
                                />
                                <button className='' type="submit">
                                    Check
                                </button>
                                {pincodeError && delivery == true ? <div className="text-green-500">{pincodeError}</div> : <div className="text-red-500">{pincodeError}</div>}
                            </form>
                        </div>
                    </div>
                </div>
                <div className='flex items-center rounded-lg bg-slate-500'>
                    <div onClick={decreaseQty} className={styles.p1}>-</div>
                    <div className='m-2 p-2'>{quantity}</div>
                    <div onClick={increaseQty} className={styles.p2}>+</div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    p1: 'm-2 p-2 font-bold text-lg text-red-500 cursor-pointer rounded-lg bg-slate-300',
    p2: 'm-2 p-2 font-bold text-lg text-green-500 cursor-pointer rounded-sm bg-slate-300',
};

export default page;

