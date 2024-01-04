"use client";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Timer from "../globalTimer";
import { AesDecrypt, ParseFloat, funForAesEncrypt, funcForDecrypt } from "../helperFunctions";
import { isCouponApplied } from "@/redux/couponSlice";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import SelectUpiModalForPayout from "./sellSelectUpiModal";

export default function Modal({ isOpen, onClose, transactionId }: any) {
  console.log('transactionId', transactionId)
  // const [open, setOpen] = useState(true)
  const router = useRouter()
  const gst = useSelector((state: RootState) => state.shop.gst);
  const metalType = useSelector((state: RootState) => state.shop.metalType);
  const metalPricePerGram = useSelector((state: RootState) => state.shop.metalPrice);
  const transactionType = useSelector((state: RootState) => state.shop.transactionType);
  const purchaseType = useSelector((state: RootState) => state.shop.purchaseType);
  const enteredAmount = useSelector((state: RootState) => state.shop.enteredAmount);
  const actualAmount = useSelector((state: RootState) => state.shop.actualAmount);
  const metalQuantity = useSelector((state: RootState) => state.shop.metalQuantity);
  const totalAmount = useSelector((state: RootState) => state.shop.totalAmount);
  //when coupons applied
  const selectedCoupon = useSelector((state: RootState) => state.coupon.selectedCoupon);
  const appliedCouponCode = useSelector((state: RootState) => state.coupon.appliedCouponCode);
  const error = useSelector((state: RootState) => state.coupon.error);
  const extraGoldOfRuppess = useSelector((state: RootState) => state.coupon.extraGoldOfRuppess);
  const extraGold = useSelector((state: RootState) => state.coupon.extraGold);
  const isAnyCouponApplied: boolean = useSelector(isCouponApplied);
  const [orderId, setOrderId] = useState("");
  const orderIdRef = useRef(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const time = <Timer />
  console.log('time', time)


  const openModalPayout = async () => {
    setModalOpen(true);
  };

  const closeModalPayout = () => {
    setModalOpen(false);
    closeModal()
  };


  useEffect(() => {
    console.table({ error, appliedCouponCode, extraGoldOfRuppess, extraGold });
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
    error,
    appliedCouponCode,
    extraGoldOfRuppess,
    extraGold,
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

  const checkPaymentStatus = () => {
    let token = localStorage.getItem('token');
    // console.log(token);
    const configHeaders = {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
    axios.get(`${process.env.baseUrl}/user/order/status/check?orderId=${orderIdRef.current}`, configHeaders).then(async (resAfterBuyReq) => {
      const decryptedData = await AesDecrypt(resAfterBuyReq.data.payload);
      let decryptDataParse = JSON.parse(decryptedData);
      if (decryptDataParse.status) {
        console.log('Payment Request');
        console.log(decryptDataParse.data.transaction.transactionStatus);
        //SUCCESS
        if (decryptDataParse.data.transaction.transactionStatus == 'SUCCESS' || decryptDataParse.data.transaction.transactionStatus == 'FAILED') {
          router.push('/dashboard');
        }
        // if(decryptDataParse.data.payment.success){
        //     let intentUrl = decryptDataParse.data.payment.instrumentResponse.intentUrl;
        //     console.log('intentUrl',intentUrl);
        // }
      }
      // setPreviewData(JSON.parse(decryptedData).data);
    }).catch((errInBuyReq) => {
      // Swal.fire({
      //     icon: 'error',
      //     title: 'Oops...',
      //     text: 'Something went wrong!',
      // })
    })
  }

  const handleFocus = useCallback(() => {
    checkPaymentStatus();
  }, [checkPaymentStatus]);


  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState == 'visible') {
      checkPaymentStatus();
    }
  }, []);

  useEffect(() => {

    window.addEventListener('focus', handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }

  }, [])

  const token = localStorage.getItem('token')


  const buyReqApiHandler = async () => {
    const dataToBeDecrypt = {
      orderType: purchaseType.toUpperCase(),
      item: metalType.toUpperCase(),
      unit: "AMOUNT",
      gram: metalQuantity,
      amount: totalAmount,
      order_preview_id: transactionId,
      amountWithoutTax: actualAmount,
      tax: "3",
      totalAmount: totalAmount,
      couponCode: appliedCouponCode ? appliedCouponCode : '',
      itemMode: "DIGITAL",
      gst_number: '',
      fromApp: false,
      payment_mode: 'cashfree'

    }
    const resAfterEncryptData = await funForAesEncrypt(dataToBeDecrypt)
    const payloadToSend = {
      payload: resAfterEncryptData
    }
    const configHeaders = {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
    axios.post(`${process.env.baseUrl}/user/order/request`, payloadToSend, configHeaders).then(async (resAfterBuyReq) => {
      const decryptedData = await funcForDecrypt(resAfterBuyReq.data.payload);
      console.log('decryptedData', decryptedData);

      if (JSON.parse(decryptedData).status) {
        setOrderId(JSON.parse(decryptedData).data.order.order_id);
        orderIdRef.current = JSON.parse(decryptedData).data.order.order_id;
        console.log(orderIdRef.current);
        console.log(JSON.parse(decryptedData).data.payment.data.payload.web);
        let paymentUrl = JSON.parse(decryptedData).data.payment.data.payload.web;
        window.open(paymentUrl, "_self", 'noopener');
      }
      // setPreviewData(JSON.parse(decryptedData).data);
    }).catch((errInBuyReq) => {
      console.log(errInBuyReq);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    })
  }

  console.table({
    purpose: purchaseType === 'sell' && metalType === 'gold' ? 'SELL_GOLD' : 'SELL_SILVER',
    unit: "GRAMS",
    gram: metalQuantity,
    amount: enteredAmount,
    order_preview_id: transactionId,
    amountWithoutTax: enteredAmount,
    totalAmount: enteredAmount,
    // paymentMode : upiId,
    itemMode: "DIGITAL",
    fromApp: false,
  })



  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={closeModal}
      >
        {isModalOpen && <SelectUpiModalForPayout isOpen={isModalOpen} onClose={closeModalPayout} transactionId={transactionId} />}
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
              <Dialog.Panel className="text-white relative transform overflow-hidden rounded-lg coins_backgroun px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <p>
                  <Timer />
                </p>
                <div className="coins_backgroun px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <p>
                    {purchaseType === "buy" ? "Buy" : "Sell"}  Breakdown{" "}
                    {transactionType === "grams" ? actualAmount : enteredAmount}
                  </p>
                  <p>
                    {purchaseType === "buy" ? "Purchase" : "Sell"}{" "}
                    {metalType === "gold" ? "Gold" : "Silver"} Weight :{" "}
                    {metalQuantity}{" "}
                  </p>
                  {purchaseType === "buy" && <p className="justify-between items-center">
                    {metalType === "gold" ? "Gold" : "Silver"} Value :{" "}
                    {actualAmount}{" "}
                  </p>}
                  {metalType === "gold" && purchaseType === "buy" && (
                    <p>Promotional Silver : {metalQuantity} </p>
                  )}
                  {isAnyCouponApplied && (
                    <p>Promotional Gold Value : {extraGoldOfRuppess} </p>
                  )}
                  {metalType === "gold" && isAnyCouponApplied && (
                    <p>
                      {" "}
                      Total Gold Weight :{" "}
                      {ParseFloat((metalQuantity ?? 0) + extraGold, 4)}{" "}
                    </p>
                  )}
                  {purchaseType === "buy" && <p>GST ( +3% ) : {gst} </p>}
                  <p>
                    Total Amount :{" "}
                    {transactionType === "grams" ? actualAmount : enteredAmount}
                  </p>
                </div>
                <div className="text-yellow-400 px-4 m-2 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 ml-2 inline-flex w-full justify-center rounded-md coins_backgroun px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300  hover:bg-themeBlue sm:mt-0 sm:w-auto"
                    ref={cancelButtonRef}
                    onClick={() => closeModal()}
                  >
                    Cancel
                  </button>

                  {purchaseType === 'buy' && <button
                    type="button"
                    className="mt-3 text-yellow-400  inline-flex w-full justify-center rounded-md coins_backgroun px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-themeBlue sm:mt-0 sm:w-auto"
                    ref={cancelButtonRef}
                    onClick={() => buyReqApiHandler()}
                  >
                    procced
                  </button>}
                  {purchaseType === 'sell' && <button
                    type="button"
                    className="mt-3 inline-flex w-full ml-2 justify-center rounded-md coins_backgroun px-3 py-2 text-sm font-semibold text-yellow-400 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    ref={cancelButtonRef}
                    onClick={() => openModalPayout()}
                  >
                    NEXT
                  </button>}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

