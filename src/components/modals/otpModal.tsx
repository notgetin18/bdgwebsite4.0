import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import OtpInput from 'react-otp-input';
import Swal from 'sweetalert2';
import { AesDecrypt, AesEncrypt } from '../helperFunctions';
import axios, { AxiosRequestConfig } from 'axios';
import { useRouter } from 'next/navigation';
import { setIsLoggedIn, setShowOTPmodal } from '@/redux/authSlice';
import { useDispatch } from 'react-redux';

export default function OtpModal() {
  const [open, setOpen] = useState(true)
  const cancelButtonRef = useRef(null)
  const [isModalOpen, setModalOpen] = useState(false);
  const [otp, setOtp] = useState('');
  const router = useRouter();
  const dispatch = useDispatch()
  const [submitting, setSubmitting] = useState(false);
  const [otpError, setOtpError] = useState("");

  const handleSubmit = async () => {
    const mobile_number = localStorage.getItem("mobile_number");
    // setShowMobileNumber(mobile_number);
    if (otp.length < 6) {
      setOtpError("Please Fill the OTP");
    } else {
      const data = {
        mobile_number: localStorage.getItem("mobile_number"),
        otp: otp,
        skipMobileNumber: false,
      };

      // e.preventDefault();
      try {
        setSubmitting(true);
        const resAfterEncrypt = await AesEncrypt(data);

        const body = {
          payload: resAfterEncrypt,
        };
        const header: AxiosRequestConfig = {
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await axios.post(
          `${process.env.baseUrl}/auth/verify/otp`,
          body,
          header
        );
        const decryptedData = await AesDecrypt(response.data.payload);
        const result = JSON.parse(decryptedData);

        if (result.status == true) {
          if (result.data.isNewUser == false) {
            localStorage.setItem("token", result?.data?.otpVarifiedToken);
            // localStorage.setItem("isLogIn", true);
            // dispatch(doShowLoginAside(false));
            // dispatch(logInUser(true));
            // dispatch(profileFilled(true));
            // if (props.redirectData) {
            // props.redirectData({ redirect: "handleClick", data: "SELL" });
            // }
            // props.setToggle(0);
            // props.onHide();
            // log("result?.data : ", result?.data);
            dispatch(setIsLoggedIn(true));
            dispatch(setShowOTPmodal(false));
            router.push('/')
          } else {
            localStorage.setItem("token", result?.data?.otpVarifiedToken);
            // props.setToggle(2);
          }
        } else {
          setOtp("");
          // log("🚀 ~ file: otpScreen.js:112 ~ handleSubmit ~ setOtp:", setOtp)
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: result.message,
          });
        }
        setSubmitting(false);
      } catch (error: any) {
        // log('asdasd');
        const decryptedData = await AesDecrypt(error?.response?.data?.payload);
        const result = JSON.parse(decryptedData);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result.message,
        });
        setOtp("");
        setOtpError("");
      }
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
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
                  <div className="sm:flex sm:items-start">
                    
                    <div className="mt-3 items-center text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Enter OTP
                      </Dialog.Title>
                      <div className="mt-2">
                        <OtpInput
                          value={otp}
                          onChange={setOtp}
                          numInputs={6}
                          containerStyle={{
                            padding: '2px',
                            margin: '0 auto',
                            borderRadius: '8px',
                            display: 'flex',
                            justifyContent: 'space-around',
                          }}
                          shouldAutoFocus={true}
                          renderSeparator={<span> </span>}
                          inputStyle={{
                            width: '2.5rem',
                            height: '2.5rem',
                            textAlign: 'center',
                            fontSize: '1rem',
                            border: '2px solid #FCD34D',
                            borderRadius: '10px',
                            margin: '0 4px',
                            outline: 'none',
                          }}
                          renderInput={(props) => <input {...props} />}
                        />
                        {otpError && <div className='text-red-600'>{otpError}</div>}
                        <button
                          data-modal-hide="popup-modal"
                          type="button"
                          className="mt-4 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                          onClick={() => { handleSubmit() }}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => setOpen(false)}
                  >
                    Deactivate
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
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