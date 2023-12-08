import { AesDecrypt, AesEncrypt } from "@/components/helperFunctions";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { UserReward } from "@/types";

const Redeem = () => {
  const [userRewards, setUserRewards] = useState<UserReward[]>([]);
  const [metal, setMetal] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [itemList, setItemList] = useState<any[]>([]);
  const [size, setSize] = useState(4);

  const redeemReward = async (id: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "do you want to redeem",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let dataToBeEncryptPayload = {
          redemptionId: id,
        };
        const resAfterEncryptData = AesEncrypt(dataToBeEncryptPayload);
        const payloadToSend = {
          payload: resAfterEncryptData,
        };
        const token = localStorage.getItem("token");
        axios
          .post(`${process.env.baseUrl}/user/redeem/reward`, payloadToSend, {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          })
          .then(async (data) => {
            const decryptedData = AesDecrypt(data.data.payload);

            Swal.fire(
              "Success",
              `You have successfully redeemed rewards`,
              "success"
            );
            getRewards(metal, status, page, size);
          })
          .catch(async (error) => {
            const decryptedData = AesDecrypt(error.response.data.payload);
            let decryptedResponse = JSON.parse(decryptedData);
            Swal.fire("Oops!", decryptedResponse.message, "error");
          });
      }
    });
  };

  const handleMetalChange = (e: any) => {
    setMetal(e.target.value);
    getRewards(e.target.value, status, 1, size);
  };

  const handleStatusChange = (e: any) => {
    setStatus(e.target.value);
    getRewards(metal, e.target.value, 1, size);
  };

  const updatePage = (e: any) => {
    let moveTo = e.target.value;
    setPage(moveTo);
    getRewards(metal, status, moveTo, size);
  }

  const nextPageHandler = () => {
    // log("nextPageHandler : ", page + 1);
    setPage(page + 1);
    getRewards(metal, status, page + 1, size);
  }
  const prevPageHandler = () => {
    if (page > 1) {
      // log("nextPageHandler : ", page - 1);
      setPage(page - 1);
      getRewards(metal, status, page - 1, size);
    }
  }

  const getRewards = async (metal: string, status: string, page: number, size: number) => {
    const token = localStorage.getItem("token");
    fetch(
      `${process.env.baseUrl}/user/rewards?page=${page}&limit=${size}&metal=${metal}&status=${status}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then(async (data) => {
        const decryptedData = await AesDecrypt(data.payload);
        let userRewardsDecrypt = JSON.parse(decryptedData).data.rewardsData;

        console.log("decryptedData", JSON.parse(decryptedData).data);
        if (userRewardsDecrypt.length > 0) {
          setPage(JSON.parse(decryptedData).data.currentPage);
          setTotalPage(JSON.parse(decryptedData).data.totalPages);
          let itemList = Array.from(
            { length: JSON.parse(decryptedData).data.totalPages },
            (_, index) => index + 1
          );
          setItemList(itemList);
        } else {
          setPage(0);
          // setSize(3);
        }
        setUserRewards(userRewardsDecrypt);
      })
      .catch((error) => console.error(error));
  };

  const rewardAction = async (type: string, id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${type} gift`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let dataToBeEncryptPayload = {
          userGiftingId: id,
        };
        const resAfterEncryptData = AesEncrypt(dataToBeEncryptPayload);
        const payloadToSend = {
          payload: resAfterEncryptData,
        };
        const token = localStorage.getItem("token");
        axios
          .post(
            `${process.env.baseUrl}/user/gifting/cancellation`,
            payloadToSend,
            {
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
              },
            }
          )
          .then(async (data) => {
            const decryptedData = AesDecrypt(data.data.payload);
            // console.log('decryptedData =======>>', decryptedData)
            console.log(typeof decryptedData)
            // @ts-ignore
            Swal.fire("Success", decryptedData.message, "success");
            getRewards(metal, status, page, size);
          })
          .catch(async (error) => {
            getRewards(metal, status, page, size);
            const decryptedData = AesDecrypt(error.response.data.payload);
            let decryptedResponse = JSON.parse(decryptedData);
            Swal.fire("Oops!", decryptedResponse.message, "error");
          });
      }
    });
  };

  useEffect(() => {
    getRewards(metal, status, page, size);
  }, []);

  // console.log('userRewards', userRewards)
  return (
    <div className="w-full">
      <div className=" ">
        <div className='flex flex-row items-center'>
          <div className=''>
            <label className='text-white m-3'>Metal</label>
            <select
              name="metal"
              id="metal"
              onChange={handleMetalChange}
              style={{ cursor: "pointer" }}
            >
              <option value="ALL" selected={true}>
                All
              </option>
              <option value="GOLD">GOLD</option>
              <option value="SILVER">SILVER</option>
            </select>
          </div>
          <div className=''>
            <label className='text-white ml-4'>Status</label>
            <select
              name="status"
              id="status"
              onChange={handleStatusChange}
              className="text-black cursor-pointer m-3"
            >
              <option value="ALL" selected={true}>
                All
              </option>
              <option value="PENDING">Pending</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="REDEEM">Redeemed</option>
            </select>
          </div>
        </div>
      </div>
      {itemList.length > 0 &&
        <div className="col-12 col-md-3 mb-4">
          <div
          >
            <div>
              <select
                className="form-control"
                onChange={updatePage}
                value={page}
              >
                {itemList.map((number, index) => (
                  <option key={index} value={number}>
                    {number}
                  </option>
                ))}
              </select>
            </div>
            <div>
              {page > 1 && <div onClick={prevPageHandler}>Prev</div>}
              {/* <div>{page}</div> */}
              {page < totalPage && <div onClick={nextPageHandler}>Next</div>}
            </div>
          </div>
        </div>
      }
      {userRewards.length == 0 && (
        <div className="d-flex justify-content-center align-items-center nodata mt-2">
          <div style={{ textAlign: "center", color: "white" }}> No Rewards Found</div>
        </div>
      )}
      {userRewards.map((userRewards) => {
        return (
          <div className="text-white border-4 border-gray-500 rounded-md m-2">
            <div className="m-3 flex flex-row items-center justify-between">
              <div>
                <div className="text-yellow-500">{userRewards?.itemType}</div>
                <div>{userRewards?.description}</div>
              </div>
              <div className="ml-8">
                {userRewards.status == "PENDING" && (
                  <div className="d-flex flex-row">
                    <div
                      className='border-yellow-500 rounded-lg border-2 cursor-pointer p-3'
                      onClick={() => redeemReward(userRewards._id)}
                    >
                      Redeem
                    </div>
                    {userRewards.rewardsType == "GIFTING" && (
                      <div
                        className='border-yellow-500 rounded-lg bg-slate-500 border-2 cursor-pointer p-3'
                        onClick={() =>
                          rewardAction("cancel", userRewards.user_gifting_id)
                        }
                      >
                        Cancel
                      </div>
                    )}
                  </div>
                )}

                {userRewards.rewardsType == "GIFTING" &&
                  userRewards.status == "CANCELLED" && (
                    <div
                      className='border-yellow-500 rounded-lg bg-slate-500 border-2 cursor-pointer p-3'
                    >
                      Cancelled
                    </div>
                  )}

                {userRewards.rewardsType == "GIFTING" &&
                  userRewards.status == "REDEEM" && (
                    <div
                      className='border-yellow-500 rounded-lg bg-slate-500 border-2 cursor-pointer p-3'
                    >
                      Redeemed
                    </div>
                  )}

                {userRewards.rewardsType == "GIFTING" &&
                  userRewards.status == "EXPIRED" && (
                    <div
                      className='border-yellow-500 rounded-lg bg-slate-500 border-2 cursor-pointer p-3'
                    >Expired</div>
                  )}

                {userRewards.rewardsType == "GIFTING" &&
                  userRewards.status == "SEND" && (
                    <div
                      className='border-yellow-500 rounded-lg bg-slate-500 border-2 cursor-pointer p-3'
                    >
                      Redeemed
                    </div>
                  )}

                {userRewards.rewardsType == "REFERANDEARN" &&
                  userRewards.status == "REDEEM" && (
                    <div
                      className='border-yellow-500 rounded-lg bg-slate-500 border-2 cursor-pointer p-3'
                    >
                      Redeemed
                    </div>
                  )}

                {userRewards.rewardsType == "GIFTING" &&
                  userRewards.status == "SENT" && (
                    <div
                      className='border-yellow-500 rounded-lg bg-slate-500 border-2 cursor-pointer p-3'
                      onClick={() =>
                        rewardAction("cancel", userRewards.user_gifting_id)
                      }
                    >
                      Cancel
                    </div>
                  )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default Redeem;
