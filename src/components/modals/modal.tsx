"use client";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Timer from "../globalTimer";
import { AesDecrypt, ParseFloat, funForAesEncrypt, funcForDecrypt } from "../helperFunctions";
import { isCouponApplied } from "@/redux/couponSlice";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function Modal({ isOpen, onClose }: any) {
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
  //when coupons applied
  const selectedCoupon = useSelector((state: RootState) => state.coupon.selectedCoupon);
  const appliedCouponCode = useSelector((state: RootState) => state.coupon.appliedCouponCode);
  const error = useSelector((state: RootState) => state.coupon.error);
  const extraGoldOfRuppess = useSelector((state: RootState) => state.coupon.extraGoldOfRuppess);
  const extraGold = useSelector((state: RootState) => state.coupon.extraGold);
  const isAnyCouponApplied: boolean = useSelector(isCouponApplied);
  const [token, setToken] = useState<string | null>(null);
  const [orderId, setOrderId] = useState("");
  const orderIdRef = useRef(null);

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
    console.log(token);
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

  // useEffect(() => {
  //   const token = localStorage.getItem('token')
  //   setToken(token);
  // }, [props.show])

  const buyReqApiHandler = async () => {

    const dataToBeDecrypt = {
      orderType: purchaseType.toUpperCase(),
      item: metalType.toUpperCase(),
      unit: "AMOUNT",
      gram: metalQuantity,
      amount: totalAmount,
      // order_preview_id: props.transactionId,
      amountWithoutTax: gst,
      tax: "3",
      totalAmount: totalAmount,
      couponCode: appliedCouponCode,
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <p>
                  {" "}
                  <Timer />{" "}
                </p>
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <p>
                    Price Breakdown{" "}
                    {transactionType === "grams" ? actualAmount : enteredAmount}
                  </p>
                  <p>
                    {purchaseType === "buy" ? "Purchase" : "Sell"}{" "}
                    {metalType === "gold" ? "Gold" : "Silver"} Weight :{" "}
                    {metalQuantity}{" "}
                  </p>
                  <p>
                    {metalType === "gold" ? "Gold" : "Silver"} Value :{" "}
                    {actualAmount}{" "}
                  </p>
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
                <div className="bg-gray-50 px-4 m-2 py-3 sm:flex sm:flex-row-reverse sm:px-6">


                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    ref={cancelButtonRef}
                    onClick={() => closeModal()}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    ref={cancelButtonRef}
                    onClick={() => buyReqApiHandler()}
                  >
                    procced
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

