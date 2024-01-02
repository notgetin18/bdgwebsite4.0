import { fetchAllUPI } from "@/api/DashboardServices";
import {
  AesDecrypt,
  AesEncrypt,
  funcForDecrypt,
} from "@/components/helperFunctions";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import UpiModal from "./addNewUpiId";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";

const AddedBanksOrUpiIds = ({ toggled }: any) => {
  const [upiList, setUpiList] = useState([]);
  const [allUpiList, setAllUpiList] = useState([]);
  const [allBankList, setAllBankList] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [TotoggleUPImodal, setToggleUPImodal] = useState(false);
  const [upiUpdated, setupiUpdated] = useState(false);

  const toggleUPImodal = () => {
    setToggleUPImodal(!TotoggleUPImodal);
  };

  const fetchBankAndUPIDetails = async () => {
    try {
      const { UpiList, BankList, decryptedDataList } = await fetchAllUPI();
      console.log(UpiList, BankList, decryptedDataList);
      setAllUpiList(UpiList);
      setUpiList(upiList);
      setAllBankList(decryptedDataList);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchBankAndUPIDetails();
  }, [toggled, upiUpdated]);

  // console.log('upiList', { upiList, allUpiList, allBankList })
  // console.log('bankList', bankList)
  // console.log('from bank verification', toggled);
  // console.log('allBankList--', allBankList)
  console.log("allUpiList==", allUpiList);
  console.log("upiList -->", upiList);

  const deleteUPIOrBankAccount = async (deleteItem: any) => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      //   log('deleteItem', deleteItem);
      const swalCustomBottons = Swal.mixin({
        customClass: {
          confirmButton: "swalButtonsYes",
          cancelButton: "swalButtonsNo",
        },
        buttonsStyling: false,
      });
      swalCustomBottons
        .fire({
          title: "Are you sure?",
          text: "You Want to delete this UPI",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          reverseButtons: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            //   Notiflix.Loading.custom({svgSize:'180px',customSvgCode: '<object type="image/svg+xml" data="/svg/pageloader.svg">svg-animation</object>'});
            let dataToBeEncryptPayload = {
              id: deleteItem,
            };
            const resAfterEncryptData = await AesEncrypt(
              dataToBeEncryptPayload
            );
            const payloadToSend = {
              payload: resAfterEncryptData,
            };
            const token = localStorage.getItem("token");
            const configHeaders = {
              headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                //  onUploadProgress: Notiflix.Loading.circle()
              },
            };
            const response = await axios.post(
              `${process.env.baseUrl}/user/destroy/upi`,
              payloadToSend,
              configHeaders
            );
            const decryptedData = await AesDecrypt(response.data.payload);
            const finalResult = JSON.parse(decryptedData);
            if (finalResult.status) {
              await fetchBankAndUPIDetails();
            } else {
              alert("some error occured please try again");
            }
          }
        })
        .catch((err) => {
          alert(err);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  return (
    <div className="m-3 rounded">
      <div>
        {allBankList.length == 0 ? (
          <div>No Bank Added</div>
        ) : (
          <div>
            {allBankList &&
              allBankList.map((bank, key) => {
                return (
                  <>
                    {bank.documentType == "BANKACCOUNT" && (
                      <div key={key}>
                        <div className="flex justify-between text-white pb-2">
                          <span className="">Account Holder's Name</span>
                          <span>{AesDecrypt(bank?.bankData?.accountName)}</span>
                        </div>
                        <hr className="border-gray-500" />
                        <div className="flex justify-between text-white pb-2">
                          <span className="">Account Number</span>
                          <span>
                            {AesDecrypt(bank?.bankData?.accountNumber)}
                          </span>
                        </div>
                        <hr className="border-gray-500" />
                        <div className="flex justify-between text-white pb-2">
                          <span className="">Bank Name</span>
                          <span>{AesDecrypt(bank?.bankData?.bankName)}</span>
                        </div>
                        <hr className="border-gray-500" />
                        <div className="flex justify-between text-white pb-2">
                          <span className="">IFSC Code</span>
                          <span>{AesDecrypt(bank?.bankData?.ifsc)}</span>
                        </div>
                        <hr className="border-gray-500" />
                        <button
                          className="delete mt-3 mb-3"
                          onClick={() => {
                            deleteUPIOrBankAccount(bank?._id);
                          }}
                        >
                          <div className="text-red-600 px-4 py-2">
                            {" "}
                            Delete Bank Details
                          </div>
                        </button>
                      </div>
                    )}
                  </>
                );
              })}
          </div>
        )}
      </div>
      <div>{!allBankList && <div>No Banks or UPI Added</div>}</div>
      <div
        onClick={toggleUPImodal}
        className="flex cursor-pointer justify-between items-center rounded bg-themeLight px-3 py-1"
      >
        <div className="text-2xl ">ADD UPI</div>
        <div className="cursor-pointer">
          {TotoggleUPImodal ? (
            <FaChevronCircleUp
              className="h-6 w-6"
              aria-hidden="true"
              onClick={(e: any) => {
                e.stopPropagation();
                toggleUPImodal();
              }}
            />
          ) : (
            <FaChevronCircleDown
              className="h-6 w-6"
              aria-hidden="true"
              onClick={(e: any) => {
                e.stopPropagation();
                toggleUPImodal();
              }}
            />
          )}
        </div>
      </div>
      {TotoggleUPImodal && (
        <UpiModal
          toggled={toggled}
          toggleUPImodal={toggleUPImodal}
          upiUpdated={upiUpdated}
          setupiUpdated={setupiUpdated}
        />
      )}
      <div className="p-2">
        {allUpiList.length == 0 ? (
          <div>No UPI ID Added</div>
        ) : (
          <>
            {allBankList &&
              allBankList.map((bank, key) => {
                return (
                  <div className="mt-4">
                    {bank.documentType == "UPI" && (
                      <div key={key}>
                        <div className="flex justify-between text-white pb-2">
                          <span className="">UPI ID</span>
                          <span>{AesDecrypt(bank?.value)}</span>
                        </div>

                        <hr className="border-gray-500" />
                        <button
                          className="delete mt-3 mb-3"
                          onClick={() => {
                            deleteUPIOrBankAccount(bank?._id);
                          }}
                        >
                          <div className="text-red-600 px-4 py-2">
                            {" "}
                            Delete UPI ID
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
          </>
        )}
      </div>
    </div>
  );
};

export default AddedBanksOrUpiIds;
