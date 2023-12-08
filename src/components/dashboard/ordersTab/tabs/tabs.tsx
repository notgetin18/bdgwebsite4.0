"use client";
import { classNames } from "@/components";
import Timer from "@/components/globalTimer";
import { AesEncrypt, funcForDecrypt } from "@/components/helperFunctions";
import { Tab } from "@headlessui/react";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { format, startOfMonth, startOfYear, subYears } from "date-fns";
import { useEffect, useState } from "react";

const data = [
  { id: 1, name: "DIGITAL GOLD ₹(10)" },
  { id: 2, name: "DIGITAL GOLD ₹(8)" },
  { id: 3, name: "DIGITAL GOLD ₹(7)" },
  { id: 4, name: "DIGITAL GOLD ₹(10)" },
  { id: 5, name: "DIGITAL GOLD ₹(100)" },
];
const orders = [
  { heading: "Order Number :", name: "BDG2314012037037" },
  { heading: "Order Date :", name: "2023-02-14 12:17 PM" },
  { heading: "Order Status :", name: "FAILED" },
  { heading: "Transaction Type :", name: "BUY" },
  { heading: "Product Name :", name: "24K GOLD" },
  { heading: "Rate per Grams :", name: "5827.50" },
  { heading: "Purchase Weight :", name: "0" },
  { heading: "Coupon Code :", name: "BDG1" },
  { heading: "Coupon Weight :", name: "15.0000" },
  { heading: "Applied Tax :", name: "(1.5% CGST + 1.5% SGST)" },
  { heading: "Tax Amount:", name: "₹ 2484.55" },
  // More people...
];
const OrdersTabs = () => {
  const [userDetails, setUserDetails] = useState("");
  const [range, setRange] = useState([
    {
      startDate: '',
      endDate: '',
      key: "selection",
    },
  ]);
  const [status, setStatus] = useState("ALL");
  const [metalValue, setMetalValue] = useState("ALL");
  const [transactionValue, setTransactionValue] = useState("ALL");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(9);
  const [dashboardData, setDashboardData] = useState<any[]>([]);



  useEffect(() => {
    // document.addEventListener("keydown", hideOnEscape, true);
    // document.addEventListener("click", hideOnClickOutside, true);
    // console.log('new Date(range[0].endDate)', format(new Date(range[0].endDate), "yyyy-MM-dd"), format(new Date(range[0].startDate), "yyyy-MM-dd"),)
    handleFilter(
      range[0].endDate ? format(new Date(range[0].endDate), "yyyy-MM-dd") : '',
      range[0].startDate ? format(new Date(range[0].startDate), "yyyy-MM-dd") : '',
      status,
      metalValue,
      transactionValue,
      page,
      size
    );

    const token = localStorage.getItem("token");
    const configHeaders = {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`${process.env.baseUrl}/auth/validate/token`, configHeaders)
      .then((response) => response.json())
      .then(async (data) => {
        const decryptedData = await funcForDecrypt(data.payload);
        setUserDetails(JSON.parse(decryptedData).data);
      });
  }, []);

  // console.log('userDetails', userDetails)
  const handleFilter = async (
    selectDate = '',
    fromDate = '',
    orderStatus = '',
    metal = '',
    transaction = '',
    page: any,
    size: any
  ) => {
    const token = localStorage.getItem("token");
    const configHeaders = {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    // log(`page =${page} : size=${size} selectDate = ${selectDate} : fromDate = ${fromDate} : transaction = ${transaction} : orderStatus = ${orderStatus} : metal = ${metal} `)

    const data = {
      to_Date: selectDate,
      from_date: fromDate,
      orderType: transaction,
      status: orderStatus,
      metal: metal,
    };
    const resAfterEncrypt = await AesEncrypt(data);

    const body = {
      payload: resAfterEncrypt,
    };
    axios
      .post(`${process.env.baseUrl}/user/order/history?page=${page}&limit=${size}`, body, configHeaders)
      .then(async (data) => {
        const decryptedData = await funcForDecrypt(data.data.payload);
        // log('orders',JSON.parse(decryptedData).data);
        let allOrders = JSON.parse(decryptedData).data.order;
        console.log("allOrders : ", allOrders)
        setDashboardData(allOrders);
        if (allOrders.length > 0) {
          // setActiveTab(allOrders[0]);
          // setPage(JSON.parse(decryptedData).data.currentPage)
          // setTotalPage(JSON.parse(decryptedData).data.totalPages)
          let itemList = Array.from({ length: JSON.parse(decryptedData).data.totalPages }, (_, index) => index + 1);
          // setItemList(itemList);

        } else {
          // setPage(0);
          // setSize(3);
        }
      })
      .catch((error) => console.error("errordata", error));
  };

  console.log('dashboardData =========> ', dashboardData)

  return (
    <div className="w-full">
      <Tab.Group defaultIndex={1}>
        <div className="grid grid-cols-5 gap-6">
          <div className=" col-span-2 ">
            <Tab.List className="rounded-xl p-1 ">
              {dashboardData.map((item, key) => (
                <Tab
                  // key={category}
                  className={({ selected }) =>
                    classNames(
                      "w-full border-2 rounded-lg py-2 text-sm font-medium leading-5 px-4 mb-2",
                      "focus:outline-none border-2",
                      selected
                        ? "bg-themeLight  text-white shadow border-2"
                        : "text-blue-100 hover:bg-white/[0.12] hover:text-white border-2"
                    )
                  }
                >
                  <div className="flex justify-between ">
                    <div className="flex items-center">
                      {/* gold coin image */}
                      {item?.orderType === "PRODUCT" && item?.itemType === 'GOLD' && <img
                        alt="gold-logo"
                        className="h-6 mr-6"
                        src="https://cdn4.vectorstock.com/i/1000x1000/23/78/gold-coin-vector-2272378.jpg"
                      />}
                      {/* silver coin image */}
                      {item?.orderType === "PRODUCT" && item?.itemType === 'SILVER' && <img
                        alt="gold-logo"
                        className="h-6 mr-6"
                        src="https://cf-cdn.pcjeweller.com/public/uploads/catalog/product/custom/s/SCGL00050-1__654735669.jpg"
                      />}
                      {/* digital gold BUY image */}
                      {item?.orderType === "BUY" && item?.itemType === 'GOLD' && <img
                        alt="gold-logo"
                        className="h-6 mr-6"
                        src="https://www.blog1.trymintly.com/wp-content/uploads/2022/08/Digital-Gold-1.jpg"
                      />}
                      {/* digital gold SELL image */}
                      {item?.orderType === "SELL" && item?.itemType === 'GOLD' && <img
                        alt="gold-logo"
                        className="h-6 mr-6"
                        src="https://cdn4.vectorstock.com/i/1000x1000/23/78/gold-coin-vector-2272378.jpg"
                      />}
                      {/* digital silver BUY  image */}
                      {item?.orderType === "BUY" && item?.itemType === 'SILVER' && <img
                        alt="gold-logo"
                        className="h-6 mr-6"
                        src="https://imgnew.outlookindia.com/uploadimage/library/16_9/16_9_2/IMAGE_1674541554.webp"
                      />}
                      {/* digital silver SELL  image */}
                      {item?.orderType === "SELL" && item?.itemType === 'SILVER' && <img
                        alt="gold-logo"
                        className="h-6 mr-6"
                        src="https://imgnew.outlookindia.com/uploadimage/library/16_9/16_9_2/IMAGE_1674541554.webp"
                      />}
                      {/*reward digital silver  image */}
                      {item?.orderType === "REWARD" && item?.itemType === 'SILVER' && <img
                        alt="gold-logo"
                        className="h-6 mr-6"
                        src="https://img.freepik.com/premium-vector/achievement-trophy-flat-vector-illustration-banner_128772-725.jpg"
                      />}
                      {/*reward digital gold  image */}
                      {item?.orderType === "REWARD" && item?.itemType === 'GOLD' && <img
                        alt="gold-logo"
                        className="h-6 mr-6"
                        src="https://img.freepik.com/premium-vector/achievement-trophy-flat-vector-illustration-banner_128772-725.jpg"
                      />}
                      {/*GIFT  image */}
                      {item?.orderType === "GIFT" && <img
                        alt="gold-logo"
                        className="h-6 mr-6"
                        src="https://cityfurnish.com/blog/wp-content/uploads/2023/07/wrapped-gift-box-with-shiny-gold-decoration-generated-by-ai-min-1200x900.jpg"
                      />}
                    </div>
                    <div className="flex flex-col justify-between items-center">
                      <div className="flex flex-col  items-start ">
                        <p className="flex flex-row">
                          {item?.orderType !== "REWARD" && (
                            <span className="p-1">{item?.itemType}</span>
                          )}
                          <span className="p-1">
                            {item?.orderType === "PRODUCT" && <p>Coin Purchase</p>}
                            {item?.orderType === "REWARD" && <p>Promotional {item?.itemType}</p>}
                            {item?.orderType === "BUY" && <p>Purchase</p>}
                            {item?.orderType === "SELL" && <p>Sold</p>}
                            {item?.orderType === "GIFT" &&
                              item?.rewardsType === "SEND" && <p>Gift Sent</p>}
                            {item?.orderType === "GIFT" &&
                              item?.rewardsType === "RECEIVED" && <p>Gift Received</p>}
                          </span>
                        </p>
                        <div>{item?.gram}gm</div>
                        {/* {item?.status} */}
                        <div className="flex">
                          <span
                            className={`text-xs rounded-lg  py-1 mr-4 ${item?.status === "SUCCESS" || item?.status === "COMPLETED"
                              ? "text-green-500"
                              : item?.status === "PENDING"
                                ? "text-yellow-500"
                                : item?.status === "FAILED"
                                  ? "text-red-500"
                                  : "" // Default color or add another color class
                              }`}
                          >
                            {item?.status}

                          </span>
                          {/* <ArrowRightIcon className="h-5" /> */}
                        </div>
                      </div>
                    </div>
                    <div>
                      {item?.totalAmount !== 0 && <p className="text-white font-extrabold text-xl">₹{item?.totalAmount}</p>}
                      {/* <p className="text-white font-extrabold text-xl">₹{item?.totalAmount}</p> */}
                      <p>{new Date(item?.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}</p>
                      <p>{new Date(item?.createdAt).toLocaleTimeString("en-IN", {
                        hour: "numeric",
                        minute: "numeric",
                      })}</p>
                    </div>
                  </div>
                </Tab>
              ))}
            </Tab.List>
            <div className="flex justify-between items-center bg-themeLight p-4 rounded-xl text-white">
              <p>Current Page</p>
              <p className="bg-themeLight px-6 py-1 rounded">1</p>
              <div className="flex">
                <button className="bg-themeLight px-2 py-1 rounded">
                  next
                </button>
              </div>
            </div>
          </div>
          <Tab.Panels className=" col-span-3">
            {data.map((category) => (
              <Tab.Panel
                className={classNames(
                  "rounded-lg bg-themeLight",
                  "focus:outline-none"
                )}
              >
                <table className="min-w-full">
                  <tbody className="divide-y divide-gray-600">
                    {orders.map((order) => (
                      <tr key={order.heading}>
                        <td className="px-3 py-3 text-sm text-themeBlue sm:table-cell">
                          {order.heading}
                        </td>
                        <td className="px-3 py-3 text-sm text-white">
                          {order.name}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td className="px-3 py-3 text-sm text-gold01 sm:table-cell">
                        Total Invoice Value :
                      </td>
                      <td className="px-3 py-3 text-sm text-gold01">
                        ₹ 2484.55
                      </td>
                    </tr>

                    <tr>
                      <td className="px-3 py-3 sm:table-cell" colSpan={2}>
                        <button className="text-center text-sm text-gold01 border-2 px-4 py-1 rounded-lg w-full border-yellow-500">
                          <DocumentArrowDownIcon className="h-7 inline-block" />{" "}
                          Download Invoice
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </div>
        <div className="bg-slate-600 m-2 text-lg "><Timer /></div>
      </Tab.Group>
    </div>
  );
};

export default OrdersTabs;
