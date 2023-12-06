'use client'
import { api } from '@/api/DashboardServices';
import { AesDecrypt, ParseFloat, funcForDecrypt } from '@/components/helperFunctions';
import { RootState } from '@/redux/store';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import SimpleImageSlider from "react-simple-image-slider";

const page = ({ params }: any) => {
    const id = params.slug;
    const [productsDetailById, setProductDetailById] = useState<any>();
    const [quantity, setQuantity] = useState<number>(1);
    const goldData = useSelector((state: RootState) => state.gold);
    const silverData = useSelector((state: RootState) => state.silver);
    const formRef = useRef<HTMLFormElement>(null);
    const [pincodeError, setPincodeError] = useState<string | null>(null);
    const [delivery, setDeliverey] = useState<boolean>(false)
    const [photo, setphoto] = useState([])

    const getProductById = async () => {
        try {
            const response = await api.get(`/public/product/${id}/details`);
            if (response.status) {
                const responseOfApi = await funcForDecrypt(response.data.payload);
                const productDetails = JSON.parse(responseOfApi);
                setProductDetailById(productDetails.data);
                setphoto(productDetails.data.image)
            }
        } catch (error) {
            console.error('Error fetching  data:', error);
            throw error;
        }
    };

    console.log('photo', photo)

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
    console.log('productsDetailById', productsDetailById)


    return (
        <div className='text-white'>
            <div className='flex gap-12'>
                <div>
                    <div>
                        <SimpleImageSlider
                            width={596}
                            height={620}
                            images={photo}
                            showBullets={true}
                            showNavs={true}
                            loop={true}
                            autoPlay={true}
                        />
                    </div>
                    <div className=''>
                        <div>Add to cart</div>
                        <div>Buy Now</div>
                    </div>
                </div>
                <div>
                    <div className='flex'>
                        <div>
                            <div>{productsDetailById.name}</div>
                            <div>Total Price <span className='text-yellow-500'>₹{ParseFloat(+productsDetailById.weight * quantity * (productsDetailById.iteamtype === "GOLD" ? goldData.totalPrice : silverData.totalPrice), 2)}</span><span className='text-yellow-500'>+3% GST</span></div>
                            <div>Making Charge ₹{productsDetailById.makingcharges}</div>
                        </div>
                        <div className='flex items-center rounded-lg bg-slate-500'>
                            <div onClick={decreaseQty} className={styles.p1}>-</div>
                            <div className=''>{quantity}</div>
                            <div onClick={increaseQty} className={styles.p2}>+</div>
                        </div>
                    </div>
                    {/* pin code */}
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
                    {/*coin description */}
                    <div className='bg-blue-600 px-2'>
                        <p>{productsDetailById.description}</p>
                    </div>
                    <div className='grid grid-cols-3 mt-4'>
                        <div className=''>
                            <Image
                                src={"https://imagesbdg.sgp1.digitaloceanspaces.com/a0cd4a0a-0816-4029-aa0d-ad4c6792701a"}
                                width={50}
                                height={50}
                                alt='icons'
                            />
                            <p>Guaranteed 24K Gold</p>
                        </div>
                        <div>
                            <Image
                                src={"https://imagesbdg.sgp1.digitaloceanspaces.com/78b932b1-cff6-4aa5-b0ea-17f264703802"}
                                width={50}
                                height={50}
                                alt='icons'
                            />
                            <p>No Loss of Money</p>
                        </div>
                        <div>
                            <Image
                                src={"https://imagesbdg.sgp1.digitaloceanspaces.com/a0cd4a0a-0816-4029-aa0d-ad4c6792701a"}
                                width={50}
                                height={50}
                                alt='icons'
                            />
                            <p>Safety Guaranteed</p>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <div className='mt-4'>
                            <p>Weight : {productsDetailById.weight}</p>
                        </div>
                        <div className='mt-4'>
                            <p>Metal Purity : {productsDetailById.purity}</p>
                        </div>
                        <div className='mt-4'>
                            <p>Dimension : {productsDetailById.dimension}</p>
                        </div>
                        <div className='mt-4'>
                            <p>Quality : {productsDetailById.quality}</p>
                        </div>
                    </div>
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

