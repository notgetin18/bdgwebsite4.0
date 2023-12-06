'use client'
import { api, metalPrice } from '@/api/DashboardServices';
import { funcForDecrypt } from '@/components/helperFunctions';
import { setGoldData, setSilverData } from '@/redux/metalSlice';
import { setMetalPrice } from '@/redux/shopSlice';
import { RootState } from '@/redux/store';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Test = ({ params }: any) => {
    const id = params.slug;
    const [productsDetailById, setProductDetailById] = useState<any>();
    const [quantity, setQuantity] = useState<number>(1);
    const goldData = useSelector((state: RootState) => state.gold);
    const silverData = useSelector((state: RootState) => state.silver);
    console.log('gold data', goldData)
    console.log('gold data', goldData.totalPrice)
    const metalPricePerGram = useSelector((state: RootState) => state.shop.metalPrice);
    console.log('metalPricePerGram', metalPricePerGram)



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



    // console.log("productsDetailById", productsDetailById);
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
            <div className='grid grid-cols-3'>
                <div>
                    <div>Image swiper  ===== {productsDetailById.itemtype === "GOLD" ? goldData.totalPrice : silverData.totalPrice}</div>
                    <div className=''>
                        <div>Add to cart</div>
                        <div>Buy Now</div>
                    </div>
                </div>
                <div className='ml-6'>
                    <div>{productsDetailById.name}</div>
                    <div>Total Price {+productsDetailById.weight * quantity * (productsDetailById.itemtype === "GOLD" ? goldData.totalPrice : silverData.totalPrice)}</div>
                </div>
            </div>
        </div>
    );
};



export default Test;


