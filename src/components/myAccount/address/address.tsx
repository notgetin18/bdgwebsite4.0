import React, { useEffect, useState } from "react";
import EditAddress from "./editAddress";
import AddNewAddress from "./addNewAddress";
import Swal from "sweetalert2";
import { getUserAddressList } from "@/api/DashboardServices";
import { AesDecrypt, AesEncrypt } from "@/components/helperFunctions";
import axios from "axios";

const AddressTab = () => {
  const [editAddress, setEditAddress] = useState<String>();
  const [showEditAddress, setShowEditAddress] = useState<boolean>(false);
  const [showAddNewAddress, setShowAddNewAddress] = useState<boolean>(false);
  const [addressList, setaddressList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const maxAddressCount = 3;

  const updateAddressList = async () => {
    try {
      const addresses = await getUserAddressList();
      setaddressList(addresses);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    updateAddressList();
  }, []);

  const closeEditAddress = () => {
    setShowEditAddress(false);
  };

  const openAddNewAddress = () => {
    if (addressList && addressList.length < maxAddressCount) {
      setShowAddNewAddress(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You can't add more than 3 addresses. Please delete one of the above first.",
        showConfirmButton: true,
        timer: 2500,
      });
    }
  };

  const closeAddNewAddress = () => {
    setShowAddNewAddress(false);
  };

  const deleteAddress = async (deleteItem: any) => {
    if (!isSubmitting) {
      setIsSubmitting(true);

      const swalButtons = Swal.mixin({
        customClass: {
          confirmButton: "swalButtonsYes",
          cancelButton: "swalButtonsNo",
        },
        buttonsStyling: false,
      });
      swalButtons
        .fire({
          title: "Are you sure?",
          text: "You Want to delete this address",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          reverseButtons: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
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
              },
            };
            const response = await axios.post(
              `${process.env.baseUrl}/user/address/delete`,
              payloadToSend,
              configHeaders
            );
            const decryptedData = AesDecrypt(response.data.payload);
            const finalResult = JSON.parse(decryptedData);
            if (finalResult.status) {
              updateAddressList();
            } else {
              alert("some error occured please try again");
            }
          }
        })
        .catch((err) => {
          alert("some error occured please try again");
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  return (
    <div className="coins_backgroun rounded-xl p-4">
      {showEditAddress ? (
        <div>
          <EditAddress
            ToEditAddress={editAddress}
            onCancel={closeEditAddress}
            onAddressListUpdate={updateAddressList}
          />
        </div>
      ) : showAddNewAddress ? (
        <div>
          <AddNewAddress
            onCancel={closeAddNewAddress}
            onAddressListUpdate={updateAddressList}
          />
        </div>
      ) : (
        <>
          {addressList?.map((address: any, key) => (
            <div key={key}>
              <p className="text-white pl-2 text-lg">Address {key + 1}</p>
              <address className="">
                {/* @ts-ignore */}
                <p className="pl-1 mt-4 mb-4 text-white">
                  {address?.address?.line1}, {address?.address?.line2},{" "}
                  {address?.address?.city}, {address?.address?.state},{" "}
                  {address?.address?.pincode},
                </p>
              </address>
              <div className="grid grid-cols-2 gap-4 mt-2 mb-3">
                <button
                  className="edit"
                  onClick={() => {
                    setEditAddress(address);
                    setShowEditAddress(true);
                  }}
                >
                  <div className="px-4 py-2 text-yellow-400">Edit</div>
                </button>
                <button
                  className="delete"
                  onClick={() => deleteAddress(address._id)}
                >
                  <div className="text-red-600 px-4 py-2">Delete</div>
                </button>
              </div>
            </div>
          ))}
          <button
            className="px-2 py-2 bg-themeBlue font-semibold rounded"
            onClick={openAddNewAddress}
          >
            Add New Address
          </button>
        </>
      )}
    </div>
  );
};

export default AddressTab;
