import { selectUser } from "@/redux/userDetailsSlice";
import React, { useState, Fragment } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { AesDecrypt, AesEncrypt, funForAesEncrypt } from "@/components/helperFunctions";
import Swal from "sweetalert2";
import axios from "axios";
import Loader from "@/utils/loader";
import ProfileInput from "@/utils/profileInput";

const KycTab = () => {
  const user = useSelector(selectUser);
  const [showDetails, setShowDetails] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleToggleDetails = () => {
    setShowDetails((prevShowDetails) => !prevShowDetails);
  };

  // console.log('user', user.data.isKycDone);

  const formik = useFormik({
    initialValues: {
      pancard_number: "",
    },
    enableReinitialize: true,
    validate(values) {
      // console.log('values 27', values);
      const errors: any = {};
      // Validation of PAN number
      if (values.pancard_number === "") {
        errors.pancard_number = "Please Enter PAN Number";
      } else if (!/^[A-Za-z]{5}\d{4}[A-Za-z]{1}$/.test(values.pancard_number.toUpperCase())) {
        errors.pancard_number =
          "First 5 characters must be alphabets, Next 4 characters must be numbers, and the last 1 character must be an alphabet";
      }
      return errors;
    },

    onSubmit: async (values, { resetForm }) => {
      console.log('values 40', values);

      // if(!panCardImage){
      //     Swal.fire({
      //         position: 'centre',
      //         icon: 'error',
      //         title: 'Oops...',
      //         text: 'Please select image',
      //         showConfirmButton: false,
      //         timer: 1500
      //     })
      //     return;
      // }

      setIsSubmitting(true);
      try {
        let dataToBeEncryptPayload = {
          documentType: "PANCARD",
          value: values.pancard_number.toUpperCase()
        }
        const resAfterEncryptData = await funForAesEncrypt(dataToBeEncryptPayload)

        const payloadToSend = {
          payload: resAfterEncryptData,
        }
        const formData = new FormData();
        formData.append("documentType", 'PANCARD');
        // formData.append("frontImage", panCardImage);
        formData.append("value", values.pancard_number);
        formData.append("payload", payloadToSend.payload);

        const token = localStorage.getItem('token')
        const configHeaders = { headers: { authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
        const response = await axios.post(`${process.env.baseUrl}/user/kyc/verify`, formData, configHeaders);

        const decryptedData = await AesDecrypt(response.data.payload)

        const finalResult = JSON.parse(decryptedData)
        if (finalResult.status) {
          // setCheckingPanStatus(true);
          // updateUserData();
          Swal.fire({
            position: "center",
            icon: 'success',
            title: finalResult.message,
            showConfirmButton: false,
            timer: 3000
          })
        }
        resetForm()
      } catch (error: any) {
        console.error(error);
        const decryptedData = await AesDecrypt(error.response.data.payload)
        const finalResult = JSON.parse(decryptedData)
        Swal.fire({
          position: "center",
          icon: 'error',
          title: 'Oops...',
          text: finalResult.message,
          showConfirmButton: false,
          timer: 3000
        })
        resetForm()
      } finally {
        setIsSubmitting(false);
        resetForm()
      }
    }
  },
  )

  return (
    <Fragment>
      {
        user.data.isKycDone ?
          (<div>
            <div id="rectangle">
              <img
                className="A"
                src="http://freevectorlogo.net/wp-content/uploads/2012/12/emblem-of-india-logo-vector-400x400.png"
                width="50px"
                height="50px"
                alt="Emblem of India"
              />
              <h1 className="h11">भारत सरकार</h1>
              <h4 className="h44">Gov of India</h4>
              <h2 className="h22">आयकर विभाग</h2>
              <h3 className="h33">Income Tax Department</h3>
              <div className="grid grid-cols-2 justify-between mt-10 ml-2">
                <div className="">
                  <div>PAN </div>
                  <div>{showDetails ? <strong>GTEPK8368A</strong> : <strong>XXXXXXXXXX</strong>}</div>
                </div>
                <div>
                  <div className="flex flex-row justify-end mr-2 items-center" onClick={handleToggleDetails}>
                    <div className="mr-1 cursor-pointer">{showDetails ? <FaEyeSlash size={24} /> : <FaEye size={24} />}</div>
                    <div>Show PAN Details</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 justify-between mt-10 ml-2">
                <div>{showDetails ? <strong>AMIT KUMAR</strong> : <strong>XXXXXXXXXXX</strong>}</div>
                <div className="flex justify-end">
                  <div className="mr-2">{showDetails ? <strong>02-Jan-2000</strong> : <strong>xx-xx-xxxx</strong>}</div>
                </div>
              </div>
            </div>
          </div>) :
          (
            <div>
              <div className="coins_background rounded-lg w-full mt-9">
                <div className="">
                  <ProfileInput
                    type="text"
                    label="ENTER YOUR PAN NUMBER"
                    name="pancard_number"
                    formik={formik}
                  />
                </div>
                <button
                  onClick={() => {
                    formik.submitForm()
                  }}
                  className="relative w-full border-2 text-yellow-400 border-yellow-400 rounded-lg py-2"
                >
                  {isSubmitting && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader />
                    </div>
                  )}
                  <strong className={`${isSubmitting ? 'invisible' : 'visible'}`}>
                    VERIFY
                  </strong>
                </button>
              </div>
            </div>
          )
      }
    </Fragment >
  );
};

export default KycTab;


