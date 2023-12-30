import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import OtpInput from "react-otp-input";
import Swal from "sweetalert2";
import { AesDecrypt, AesEncrypt } from "../helperFunctions";
import axios, { AxiosRequestConfig } from "axios";
import { useRouter } from "next/navigation";
import { setIsLoggedIn, setShowOTPmodal } from "@/redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import SetProfileForNewUser from "../setProfile";
import { RootState } from "@/redux/store";
import { XMarkIcon } from "@heroicons/react/20/solid";

export default function OtpModal() {
  const [userProfile, setUserProfile] = useState(false);
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const [otpError, setOtpError] = useState("");
  const showProfileForm = useSelector(
    (state: RootState) => state.auth.showProfileForm
  );

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
            "Content-Type": "application/json",
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
            router.push("/");
          } else {
            localStorage.setItem("token", result?.data?.otpVarifiedToken);
            // props.setToggle(2);
            router.push('/auth/profileSetup')
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
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
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

        {/* {showProfileForm && (
          <SetProfileForNewUser
            isOpen={showProfileForm}
            onClose={() => setUserProfile(false)}
          />
        )} */}

       

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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-theme text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-theme px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <h1 className="text-gold01 extrabold text-5xl text-center mb-3">
                    OTP
                  </h1>
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 items-center text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-white"
                      >
                        Enter OTP
                      </Dialog.Title>
                      <div className="mt-2">
                        <OtpInput
                          value={otp}
                          onChange={setOtp}
                          numInputs={6}
                          containerStyle={{
                            padding: "2px",
                            margin: "0 auto",
                            borderRadius: "8px",
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                          shouldAutoFocus={true}
                          renderSeparator={<span> </span>}
                          inputStyle={{
                            width: "2.5rem",
                            height: "2.5rem",
                            textAlign: "center",
                            fontSize: "1rem",
                            border: "2px solid #2c7bac",
                            background: "transparent",
                            color: "#fff",
                            borderRadius: "10px",
                            margin: "0 4px",
                            outline: "none",
                          }}
                          renderInput={(props) => <input {...props} />}
                        />
                        {otpError && (
                          <div className="text-red-600">{otpError}</div>
                        )}
                        <button
                          data-modal-hide="popup-modal"
                          type="button"
                          className="mt-4 text-black bg-themeBlue focus:outline-none rounded-md border border-gray-200 text-sm font-bold px-5 py-2.5 focus:z-10"
                          onClick={() => {
                            handleSubmit();
                          }}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex absolute top-5 right-5 w-full justify-center rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    <XMarkIcon className="h-5" />
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
