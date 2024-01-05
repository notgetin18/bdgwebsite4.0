import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
// import { XIcon } from '@heroicons/react/solid'; 
import { XMarkIcon } from '@heroicons/react/20/solid';

import CustomButton from '../customButton';
import { FaChevronCircleDown } from 'react-icons/fa';

export default function CoinModal({ openModalOfCoin, closeModalOfCoin, productsDetailById }: any) {
    const [open, setOpen] = useState(true);
    const cancelButtonRef = useRef(null);

    return (
        <Transition.Root show={openModalOfCoin} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => { setOpen; closeModalOfCoin(); }}>
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg coins_backgroun text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg lg:max-w-xl xl:max-w-4xl">
                                <div className="absolute top-4 right-4">
                                    <XMarkIcon className="h-6 w-6 text-white text-lg cursor-pointer font-bold" onClick={() => {
                                        closeModalOfCoin()
                                        setOpen(false)
                                    }}
                                        ref={cancelButtonRef} />
                                </div>
                                <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <Dialog.Title as="h3" className="text-base text-white font-semibold leading-6">
                                                Convert From Vault
                                            </Dialog.Title>
                                            <div className="mt-2 w-full coins_background border-2 border-yellow-400 rounded-xl sm:my-8 sm:w-full sm:max-w-lg lg:max-w-xl xl:max-w-2xl flex items-center justify-center">
                                                <div className="text-sm w-full text-gray-100 p-2">
                                                    <div className='text-lg w-full font-extrabold'>Available Vault Balance :</div>
                                                    <div className='flex w-full justify-between'>
                                                        <div className='text-lg flex flex-row font-extrabold'>Used Value :<span className='text-gray-400 ml-2'>0.0578 GM</span></div>
                                                        <div className='flex items-center bg-themeBlue rounded'>
                                                            <div className='' >
                                                                <img
                                                                    src={
                                                                        "https://www.brightdigigold.com/images/gold-bars.svg"
                                                                    }
                                                                    alt="digital gold bar"
                                                                    className={`px-2 py-2 h-12 cursor-pointer`}
                                                                />
                                                            </div>
                                                            <div className='px-3'>
                                                                <div className='text-lg font-bold text-black'>Silver</div>
                                                                <div className='text-yellow-600 font-bold text-lg'>0.0045 GM</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='text-white flex items-center'>
                                                        <div className='text-lg font-bold mr-4 '>Convert from Vault</div>
                                                        <input type="checkbox" className='h-6 w-6 coins_backgroun rounded-full ' />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="justify-between px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <CustomButton
                                        btnType="button"
                                        title='PROCCED'
                                        containerStyles="mt-3 inline-flex w-full justify-center rounded-xl bg-themeBlue px-5 py-4 text-2xl font-bold text-black ring-1 ring-inset sm:mt-0 sm:w-auto"
                                    // handleClick={() => {
                                    //     closeModalOfCoin()
                                    //     setOpen(false)
                                    // }}
                                    />
                                    <div>
                                        <div className='text-white text-3xl font-bold'>₹ 1,99,488.23</div>
                                        <div className='text-yellow-400 flex items-center'>
                                            <div className='mr-2 text-lg'>View Breakup</div>
                                            <div className=''>
                                                <FaChevronCircleDown
                                                    className="h-5 w-5 cursor-pointer"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
