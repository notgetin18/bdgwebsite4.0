'use client'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Timer from './globalTimer';

export default function Modal({ isOpen, onClose }: any) {
    // const [open, setOpen] = useState(true)
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
    //when coupons applied
    const selectedCoupon = useSelector((state: RootState) => state.coupon.selectedCoupon);
    const appliedCouponCode = useSelector((state: RootState) => state.coupon.appliedCouponCode);
    const error = useSelector((state: RootState) => state.coupon.error);
    const extraGoldOfRuppess = useSelector((state: RootState) => state.coupon.extraGoldOfRuppess);
    const extraGold = useSelector((state: RootState) => state.coupon.extraGold);

    const cancelButtonRef = useRef(null)

    const closeModal = () => {
        onClose(false)
    }

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={closeModal}>
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <p>le le time beta <Timer /></p>
                                    <span>GOLD Weight : {metalQuantity} </span> <br />
                                    <p>GOLD Value : {transactionType === 'grams' ? actualAmount : enteredAmount} </p>  <br />
                                    <p>Promotional SILVER : {metalQuantity} </p> <br />
                                    <p>Total GOLD : {metalQuantity + extraGold} </p> <br />
                                    <p>GST ( +3% ) : {gst} </p> <br />
                                    <p>Total Amount : {transactionType === 'grams' ? actualAmount : enteredAmount}</p> <br />
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">

                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        ref={cancelButtonRef}
                                        onClick={() => closeModal()}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}