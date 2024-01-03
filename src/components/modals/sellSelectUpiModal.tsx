"use client";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Timer from "../globalTimer";
import { AesDecrypt, ParseFloat, funForAesEncrypt, funcForDecrypt } from "../helperFunctions";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { fetchAllUPI } from "@/api/DashboardServices";

export default function SelectUpiModalForPayout({ isOpen, onClose, transactionId }: any) {
    console.log('transactionId', transactionId)
    // const [open, setOpen] = useState(true)
    const router = useRouter()
    const goldData = useSelector((state: RootState) => state.gold);
    const silverData = useSelector((state: RootState) => state.silver);
    const gst = useSelector((state: RootState) => state.shop.gst);
    const metalType = useSelector((state: RootState) => state.shop.metalType);
    const metalPricePerGram = useSelector((state: RootState) => state.shop.metalPrice);
    const transactionType = useSelector((state: RootState) => state.shop.transactionType);
    const purchaseType = useSelector((state: RootState) => state.shop.purchaseType);
    const enteredAmount = useSelector((state: RootState) => state.shop.enteredAmount);
    const actualAmount = useSelector((state: RootState) => state.shop.actualAmount);
    const metalQuantity = useSelector((state: RootState) => state.shop.metalQuantity);
    const totalAmount = useSelector((state: RootState) => state.shop.totalAmount);

    // const [token, setToken] = useState<string | null>(null);
    const [isShowUpi, setIsShowUpi] = useState(false);
    const [upiList, setUpiList] = useState([]);
    const [allUpiList, setAllUpiList] = useState([]);
    const [allBankList, setAllBankList] = useState<any[]>([]);
    const orderIdRef = useRef(null);
    const [upiId, setUpiId] = useState("");


    const selectUpiHandler = (e: any) => {
        // log("selectUpiHandler e.target.value : ", e.target.value);
        setUpiId(e.target.value);
    }

    const fetchBankAndUPIDetails = async () => {
        try {
            const { UpiList, BankList, decryptedDataList } = await fetchAllUPI();
            console.log("------------->", UpiList, BankList, decryptedDataList);
            setAllUpiList(UpiList);
            setUpiList(upiList);
            setAllBankList(decryptedDataList);
        } catch (error) {
            alert(error);
        }
    };

    // const showSellUpiList = async () => {
    //     setIsShowUpi(true);
    // };


    useEffect(() => {
        fetchBankAndUPIDetails();
    }, [])

    console.table({ upiList, allBankList, allUpiList })
    console.log('allUpiList', allUpiList)


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
    }, [
        purchaseType,
        actualAmount,
        gst,
        totalAmount,
        metalType,
        transactionType,
        metalPricePerGram,
        enteredAmount,
        metalQuantity,
    ]);
    const cancelButtonRef = useRef(null);

    const closeModal = () => {
        onClose(false);
    };



    const token = localStorage.getItem('token')


    // console.table({
    //     purpose: purchaseType === 'sell' && metalType === 'gold' ? 'SELL_GOLD' : 'SELL_SILVER',
    //     unit: "GRAMS",
    //     gram: metalQuantity,
    //     amount: enteredAmount,
    //     order_preview_id: transactionId,
    //     amountWithoutTax: enteredAmount,
    //     totalAmount: enteredAmount,
    //     paymentMode : upiId,
    //     itemMode: "DIGITAL",
    //     fromApp: false,
    // })

    const sellReqApiHandler = async () => {
        // const upiId = "9660637657@paytm"

        // console.log('method called');
        const dataToBeDecrypt = {
            purpose: purchaseType === 'sell' && metalType === 'gold' ? 'SELL_GOLD' : 'SELL_SILVER',
            unit: "GRAMS",
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
                                <div>
                                    {allUpiList.map(({ value, _id }: any, key: number) => {
                                        return (
                                            <div key={key} className='coins_backgroun'>
                                                <div className="flex justify-content-between coins_backgroun align-items-center">
                                                    <div>
                                                        <input
                                                            className="coins_backgroun"
                                                            type="radio"
                                                            onChange={selectUpiHandler}
                                                            id="html"
                                                            name="fav_language"
                                                            value={_id}
                                                        /></div>
                                                    <div className='text-gray-400' id={_id}>
                                                        {AesDecrypt(value)}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}



                                    {allBankList?.map((item, key) => {
                                        return (
                                            <>
                                                {item.documentType === "BANKACCOUNT" ? (
                                                    <div className=''>
                                                        <input type="radio" onChange={selectUpiHandler} id="html" name="fav_language" value={item._id} />
                                                        <div className=''>
                                                            <div className=''>
                                                                <div className=''>
                                                                    Account Holder Name
                                                                </div>
                                                                <div className=''>
                                                                    {AesDecrypt(item.bankData.accountName)}
                                                                </div>
                                                            </div>
                                                            <div className=''>
                                                                <div className=''>
                                                                    Account Number
                                                                </div>
                                                                <div className=''>
                                                                    {AesDecrypt(item.bankData.accountNumber)}
                                                                </div>
                                                            </div>
                                                            <div className=''>
                                                                <div className=''>
                                                                    Bank Name
                                                                </div>
                                                                <div className=''>
                                                                    {AesDecrypt(item.bankData.bankName)}
                                                                </div>
                                                            </div>
                                                            <div className=''>
                                                                <div className=''>
                                                                    Bank IFSC
                                                                </div>
                                                                <div className=''>
                                                                    {AesDecrypt(item.bankData.ifsc)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </>
                                        );
                                    })}
                                </div>

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
                                        onClick={() => sellReqApiHandler()}
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

