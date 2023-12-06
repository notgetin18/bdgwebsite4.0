'use client'
import { api } from '@/api/DashboardServices';
import { ParseFloat, funcForDecrypt } from '@/components/helperFunctions';
import { RootState } from '@/redux/store';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const page = ({ params }: any) => {
    const id = params.slug;
    const [productsDetailById, setProductDetailById] = useState<any>();
    const [quantity, setQuantity] = useState<number>(1);
    const goldData = useSelector((state: RootState) => state.gold);
    const silverData = useSelector((state: RootState) => state.silver);
    // console.log('gold data', goldData)

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



    console.log("productsDetailById", productsDetailById);
    const increaseQty = () => {
        if (quantity <= 9) {
            setQuantity(quantity + 1);
        }
    }
    const decreaseQty = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }
    // Check if productsDetailById is undefined
    if (!productsDetailById) {
        return <div>Loading...</div>;
    }

    return (
        <div className='text-white'>
            <div className='flex gap-x-12 w-full'>
                <div>
                    <div>Image swiper , metal price{productsDetailById.iteamtype === "GOLD" ? goldData.totalPrice : silverData.totalPrice}</div>
                    <div className=''>
                        <div>Add to cart</div>
                        <div>Buy Now</div>
                    </div>
                </div>
                <div className='flex items-center justify-between'>
                    <div className=''>
                        <div>{productsDetailById.name}</div>
                        <div >Total Price <span className='text-yellow-500'>₹{ParseFloat(+productsDetailById.weight * quantity * (productsDetailById.iteamtype === "GOLD" ? goldData.totalPrice : silverData.totalPrice), 2)} </span><span className='text-yellow-500'>+3% GST</span></div>
                        <div>Making Charge ₹{productsDetailById.makingcharges}</div>
                        <div className='py-2'>
                            <div>CHECK PINCODE AVAILABILITY</div>
                            <input type="number"
                                value={''}
                            />
                        </div>
                    </div>
                </div>
                <div className='flex  items-center rounded-lg bg-slate-500'>
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

}
export default page;


