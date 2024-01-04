"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Timer from "../globalTimer";
import { AesDecrypt, funForAesEncrypt, funcForDecrypt } from "../helperFunctions";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { fetchAllUPI } from "@/api/DashboardServices";

export default function SelectUpiModalForPayout({ isOpen, onClose, transactionId }: any) {
    // console.log('transactionId', transactionId)
    const gst = useSelector((state: RootState) => state.shop.gst);
    const metalType = useSelector((state: RootState) => state.shop.metalType);
    const metalPricePerGram = useSelector((state: RootState) => state.shop.metalPrice);
    const transactionType = useSelector((state: RootState) => state.shop.transactionType);
    const purchaseType = useSelector((state: RootState) => state.shop.purchaseType);
    const enteredAmount = useSelector((state: RootState) => state.shop.enteredAmount);
    const actualAmount = useSelector((state: RootState) => state.shop.actualAmount);
    const metalQuantity = useSelector((state: RootState) => state.shop.metalQuantity);
    const totalAmount = useSelector((state: RootState) => state.shop.totalAmount);
    const [upiList, setUpiList] = useState([]);
    const [allUpiList, setAllUpiList] = useState([]);
    const [allBankList, setAllBankList] = useState<any[]>([]);
    const [upiId, setUpiId] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    const selectUpiHandler = (e: any) => {
        setUpiId(e.target.value);
        setErrorMessage('');
    }

    const fetchBankAndUPIDetails = async () => {
        try {
            const { UpiList, BankList, decryptedDataList } = await fetchAllUPI();
            // console.log("------------->", UpiList, BankList, decryptedDataList);
            setAllUpiList(UpiList);
            setUpiList(upiList);
            setAllBankList(decryptedDataList);
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        fetchBankAndUPIDetails();
    }, [])

    useEffect(() => {
        console.table({
            purchaseType,
            actualAmount,
            gst,
            metalType,
            transactionType,
            metalPricePerGram,
            totalAmount,
            enteredAmount,
            metalQuantity,
        });
    }, [purchaseType, metalType, transactionType, metalPricePerGram, enteredAmount,]);
    const cancelButtonRef = useRef(null);

    const closeModal = () => {
        onClose(false);
    };
    const token = localStorage.getItem('token')

    console.table({
        purpose: purchaseType === 'sell' && metalType === 'gold' ? 'SELL_GOLD' : 'SELL_SILVER',
        unit: "GRAMS",
        gram: actualAmount,
        amount: enteredAmount,
        order_preview_id: transactionId,
        amountWithoutTax: enteredAmount,
        totalAmount: enteredAmount,
        paymentMode: upiId,
        itemMode: "DIGITAL",
        fromApp: false,
    })

    const validate = () => {
        if (upiId) {
            return true;
        } else {
            return false;
        }
    };

    const sellHandler = () => {
        if (validate()) {
            sellReqApiHandler();
        } else {
            setErrorMessage("Please select a withdraw option.");
        }
    };

    const sellReqApiHandler = async () => {

        const dataToBeDecrypt = {
            purpose: purchaseType === 'sell' && metalType === 'gold' ? 'SELL_GOLD' : 'SELL_SILVER',
            unit: "AMOUNT",
            gram: metalQuantity,
            amount: actualAmount,
            order_preview_id: transactionId,
            amountWithoutTax: actualAmount,
            totalAmount: actualAmount,
            paymentMode: upiId,
            itemMode: "DIGITAL",
            fromApp: false,
        };

        const resAfterEncryptData = await funForAesEncrypt(dataToBeDecrypt);

        const payloadToSend = {
            payload: resAfterEncryptData,
        };
        const configHeaders = {
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };
        axios
            .post(
                `${process.env.baseUrl}/user/sale/order/request`,
                payloadToSend,
                configHeaders
            )
            .then(async (resAfterSellReq) => {
                const decryptedData = await funcForDecrypt(
                    resAfterSellReq.data.payload
                );

                if (JSON.parse(decryptedData).status) {
                    Swal.fire(
                        "Success",
                        `${JSON.parse(decryptedData).message}`,
                        "success"
                    );
                    closeModal();

                }
                // setPreviewData(JSON.parse(decryptedData).data);
            })
            .catch(async (errInBuyReq) => {
                const decryptedData = await funcForDecrypt(
                    errInBuyReq.response.data.payload
                );
                let decryptPayload = JSON.parse(decryptedData);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: decryptPayload.message,
                });
            });
    };

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                initialFocus={cancelButtonRef}
                onClose={closeModal}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg coins_backgroun px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                <p>
                                    <Timer />
                                </p>
                                <div className="">
                                    <div>
                                        {allUpiList.map(({ value, _id }: any, key: number) => {
                                            return (
                                                <div key={key} className='coins_backgroun'>
                                                    <div className="flex justify-content-between coins_backgroun align-items-center">
                                                        <div>
                                                            <input
                                                                className="coins_backgroun "
                                                                type="radio"
                                                                onChange={selectUpiHandler}
                                                                id="html"
                                                                name="fav_language"
                                                                value={_id}
                                                            />
                                                        </div>
                                                        <div className='text-gray-400 pl-4' id={_id}>
                                                            {AesDecrypt(value)}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div>
                                        {allBankList?.map((item, key) => {
                                            return (
                                                <>
                                                    {item.documentType === "BANKACCOUNT" ? (
                                                        <div className='text-white'>
                                                            <input type="radio" onChange={selectUpiHandler} id="html" name="fav_language" value={item._id} />
                                                            <div className=''>
                                                                <div className='flex justify-between py-2'>
                                                                    <div className=''>
                                                                        Account Holder Name
                                                                    </div>
                                                                    <div className=''>
                                                                        {AesDecrypt(item.bankData.accountName)}
                                                                    </div>
                                                                </div>
                                                                <hr className="border-gray-500" />
                                                                <div className='flex justify-between py-2'>
                                                                    <div className=''>
                                                                        Account Number
                                                                    </div>
                                                                    <div className=''>
                                                                        {AesDecrypt(item.bankData.accountNumber)}
                                                                    </div>
                                                                </div>
                                                                <hr className="border-gray-500" />
                                                                <div className='flex justify-between py-2'>
                                                                    <div className=''>
                                                                        Bank Name
                                                                    </div>
                                                                    <div className=''>
                                                                        {AesDecrypt(item.bankData.bankName)}
                                                                    </div>
                                                                </div>
                                                                <hr className="border-gray-500" />
                                                                <div className='flex justify-between py-2'>
                                                                    <div className=''>
                                                                        Bank IFSC
                                                                    </div>
                                                                    <div className=''>
                                                                        {AesDecrypt(item.bankData.ifsc)}
                                                                    </div>
                                                                </div>
                                                                <hr className="border-gray-500" />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </>
                                            );
                                        })}
                                    </div>
                                </div>
                                {errorMessage &&
                                    <p
                                        className="text-red-600 text-md text-center">
                                        {errorMessage}
                                    </p>
                                }
                                <div className=" px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                </div>
                                <div className="coins_backgroun px-4 m-2 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md ml-2 bg-themeBlue px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                                        ref={cancelButtonRef}
                                        onClick={() => closeModal()}
                                    >
                                        Cancel
                                    </button>
                                    {purchaseType === 'sell' && <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-themeBlue px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        ref={cancelButtonRef}
                                        onClick={() => sellHandler()}
                                    >
                                        NEXT
                                    </button>}
                                </div>
                            </Dialog.Panel >
                        </Transition.Child >
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

