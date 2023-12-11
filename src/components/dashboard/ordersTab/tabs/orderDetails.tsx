import { formatString } from '@/components/helperFunctions';
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
                            {props?.orderDetails?.status === "SUCCESS" || props?.orderDetails?.status === "COMPLETED" ? (
                                <img src='https://www.kablooe.com/wp-content/uploads/2019/08/check_mark.png' alt='' className='' width={40} />
                            ) : props?.orderDetails?.status === "PENDING" ? (
                                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Yellow_question_mark.svg/1200px-Yellow_question_mark.svg.png' alt='' className='' width={30} />
                            ) : (
                                <img src='https://static.vecteezy.com/system/resources/previews/017/178/032/original/round-cross-mark-symbol-with-transparent-background-free-png.png' alt='' className='' width={40} />
                            )}
                        </div>
                        <p className="flex flex-row">
                            <span className="p-1">
                                {props?.orderDetails?.orderType === "PRODUCT" && <p>Coin Purchase</p>}
                                {props?.orderDetails?.orderType === "REWARD" && "Promotional " + formatString(props?.orderDetails?.itemType)}
                                {props?.orderDetails?.orderType === "BUY" && <p>Purchase</p>}
                                {props?.orderDetails?.orderType === "SELL" && <p>Sold</p>}
                                {props?.orderDetails?.orderType === "GIFT" &&
                                    props?.orderDetails?.rewardsType === "SEND" && <p>Gift Sent</p>}
                                {props?.orderDetails?.orderType === "GIFT" &&
                                    props?.orderDetails?.rewardsType === "RECEIVED" && <p>Gift Received</p>}
                            </span>
                        </p>
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
                        <div className=''>
                            {props?.orderDetails?.status === "SUCCESS" || props?.orderDetails?.status === "COMPLETED" ? (
                                <img src='https://www.kablooe.com/wp-content/uploads/2019/08/check_mark.png' alt='' className='' width={40} />
                            ) : props?.orderDetails?.status === "PENDING" ? (
                                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Yellow_question_mark.svg/1200px-Yellow_question_mark.svg.png' alt='' className='' width={30} />
                            ) : (
                                <img src='https://static.vecteezy.com/system/resources/previews/017/178/032/original/round-cross-mark-symbol-with-transparent-background-free-png.png' alt='' className='' width={40} />
                            )}
                        </div>
                        <div className='px-2'>
                            {props?.orderDetails?.orderType === "PRODUCT" && formatString(props?.orderDetails?.itemType) + " Coin Purchase"}
                            {props?.orderDetails?.orderType === "REWARD" && "Promotional" + formatString(props?.orderDetails?.itemType) + " Received"}
                            {props?.orderDetails?.orderType === "BUY" && formatString(props?.orderDetails?.itemType) + " Purchase"}
                            {props?.orderDetails?.orderType === "SELL" && <p>Sold</p>}
                            {props?.orderDetails?.orderType === "GIFT" &&
                                props?.orderDetails?.rewardsType === "SEND" && (formatString(`${props?.orderDetails?.itemType}`) + " Gift Sent")}
                            {props?.orderDetails?.orderType === "GIFT" &&
                                props?.orderDetails?.rewardsType === "RECEIVED" && (formatString(`${props?.orderDetails?.itemType}`) + " Gift Received")}
                        </div>
                    </div>uy
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
