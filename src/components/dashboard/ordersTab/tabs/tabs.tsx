"use client";
import { classNames } from "@/components";
import Timer from "@/components/globalTimer";
import {
  AesEncrypt,
  formatString,
  funcForDecrypt,
} from "@/components/helperFunctions";
import { Tab } from "@headlessui/react";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { addDays, format, startOfMonth, startOfYear, subYears } from "date-fns";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import OrderDetails from "./orderDetails";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { FaCalendarAlt } from "react-icons/fa";
import Vault from "./vault";

const OrdersTabs = () => {
  const year = new Date().getFullYear();
  const [userDetails, setUserDetails] = useState("");
  const [status, setStatus] = useState("ALL");
  const [metalValue, setMetalValue] = useState("ALL");
  const [transactionValue, setTransactionValue] = useState("ALL");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [dashboardData, setDashboardData] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<String>("");
  const [totalPage, setTotalPage] = useState(1);
  const [itemList, setItemList] = useState<any[]>([]);
  const [range, setRange] = useState([
    {
      startDate: new Date(`${year}/${1}/${1}`),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [open, setOpen] = useState(false);
  const refOne = useRef<HTMLDivElement>(null);

  // hide dropdown on ESC press
  const hideOnEscape = (e: { key: string }) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Hide dropdown on outside click
  const hideOnClickOutside = (e: any) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
    handleFilter(
      range[0].endDate ? format(new Date(range[0].endDate), "yyyy-MM-dd") : "",
      range[0].startDate
        ? format(new Date(range[0].startDate), "yyyy-MM-dd")
        : "",
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

  console.log("userDetails", userDetails);
  const handleFilter = async (
    selectDate = "",
    fromDate = "",
    orderStatus = "",
    metal = "",
    transaction = "",
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
      .post(
        `${process.env.baseUrl}/user/order/history?page=${page}&limit=${size}`,
        body,
        configHeaders
      )
      .then(async (data) => {
        const decryptedData = await funcForDecrypt(data.data.payload);
        let allOrders = JSON.parse(decryptedData).data.order;
        // console.log("allOrders : ", allOrders)
        setDashboardData(allOrders);
        if (allOrders.length > 0) {
          setActiveTab(allOrders[0]);
          setPage(JSON.parse(decryptedData).data.currentPage);
          setTotalPage(JSON.parse(decryptedData).data.totalPages);
          let itemList = Array.from(
            { length: JSON.parse(decryptedData).data.totalPages },
            (_, index) => index + 1
          );
          setItemList(itemList);
        } else {
          // setPage(0);
          // setSize(3);
        }
      })
      .catch((error) => console.error("errordata", error));
  };
  // console.log('dashboardData =========> ', dashboardData)
  const handleClick = (item: any) => {
    setActiveTab(item);
  };

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setStatus(value);
    const formattedEndDate = range[0].endDate
      ? format(new Date(range[0].endDate), "yyyy-MM-dd")
      : "";
    const formattedStartDate = range[0].startDate
      ? format(new Date(range[0].startDate), "yyyy-MM-dd")
      : "";
    handleFilter(
      formattedEndDate,
      formattedStartDate,
      e.target.value,
      metalValue,
      transactionValue,
      page,
      size
    );
  };

  const handleMetalChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setMetalValue(value);
    const formattedEndDate = range[0].endDate
      ? format(new Date(range[0].endDate), "yyyy-MM-dd")
      : "";
    const formattedStartDate = range[0].startDate
      ? format(new Date(range[0].startDate), "yyyy-MM-dd")
      : "";
    handleFilter(
      formattedEndDate,
      formattedStartDate,
      status,
      value,
      transactionValue,
      page,
      size
    );
  };

  const handleTransactionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setTransactionValue(value);
    const formattedEndDate = range[0].endDate
      ? format(new Date(range[0].endDate), "yyyy-MM-dd")
      : "";
    const formattedStartDate = range[0].startDate
      ? format(new Date(range[0].startDate), "yyyy-MM-dd")
      : "";
    handleFilter(
      formattedEndDate,
      formattedStartDate,
      status,
      metalValue,
      e.target.value,
      page,
      size
    );
  };

  const updateCalender = (item: any) => {
    setRange([item.selection]);
    const formattedEndDate = range[0].endDate
      ? format(new Date(range[0].endDate), "yyyy-MM-dd")
      : "";
    const formattedStartDate = range[0].startDate
      ? format(new Date(range[0].startDate), "yyyy-MM-dd")
      : "";
    handleFilter(
      formattedEndDate,
      formattedStartDate,
      status,
      metalValue,
      transactionValue,
      page,
      size
    );
  };

  // console.log('range: ', range[0].endDate ? format(new Date(range[0].endDate), "yyyy-MM-dd") : '', range[0].startDate ? format(new Date(range[0].startDate), "yyyy-MM-dd") : '')

  const updatePage = (e: any) => {
    let moveTo = e.target.value;
    setPage(moveTo);
    range[0].endDate ? format(new Date(range[0].endDate), "yyyy-MM-dd") : "",
      range[0].startDate
        ? format(new Date(range[0].startDate), "yyyy-MM-dd")
        : "",
      status,
      metalValue,
      transactionValue,
      moveTo,
      size;
  };

  const nextPageHandler = () => {
    setPage(page + 1);
    range[0].endDate ? format(new Date(range[0].endDate), "yyyy-MM-dd") : "",
      range[0].startDate
        ? format(new Date(range[0].startDate), "yyyy-MM-dd")
        : "",
      status,
      metalValue,
      transactionValue,
      page + 1,
      size;
  };
  const prevPageHandler = () => {
    if (page > 1) {
      setPage(page - 1);
      range[0].endDate ? format(new Date(range[0].endDate), "yyyy-MM-dd") : "",
        range[0].startDate
          ? format(new Date(range[0].startDate), "yyyy-MM-dd")
          : "",
        status,
        metalValue,
        transactionValue,
        page - 1,
        size;
    }
  };

  return (
    <div className="w-full">
      <div className="mb-12">
        <Vault />
      </div>
      <div className="flex flex-row text-white items-center justify-between">
        <div>
          <p className="text-sm mb-1">Status</p>
          <select
            name="status"
            id="status"
            className="cursor-pointer text-white rounded bg-themeLight px-3 py-2 w-32 focus:outline-none"
            onChange={(e) => {
              handleStatusChange(e);
            }}
          >
            <option value="ALL" selected={true}>
              ALL
            </option>
            <option value="PENDING" className="cursor-pointer">
              Pending
            </option>
            <option value="CANCELLED" className="cursor-pointer">
              Cancel
            </option>
            <option value="SUCCESS" className="cursor-pointer">
              Success
            </option>
            <option value="FAILED" className="cursor-pointer">
              Failed
            </option>
          </select>
        </div>
        <div>
          <p className="text-sm mb-1">Metal</p>
          <select
            name="metal"
            id="metal"
            onChange={(e) => {
              handleMetalChange(e);
            }}
            className="cursor-pointer text-white rounded bg-themeLight px-3 py-2 w-32 focus:outline-none"
          >
            <option value="ALL" selected={true}>
              All
            </option>
            <option value="GOLD">GOLD</option>
            <option value="SILVER">SILVER</option>
          </select>
        </div>
        <div>
          <p className=" text-sm mb-1">Select Date</p>
          <div className="flex cursor-pointer text-white rounded bg-themeLight px-3 py-2 focus:outline-none">
            <input
              value={`${format(range[0].startDate, "MM/dd/yyyy")} to ${format(
                range[0].endDate,
                "MM/dd/yyyy"
              )}`}
              readOnly
              className="text-white cursor-pointer bg-transparent w-52"
              onClick={() => setOpen((open) => !open)}
            />
            <FaCalendarAlt
              className="calendar-icon-to cursor-pointer"
              onClick={() => setOpen((open) => !open)}
              size={26}
            />
          </div>
          <div ref={refOne}>
            {open && (
              <DateRangePicker
                onChange={(e) => {
                  updateCalender(e);
                }}
                editableDateInputs={true}
                moveRangeOnFirstSelection={false}
                ranges={range}
                months={1}
                direction="horizontal"
                className="calendarElement text-black"
              />
            )}
          </div>
        </div>

        <div>
          <p className=" text-sm mb-1">Transaction Type</p>
          <select
            name="status"
            id="status"
            onChange={(e) => {
              handleTransactionChange(e);
            }}
            className="cursor-pointer text-white rounded bg-themeLight px-3 py-2 w-32 focus:outline-none"
          >
            <option value="ALL" selected={true}>
              All
            </option>
            <option value="BUY">BUY</option>
            <option value="SELL">SELL</option>
            <option value="PRODUCT">COINS</option>
            <option value="GIFT">GIFT</option>
            <option value="REWARD">REWARD</option>
          </select>
        </div>
      </div>
      <Tab.Group defaultIndex={0}>
        <div className="grid grid-cols-5 gap-6 mt-8">
          <div className=" col-span-2 ">
            <Tab.List className="rounded-xl p-1 ">
              {dashboardData.map((item, key) => (
                <Tab
                  key={key}
                  onClick={() => handleClick(item)}
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2 text-sm font-medium leading-5 px-4 mb-2",
                      "focus:outline-none",
                      selected
                        ? "coins_background bg-themeLight  text-white shadow"
                        : "text-blue-100 hover:bg-white/[0.12] hover:text-white bg-themeLight"
                    )
                  }
                >
                  <div className="flex justify-between ">
                    <div className="flex items-center justify-between ">
                      {/* gold coin image */}
                      {item?.orderType === "PRODUCT" &&
                        item?.itemType === "GOLD" && (
                          <img
                            alt="gold-logo"
                            className="h-6"
                            src="https://cdn4.vectorstock.com/i/1000x1000/23/78/gold-coin-vector-2272378.jpg"
                          />
                        )}
                      {/* silver coin image */}
                      {item?.orderType === "PRODUCT" &&
                        item?.itemType === "SILVER" && (
                          <img
                            alt="gold-logo"
                            className="h-6"
                            src="https://cf-cdn.pcjeweller.com/public/uploads/catalog/product/custom/s/SCGL00050-1__654735669.jpg"
                          />
                        )}
                      {/* digital gold BUY image */}
                      {item?.orderType === "BUY" &&
                        item?.itemType === "GOLD" && (
                          <img
                            alt="gold-logo"
                            className="h-6"
                            src="https://www.blog1.trymintly.com/wp-content/uploads/2022/08/Digital-Gold-1.jpg"
                          />
                        )}
                      {/* digital gold SELL image */}
                      {item?.orderType === "SELL" &&
                        item?.itemType === "GOLD" && (
                          <img
                            alt="gold-logo"
                            className="h-6"
                            src="https://cdn4.vectorstock.com/i/1000x1000/23/78/gold-coin-vector-2272378.jpg"
                          />
                        )}
                      {/* digital silver BUY  image */}
                      {item?.orderType === "BUY" &&
                        item?.itemType === "SILVER" && (
                          <img
                            alt="gold-logo"
                            className="h-6"
                            src="https://imgnew.outlookindia.com/uploadimage/library/16_9/16_9_2/IMAGE_1674541554.webp"
                          />
                        )}
                      {/* digital silver SELL  image */}
                      {item?.orderType === "SELL" &&
                        item?.itemType === "SILVER" && (
                          <img
                            alt="gold-logo"
                            className="h-6"
                            src="https://imgnew.outlookindia.com/uploadimage/library/16_9/16_9_2/IMAGE_1674541554.webp"
                          />
                        )}
                      {/*reward digital silver  image */}
                      {item?.orderType === "REWARD" &&
                        item?.itemType === "SILVER" && (
                          <img
                            alt="gold-logo"
                            className="h-6"
                            src="https://img.freepik.com/premium-vector/achievement-trophy-flat-vector-illustration-banner_128772-725.jpg"
                          />
                        )}
                      {/*reward digital gold  image */}
                      {item?.orderType === "REWARD" &&
                        item?.itemType === "GOLD" && (
                          <img
                            alt="gold-logo"
                            className="h-6"
                            src="https://img.freepik.com/premium-vector/achievement-trophy-flat-vector-illustration-banner_128772-725.jpg"
                          />
                        )}
                      {/*GIFT  image */}
                      {item?.orderType === "GIFT" && (
                        <img
                          alt="gold-logo"
                          className="h-6"
                          src="https://cityfurnish.com/blog/wp-content/uploads/2023/07/wrapped-gift-box-with-shiny-gold-decoration-generated-by-ai-min-1200x900.jpg"
                        />
                      )}
                    </div>
                    <div className="flex flex-col justify-between items-center">
                      <div className="flex flex-col  items-start ">
                        <div className="flex flex-row">
                          {item?.orderType !== "REWARD" && (
                            <span className="">
                              {formatString(item?.itemType)}
                            </span>
                          )}
                          <span className="ml-1">
                            {item?.orderType === "PRODUCT" && (
                              <p>Coin Purchase</p>
                            )}
                            {item?.orderType === "REWARD" &&
                              "Promotional " + formatString(item?.itemType)}
                            {item?.orderType === "BUY" && <p>Purchase</p>}
                            {item?.orderType === "SELL" && <p>Sold</p>}
                            {item?.orderType === "GIFT" &&
                              item?.rewardsType === "SEND" && <p>Gift Sent</p>}
                            {item?.orderType === "GIFT" &&
                              item?.rewardsType === "RECEIVED" && (
                                <p>Gift Received</p>
                              )}
                          </span>
                        </div>
                        <div>{item?.gram} gm</div>
                        <div className="flex">
                          <span
                            className={`text-xs rounded-lg  py-1 mr-4 ${
                              item?.status === "SUCCESS" ||
                              item?.status === "COMPLETED"
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
                        </div>
                      </div>
                    </div>
                    <div>
                      {item?.totalAmount !== 0 && (
                        <p className="text-white font-extrabold text-xl">
                          ₹{item?.totalAmount}
                        </p>
                      )}
                      {/* <p className="text-white font-extrabold text-xl">₹{item?.totalAmount}</p> */}
                      <p>
                        {new Date(item?.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                      <p>
                        {new Date(item?.createdAt).toLocaleTimeString("en-IN", {
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <ArrowRightIcon className="h-5" />
                    </div>
                  </div>
                </Tab>
              ))}
            </Tab.List>
            <div className="flex justify-between items-center bg-themeLight p-4 rounded-xl text-white">
              <p>Current Page</p>
              <p className="bg-themeLight px-6 py-1 rounded text-black ">
                <select
                  className="cursor-pointer"
                  onChange={updatePage}
                  value={page}
                >
                  {itemList.map((number, index) => (
                    <option key={index} value={number}>
                      {number}
                    </option>
                  ))}
                </select>
              </p>
              <div className="flex">
                {page > 1 && (
                  <button
                    className="bg-themeLight px-2 py-1 rounded mr-2"
                    onClick={prevPageHandler}
                  >
                    Prev
                  </button>
                )}
                {page < totalPage && (
                  <button
                    className="bg-themeLight px-2 py-1 rounded"
                    onClick={(event: any) => {
                      event.preventDefault();
                      nextPageHandler();
                    }}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
          <Tab.Panels className="col-span-3">
            <div className="text-white">
              <OrderDetails orderDetails={activeTab} />
            </div>
          </Tab.Panels>
        </div>
        <div className="bg-slate-600 m-2 text-lg ">
          <Timer />
        </div>
      </Tab.Group>
    </div>
  );
};

export default OrdersTabs;
