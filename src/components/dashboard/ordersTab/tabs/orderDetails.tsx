import { ArrowDownIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import React from 'react';

const OrderDetails = (props: any) => {
    console.log('props', props);
    return (
        <div className='coins_background rounded-lg shadow-black shadow-xl p-3'>
            <div>
                <p className='text-xl font-lg'>Transaction Status</p>
                <div className='flex justify-between pb-3'>
                    <div className='flex items-center'>
                        <div>
                            <img src='https://www.kablooe.com/wp-content/uploads/2019/08/check_mark.png' alt='' className='' width={40} />
                        </div>
                        <div>Payment Successful</div>
                    </div>
                    <div>
                        <p>{new Date(props.orderDetails?.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}</p>
                        <p>{new Date(props.orderDetails?.createdAt).toLocaleTimeString("en-IN", {
                            hour: "numeric",
                            minute: "numeric",
                        })}</p>
                    </div>
                </div>
                <div className='flex justify-between pb-3'>
                    <div className='flex items-center'>
                        <div>
                            <img src='https://www.kablooe.com/wp-content/uploads/2019/08/check_mark.png' alt='' className='' width={40} />
                        </div>
                        <div>
                            {props.orderDetails?.orderType === "PRODUCT" && <p>{props?.orderDetails?.itemType.toLowerCase().split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Coin Purchase</p>}
                            {props.orderDetails?.orderType === "REWARD" && <p>Promotional {props?.orderDetails?.itemType.toLowerCase().split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>}
                            {props.orderDetails?.orderType === "BUY" && <p>{props?.orderDetails?.itemType.toLowerCase().split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Purchase</p>}
                            {props.orderDetails?.orderType === "SELL" && <p>Sold</p>}
                            {props.orderDetails?.orderType === "GIFT" &&
                                props?.rewardsType?.orderType === "SEND" && <p>Gift Sent</p>}
                            {props.orderDetails?.orderType === "GIFT" &&
                                props?.rewardsType?.orderType === "RECEIVED" && <p>Gift Received</p>}
                        </div>
                    </div>
                    <div>
                        <p>{new Date(props.orderDetails?.updatedAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}</p>
                        <p>{new Date(props.orderDetails?.updatedAt).toLocaleTimeString("en-IN", {
                            hour: "numeric",
                            minute: "numeric",
                        })}</p>
                    </div>
                </div>
                <div className='flex justify-between '>
                    <div>Order Id</div>
                    <p>{props?.orderDetails?.order_id}</p>
                </div>
                <div className='flex justify-center'>
                    {props?.orderDetails?.status == 'SUCCESS' && props?.orderDetails?.challanUrl && <Link target='_blank' className='' href={props?.orderDetails?.challanUrl}>
                        <div className='text-center m-2 pb-3 flex justify-around'>
                            <button className='border-2 border-yellow-500 py-2 px-4 rounded-2xl mt-4 flex '>Download Challan
                                <ArrowDownIcon className="h-5 ml-2 text-yellow-300" />
                            </button>
                        </div>
                    </Link>}
                    {props?.orderDetails?.status == 'SUCCESS' && props?.orderDetails?.invoiceUrl && <Link target='_blank' className='' href={props?.orderDetails?.invoiceUrl}>
                        <div className='text-center m-2 pb-3 flex justify-around'>
                            <button className='border-2 border-yellow-500 py-2 px-4 rounded-2xl mt-4 flex '>Download Invoice
                                <ArrowDownIcon className="h-5 ml-2 text-yellow-300" />
                            </button>
                        </div>
                    </Link>}
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
