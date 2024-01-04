"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Timer from "../globalTimer";
import { applyCoupon, clearCoupon, isCouponApplied } from "@/redux/couponSlice";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useCoupons } from "@/customHooks/coupons";

export default function ModalCoupon({ isOpen, onClose }: any) {
  const cancelButtonRef = useRef(null);
  const [imgModel, setImgModel] = useState(false);
  const coupons = useCoupons();
  const error = useSelector((state: RootState) => state.coupon.error);
  const dispatch = useDispatch();
  const goldData = useSelector((state: RootState) => state.gold);
  const silverData = useSelector((state: RootState) => state.silver);
  const gst = useSelector((state: RootState) => state.shop.gst);
  const metalType = useSelector((state: RootState) => state.shop.metalType);
  const transactionType = useSelector((state: RootState) => state.shop.transactionType);
  const purchaseType = useSelector((state: RootState) => state.shop.purchaseType);
  const enteredAmount = useSelector((state: RootState) => state.shop.enteredAmount);
  const actualAmount = useSelector((state: RootState) => state.shop.actualAmount);
  const totalAmount = useSelector((state: RootState) => state.shop.totalAmount);
  const metalQuantity = useSelector((state: RootState) => state.shop.metalQuantity);
  const selectedCoupon = useSelector((state: RootState) => state.coupon.selectedCoupon);
  const appliedCouponCode = useSelector((state: RootState) => state.coupon.appliedCouponCode);
  const extraGoldOfRuppess = useSelector((state: RootState) => state.coupon.extraGoldOfRuppess);
  const extraGold = useSelector((state: RootState) => state.coupon.extraGold);
  const isAnyCouponApplied = useSelector(isCouponApplied);
  const metalPricePerGram = useSelector((state: RootState) => state.shop.metalPrice);


  useEffect(() => {
    // console.table({ error, appliedCouponCode, extraGoldOfRuppess, extraGold, selectedCoupon, isAnyCouponApplied });
    console.table({
      error, appliedCouponCode, extraGoldOfRuppess, extraGold, purchaseType, actualAmount,
      gst, totalAmount, metalType, transactionType, metalPricePerGram, enteredAmount, metalQuantity,
      selectedCoupon, isAnyCouponApplied
    });
  }, [appliedCouponCode, selectedCoupon, isAnyCouponApplied]);


  const handleApplyCoupon = (coupon: any, amount: any) => {
    dispatch(
      applyCoupon({
        coupon,
        amount,
        goldPrice: goldData.totalPrice,
        metalType,
        transactionType,
      })
    );
  };

  const handleClearCoupon = () => {
    dispatch(clearCoupon());
  };


  const closeModal = () => {
    onClose(false);
  };
  const imgOpen = () => {
    <img src="/lottie/Home Deliveryy.gif" className=" absolute z-50" />;
    setImgModel(true);
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-theme px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <p className="text-white text-center text-5xl extrabold mb-6">
                    Coupons
                  </p>

                  {/* <Link href="#" onClick={imgOpen}>
                    <img src="/coupon 499.png" className="pb-6" />
                  </Link>
                  <Link href="#">
                    <img src="/coupon 899.png" />
                  </Link> */}
                  <Timer />
                  {coupons?.map((coupon: any) => (
                    <div key={coupon._id}>
                      {/* <img className="cursor-pointer pb-6" onClick={() =>  handleApplyCoupon(coupon, enteredAmount)} src="/coupon 499.png" /> */}
                      <p className="text-white">{coupon.description}.</p>
                      <button
                        className="bg-gray-400 mr-2 mb-3 rounded cursor-pointer text-white p-2"
                        onClick={() =>
                          handleApplyCoupon(coupon, enteredAmount)
                        }
                      >
                        Apply Coupon
                      </button>
                      <button
                        className="bg-gray-400 rounded cursor-pointer text-white p-2"
                        onClick={() =>
                          handleClearCoupon()
                        }
                      >
                        Remove Coupon
                      </button>
                    </div>
                  ))}
                  {error && <div className="text-red-500 text-sm">{error}</div>}
                </div>
                <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className=" absolute top-5 right-5 mt-3 inline-flex w-full justify-center bg-themeLight text-white rounded-full px-2 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300  sm:mt-0 sm:w-auto"
                    ref={cancelButtonRef}
                    onClick={() => closeModal()}
                  >
                    <XMarkIcon className="h-4" />
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
