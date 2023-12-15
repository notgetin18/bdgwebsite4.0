import React from 'react';
import { IoMdClose } from 'react-icons/io';
import OtpInput from 'react-otp-input';
import { Transition } from '@headlessui/react';
import { OtpModalProps } from '@/types';

const OtpModal: React.FC<OtpModalProps> = ({
    isOpen,
    onClose,
    onSubmitVerify,
    handleOTPChange,
    otp,
    otpError,
    isSubmitting,
}) => {
    return (
        <Transition show={isOpen} aria-labelledby="contained-modal-title-vcenter">
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="otp_background p-4 max-w-md mx-auto rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-lg font-semibold text-white">Enter OTP</div>
                        <div className="cursor-pointer" onClick={onClose}>
                            <IoMdClose style={{ color: 'white' }} size={26} />
                        </div>
                    </div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        onSubmitVerify(e)
                    }}>
                        <div className="mb-4">
                            <div className="mb-2">
                                <OtpInput
                                    onChange={handleOTPChange}
                                    value={otp}
                                    inputStyle="inputStyle"
                                    inputType="tel"
                                    shouldAutoFocus={true}
                                    numInputs={6}
                                    renderInput={(props) => (
                                        <input
                                            type="number"
                                            value={props.value}
                                            onChange={props.onChange}
                                            onFocus={props.onFocus}
                                            onBlur={props.onBlur}
                                            onKeyDown={props.onKeyDown}
                                            className="text-white border-3 border-yellow-400 w-12 h-12 text-center m-2 rounded bg-slate-500 text-lg font-semibold" // Adjust width and height
                                        />
                                    )}
                                />
                            </div>
                            <span className="block text-red-500 text-sm">{otpError}</span>
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="py-2 px-12 bg-yellow-400 font-semibold rounded-md"
                            >
                                VERIFY
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Transition>
    );
};

export default OtpModal;
