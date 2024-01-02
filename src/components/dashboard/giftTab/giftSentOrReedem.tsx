import { AesDecrypt, AesEncrypt } from "@/components/helperFunctions";
import React, { memo, useEffect, useState } from "react";
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
  const [size, setSize] = useState(5);
  console.log("i am from Reedem");

  const redeemReward = async (id: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to redeem",
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
  };

  const nextPageHandler = () => {
    setPage(page + 1);
    getRewards(metal, status, page + 1, size);
  };
  const prevPageHandler = () => {
    if (page > 1) {
      setPage(page - 1);
      getRewards(metal, status, page - 1, size);
    }
  };

  const getRewards = async (
    metal: string,
    status: string,
    page: number,
    size: number
  ) => {
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

        // console.log("decryptedData", JSON.parse(decryptedData).data);
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
            // console.log(typeof decryptedData)
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
    <div className="w-full rounded">
      <div className=" col-span-2 p-4 rounded-lg bg-themeLight text-white">
        <p className="text-gold01 text-center text-5xl extrabold">
          GIFTING HISTORY
        </p>
        <dl className="mt-10 space-y-2">
          <div className=" ">
            <div className="grid grid-cols-2 items-center justify-between">
              <div className="">
                <label className="text-white m-3">Metal</label>
                <select
                  name="metal"
                  id="metal"
                  onChange={handleMetalChange}
                  className="cursor-pointer text-white rounded bg-themeLight px-3 py-2 w-32 focus:outline-none"
                >
                  <option value="ALL" selected={true}>
                    All
                  </option>
                  <option value="GOLD">GOLD</option>
                  <option value="SILVER">SILVER</option>
                </select>
              </div>
              <div className="">
                <label className="text-white m-4">Status</label>
                <select
                  name="status"
                  id="status"
                  onChange={handleStatusChange}
                  className="cursor-pointer text-white rounded bg-themeLight px-3 py-2 w-32 focus:outline-none"
                >
                  <option value="ALL" selected={true}>
                    All
                  </option>
                  <option value="PENDING">Pending</option>
                  <option value="CANCELLED">Cancelled</option>
                  <option value="REDEEM">Redeemed</option>
                </select>
              </div>
              {itemList.length > 0 && (
                <div className="flex items-center justify-end ">
                  {page > 1 && (
                    <div
                      className="m-2 px-2 text-center text-white bg-transparent rounded border-2 border-yellow-400 cursor-pointer"
                      onClick={prevPageHandler}
                    >
                      Prev
                    </div>
                  )}
                  <div className="">
                    <select
                      className="cursor-pointer px-2 text-white rounded border-2 border-yellow-400 bg-transparent"
                      onChange={updatePage}
                      value={page}
                    >
                      {itemList.map((number, index) => (
                        <option
                          className="text-black text-center"
                          key={index}
                          value={number}
                        >
                          {number}
                        </option>
                      ))}
                    </select>
                  </div>
                  {page < totalPage && (
                    <div
                      className="m-2 px-2 text-center text-white bg-transparent rounded border-2 border-yellow-400 cursor-pointer"
                      onClick={nextPageHandler}
                    >
                      Next
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {userRewards.length == 0 && (
            <div className="d-flex justify-content-center align-items-center nodata py-6">
              <div style={{ textAlign: "center", color: "white" }}>
                {" "}
                No Rewards Found
              </div>
            </div>
          )}
          <div className=" grid grid-cols-2 gap-2">
            {userRewards.map((userRewards) => {
              return (
                <div className="text-white bg-themeLight rounded-md m-4">
                  <div className="m-3 flex flex-row items-center justify-between">
                    <div>
                      <div className="text-yellow-500">
                        {userRewards?.itemType}
                      </div>
                      <div>{userRewards?.description}</div>
                    </div>
                    <div className="ml-8">
                      {userRewards.status == "PENDING" && (
                        <div className="d-flex flex">
                          <div
                            className="border-yellow-500 rounded-lg border-2 cursor-pointer p-3 mr-3"
                            onClick={() => redeemReward(userRewards._id)}
                          >
                            Redeem
                          </div>
                          {userRewards.rewardsType == "GIFTING" && (
                            <div
                              className="border-yellow-500 rounded-lg bg-themeLight border-2 cursor-pointer p-3"
                              onClick={() =>
                                rewardAction(
                                  "cancel",
                                  userRewards.user_gifting_id
                                )
                              }
                            >
                              Cancel
                            </div>
                          )}
                        </div>
                      )}

                      {userRewards.rewardsType == "GIFTING" &&
                        userRewards.status == "CANCELLED" && (
                          <div className="border-yellow-500 rounded-lg bg-slate-500 border-2 cursor-pointer p-3">
                            Cancelled
                          </div>
                        )}

                      {userRewards.rewardsType == "GIFTING" &&
                        userRewards.status == "REDEEM" && (
                          <div className="border-yellow-500 rounded-lg bg-slate-500 border-2 cursor-pointer p-3">
                            Redeemed
                          </div>
                        )}

                      {userRewards.rewardsType == "GIFTING" &&
                        userRewards.status == "EXPIRED" && (
                          <div className="border-yellow-500 rounded-lg bg-slate-500 border-2 cursor-pointer p-3">
                            Expired
                          </div>
                        )}

                      {userRewards.rewardsType == "GIFTING" &&
                        userRewards.status == "SEND" && (
                          <div className="border-yellow-500 rounded-lg bg-slate-500 border-2 cursor-pointer p-3">
                            Redeemed
                          </div>
                        )}

                      {userRewards.rewardsType == "REFERANDEARN" &&
                        userRewards.status == "REDEEM" && (
                          <div className="border-yellow-500 rounded-lg bg-slate-500 border-2 cursor-pointer p-3">
                            Redeemed
                          </div>
                        )}

                      {userRewards.rewardsType == "GIFTING" &&
                        userRewards.status == "SENT" && (
                          <div
                            className="border-yellow-500 rounded-lg bg-slate-500 border-2 cursor-pointer p-3"
                            onClick={() =>
                              rewardAction(
                                "cancel",
                                userRewards.user_gifting_id
                              )
                            }
                          >
                            Cancel
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </dl>
      </div>
    </div>
  );
};

export default memo(Redeem);
