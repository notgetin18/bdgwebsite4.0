"use client";
import { classNames } from "@/components";
import Timer from "@/components/globalTimer";
import {
  AesEncrypt,
  formatString,
  funcForDecrypt,
} from "@/components/helperFunctions";
import { Tab } from "@headlessui/react";
import axios from "axios";
import { addDays, format, } from "date-fns";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import OrderDetails from "./orderDetails";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { FaCalendarAlt } from "react-icons/fa";
import Vault from "./vault";
import { faqs } from "@/constants";
import { Disclosure } from "@headlessui/react";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";
import Link from "next/link";
import { ArrowDownIcon } from "@heroicons/react/20/solid";

const OrdersTabs = () => {
  const [userDetails, setUserDetails] = useState("");
  const [status, setStatus] = useState("ALL");
  const [isOpen, setIsOpen] = useState(false);
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
      startDate: new Date(`${2023}/${1}/${1}`),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [open, setOpen] = useState(false);
  const refOne = useRef<HTMLDivElement>(null);

  const OpenAccord = (item: any) => {
    setIsOpen(!isOpen);
  };
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

  // console.log("userDetails", userDetails);
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
  console.log('dashboardData =========> ', dashboardData)
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

  const updatePage = (e: any) => {
    let moveTo = e.target.value;
    setPage(moveTo);
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
      moveTo,
      size
    );
  };

  const nextPageHandler = () => {
    setPage(page + 1);

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
      page + 1,
      size
    );
  };

  const prevPageHandler = () => {
    if (page > 1) {
      setPage(page - 1);
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
        page - 1,
        size
      );
    }
  };

  return (
    <div className="w-full">
      <div className="mb-12">
        <Vault />
      </div>
      <div className="md:flex flex-row text-white items-center justify-between">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm mb-1">Status</p>
            <select
              name="status"
              id="status"
              className="cursor-pointer text-white rounded bg-themeLight px-3 py-2 w-full md:w-32 focus:outline-none"
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
              className="cursor-pointer text-white rounded bg-themeLight px-3 py-2 w-full md:w-32 focus:outline-none"
            >
              <option value="ALL" selected={true}>
                All
              </option>
              <option value="GOLD">GOLD</option>
              <option value="SILVER">SILVER</option>
            </select>
          </div>
        </div>
        <div>
          <p className=" text-sm mb-1">Select Date</p>
          <div className=" cursor-pointer text-white rounded bg-themeLight px-3 py-2 focus:outline-none">
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
              className="calendar-icon-to cursor-pointer float-right"
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
            className="cursor-pointer text-white rounded bg-themeLight px-3 py-2 w-full md:w-32 focus:outline-none"
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
          <div className="col-span-5 md:col-span-2 ">
            {dashboardData.map((item, key) => (
              <Disclosure as="div" key={key} className="pt-6 ">
                {({ open }) => (
                  <>
                    <dt>
                      {open ? (
                        <Disclosure.Button className="faq-back flex w-full relative text-sm sm:text-base items-start justify-between text-left text-white rounded-t-2xl px-4 py-4">
                          <span className="text-base font-semibold leading-7 ">
                            {/* {faq.question} */}
                            <div className="grid grid-cols-6 gap-1">
                              <div className="col-span-3 grid grid-cols-3 gap-3 items-center">
                                <div className="flex items-center justify-between col-span-1">
                                  {/* gold coin image */}
                                  {item?.orderType === "PRODUCT" &&
                                    item?.itemType === "GOLD" && (
                                      <img
                                        alt="gold-logo"
                                        className="h-6"
                                        src="/coin1.png"
                                      />
                                    )}
                                  {/* silver coin image */}
                                  {item?.orderType === "PRODUCT" &&
                                    item?.itemType === "SILVER" && (
                                      <img
                                        alt="gold-logo"
                                        className="h-6"
                                        src="/Rectangle.png"
                                      />
                                    )}
                                  {/* digital gold BUY image */}
                                  {item?.orderType === "BUY" &&
                                    item?.itemType === "GOLD" && (
                                      <img
                                        alt="gold-logo"
                                        className="h-6"
                                        src="/Goldbarbanner.png"
                                      />
                                    )}
                                  {/* digital gold SELL image */}
                                  {item?.orderType === "SELL" &&
                                    item?.itemType === "GOLD" && (
                                      <img
                                        alt="gold-logo"
                                        className="h-6"
                                        src="/note.png"
                                      />
                                    )}
                                  {/* digital silver BUY  image */}
                                  {item?.orderType === "BUY" &&
                                    item?.itemType === "SILVER" && (
                                      <img
                                        alt="gold-logo"
                                        className="h-6"
                                        src="/Silverbar.png"
                                      />
                                    )}
                                  {/* digital silver SELL  image */}
                                  {item?.orderType === "SELL" &&
                                    item?.itemType === "SILVER" && (
                                      <img
                                        alt="gold-logo"
                                        className="h-6"
                                        src="/note.png"
                                      />
                                    )}
                                  {/*reward digital silver  image */}
                                  {item?.orderType === "REWARD" &&
                                    item?.itemType === "SILVER" && (
                                      <img
                                        alt="gold-logo"
                                        className="h-6"
                                        src="/Silverbar.png"
                                      />
                                    )}
                                  {/*reward digital gold  image */}
                                  {item?.orderType === "REWARD" &&
                                    item?.itemType === "GOLD" && (
                                      <img
                                        alt="gold-logo"
                                        className="h-6"
                                        src="/Goldbarbanner.png"
                                      />
                                    )}
                                  {/*GIFT  image */}
                                  {item?.orderType === "GIFT" && (
                                    <img
                                      alt="gold-logo"
                                      className="h-6"
                                      src="/Goldbarbanner.png"
                                    />
                                  )}
                                </div>
                                <div className="flex flex-col justify-start items-center col-span-2">
                                  <div className="flex flex-row">
                                    {item?.orderType !== "REWARD" && (
                                      <span className="">
                                        {formatString(item?.itemType)}
                                      </span>
                                    )}
                                    <span className="">
                                      {item?.orderType === "PRODUCT" && (
                                        <p>Coin Purchase</p>
                                      )}
                                      {item?.orderType === "REWARD" &&
                                        "Promotional " + formatString(item?.itemType)}
                                      {item?.orderType === "BUY" && (
                                        <p className="ml-1">Purchase</p>
                                      )}
                                      {item?.orderType === "SELL" && <p className="ml-1">Sold</p>}
                                      {item?.orderType === "GIFT" &&
                                        item?.rewardsType === "SEND" && <p>Gift Sent</p>}
                                      {item?.orderType === "GIFT" &&
                                        item?.rewardsType === "RECEIVED" && (
                                          <p className="ml-1">Gift Received</p>
                                        )}
                                    </span>
                                  </div>
                                  <div>{item?.gram} gm</div>
                                  <div className="flex">
                                    <span
                                      className={`text-xs rounded-lg  py-1  ${item?.status === "SUCCESS" ||
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
                              <div className="col-span-3 grid place-items-end">
                                <div>
                                  {item?.totalAmount !== 0 && (
                                    <p className="text-white font-extrabold text-base sm:text-xl">
                                      ₹{item?.totalAmount}
                                    </p>
                                  )}

                                  {/* <p className="text-white font-extrabold text-xl">₹{item?.totalAmount}</p> */}
                                  <p className="text-xs sm:text-base">
                                    {new Date(item?.createdAt).toLocaleDateString(
                                      "en-IN",
                                      {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                      }
                                    )}
                                  </p>
                                  <p className="text-xs sm:text-base">
                                    {new Date(item?.createdAt).toLocaleTimeString(
                                      "en-IN",
                                      {
                                        hour: "numeric",
                                        minute: "numeric",
                                      }
                                    )}
                                  </p>
                                </div>
                              </div>
                              {/* <div className="flex justify-end items-center col-span-1">
                      <ArrowRightIcon className="h-5" />
                    </div> */}
                            </div>
                          </span>
                          <span className="ml-6 flex h-7 items-center ">
                            {open ? (
                              <FaChevronCircleUp
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            ) : (
                              <FaChevronCircleDown
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      ) : (
                        <Disclosure.Button className="faq-back flex w-full relative text-sm sm:text-base items-start justify-between text-left text-white rounded-2xl px-4 py-4">
                          <span className="text-base font-semibold leading-7 ">
                            {/* {faq.question} */}
                            <div className="grid grid-cols-6 gap-1">
                              <div className="col-span-3 grid grid-cols-3 gap-3 items-center">
                                <div className="flex items-center justify-between col-span-1">
                                  {/* gold coin image */}
                                  {item?.orderType === "PRODUCT" &&
                                    item?.itemType === "GOLD" && (
                                      <img
                                        alt="gold-logo"
                                        className="h-6"
                                        src="/coin1.png"
                                      />
                                    )}
                                  {/* silver coin image */}
                                  {item?.orderType === "PRODUCT" &&
                                    item?.itemType === "SILVER" && (
                                      <img
                                        alt="gold-logo"
                                        className="h-6"
                                        src="/Rectangle.png"
                                      />
                                    )}
                                  {/* digital gold BUY image */}
                                  {item?.orderType === "BUY" &&
                                    item?.itemType === "GOLD" && (
                                      <img
                                        alt="gold-logo"
                                        className="h-6"
                                        src="/Goldbarbanner.png"
                                      />
                                    )}
                                  {/* digital gold SELL image */}
                                  {item?.orderType === "SELL" &&
                                    item?.itemType === "GOLD" && (
                                      <img
                                        alt="gold-logo"
                                        className="h-6"
                                        src="/note.png"
                                      />
                                    )}
                                  {/* digital silver BUY  image */}
                                  {item?.orderType === "BUY" &&
                                    item?.itemType === "SILVER" && (
                                      <img
                                        alt="gold-logo"
                                        className="h-6"
                                        src="/Silverbar.png"
                                      />
                                    )}
                                  {/* digital silver SELL  image */}
                                  {item?.orderType === "SELL" &&
                                    item?.itemType === "SILVER" && (
                                      <img
                                        alt="gold-logo"
                                        className="h-6"
                                        src="/note.png"
                                      />
                                    )}
                                  {/*reward digital silver  image */}
                                  {item?.orderType === "REWARD" &&
                                    item?.itemType === "SILVER" && (
                                      <img
                                        alt="gold-logo"
                                        className="h-6"
                                        src="/Silverbar.png"
                                      />
                                    )}
                                  {/*reward digital gold  image */}
                                  {item?.orderType === "REWARD" &&
                                    item?.itemType === "GOLD" && (
                                      <img
                                        alt="gold-logo"
                                        className="h-6"
                                        src="/Goldbarbanner.png"
                                      />
                                    )}
                                  {/*GIFT  image */}
                                  {item?.orderType === "GIFT" && (
                                    <img
                                      alt="gold-logo"
                                      className="h-6"
                                      src="/Goldbarbanner.png"
                                    />
                                  )}
                                </div>
                                <div className="flex flex-col justify-start items-center col-span-2">
                                  <div className="flex flex-row">
                                    {item?.orderType !== "REWARD" && (
                                      <span className="">
                                        {formatString(item?.itemType)}
                                      </span>
                                    )}
                                    <span className="">
                                      {item?.orderType === "PRODUCT" && (
                                        <p>Coin Purchase</p>
                                      )}
                                      {item?.orderType === "REWARD" &&
                                        "Promotional " + formatString(item?.itemType)}
                                      {item?.orderType === "BUY" && (
                                        <p className="ml-1">Purchase</p>
                                      )}
                                      {item?.orderType === "SELL" && <p className="ml-1">Sold</p>}
                                      {item?.orderType === "GIFT" &&
                                        item?.rewardsType === "SEND" && <p>Gift Sent</p>}
                                      {item?.orderType === "GIFT" &&
                                        item?.rewardsType === "RECEIVED" && (
                                          <p className="ml-1">Gift Received</p>
                                        )}
                                    </span>
                                  </div>
                                  <div>{item?.gram} gm</div>
                                  <div className="flex">
                                    <span
                                      className={`text-xs rounded-lg  py-1  ${item?.status === "SUCCESS" ||
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
                              <div className="col-span-3 grid place-items-end">
                                <div>
                                  {item?.totalAmount !== 0 && (
                                    <p className="text-white font-extrabold text-base sm:text-xl">
                                      ₹{item?.totalAmount}
                                    </p>
                                  )}

                                  {/* <p className="text-white font-extrabold text-xl">₹{item?.totalAmount}</p> */}
                                  <p className="text-xs sm:text-base">
                                    {new Date(item?.createdAt).toLocaleDateString(
                                      "en-IN",
                                      {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                      }
                                    )}
                                  </p>
                                  <p className="text-xs sm:text-base">
                                    {new Date(item?.createdAt).toLocaleTimeString(
                                      "en-IN",
                                      {
                                        hour: "numeric",
                                        minute: "numeric",
                                      }
                                    )}
                                  </p>
                                </div>
                              </div>
                              {/* <div className="flex justify-end items-center col-span-1">
                      <ArrowRightIcon className="h-5" />
                    </div> */}
                            </div>
                          </span>
                          <span className="ml-6 flex h-7 items-center ">
                            {open ? (
                              <FaChevronCircleUp
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            ) : (
                              <FaChevronCircleDown
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      )}
                    </dt>
                    <Disclosure.Panel as="dd" className="">
                      <p className="text-base leading-7 text-white rounded-b-2xl px-4 py-2 bg-themeBlue">
                        {/* {answer} */}
                        <div className="coins_background rounded-lg shadow-black shadow-xl p-3 mb-3">
                          <p className="text-xl">Transaction Status</p>
                          <div className="grid grid-cols-3  justify-between pb-3">
                            <div className="flex items-center col-span-2">
                              <div>
                                {item?.status === "SUCCESS" ||
                                  item?.status === "COMPLETED" ? (
                                  <img src="/check.png" alt="" className="" width={40} />
                                ) : item?.status === "PENDING" ? (
                                  <img src="/question-mark.png" alt="" className="" width={30} />
                                ) : (
                                  <img src="/close.png" alt="" className="" width={40} />
                                )}
                              </div>
                              <p className="px-2 col-span-1 text-sm sm:text-base">
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
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm sm:text-base">
                                {new Date(item.createdAt).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )}
                              </p>
                              <p className="text-sm sm:text-base">
                                {new Date(item.createdAt).toLocaleTimeString(
                                  "en-IN",
                                  {
                                    hour: "numeric",
                                    minute: "numeric",
                                  }
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="">
                            <div className="grid grid-cols-3  justify-between pb-3">
                              <div className="flex items-center col-span-2">
                                <div className="">
                                  {item?.status === "SUCCESS" ||
                                    item?.status === "COMPLETED" ? (
                                    <img src="/check.png" alt="" className="" width={40} />
                                  ) : item?.status === "PENDING" ? (
                                    <img
                                      src="/question-mark.png"
                                      alt=""
                                      className=""
                                      width={30}
                                    />
                                  ) : (
                                    <img src="" alt="/close.png" className="" width={40} />
                                  )}
                                </div>
                                <p className="px-2 col-span-1 text-sm sm:text-base">
                                  {item?.orderType === "PRODUCT" &&
                                    formatString(item?.itemType) +
                                    " Coin Purchase"}
                                  {item?.orderType === "REWARD" &&
                                    "Promotional " +
                                    formatString(item?.itemType) +
                                    " Received"}
                                  {item?.orderType === "BUY" &&
                                    formatString(item?.itemType) + " Purchase"}
                                  {item?.orderType === "SELL" && <p>Sold</p>}
                                  {item?.orderType === "GIFT" &&
                                    item?.rewardsType === "SEND" &&
                                    formatString(`${item?.itemType}`) +
                                    " Gift Sent"}
                                  {item?.orderType === "GIFT" &&
                                    item?.rewardsType === "RECEIVED" &&
                                    formatString(`${item?.itemType}`) +
                                    " Gift Received"}
                                </p>
                              </div>
                              <div className=" text-right">
                                <p className="text-sm sm:text-base">
                                  {new Date(item.updatedAt).toLocaleDateString(
                                    "en-IN",
                                    {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    }
                                  )}
                                </p>
                                <p className="text-sm sm:text-base">
                                  {new Date(item.updatedAt).toLocaleTimeString(
                                    "en-IN",
                                    {
                                      hour: "numeric",
                                      minute: "numeric",
                                    }
                                  )}
                                </p>
                              </div>
                            </div>

                            <div className="flex justify-between ">
                              <div>Order Id</div>
                              <p>{item?.order_id}</p>
                            </div>
                          </div>
                          <div className="flex justify-center">
                            {item?.status == "SUCCESS" &&
                              item?.challanUrl && (
                                <Link
                                  target="_blank"
                                  className=""
                                  href={item?.challanUrl}
                                >
                                  <div className="text-center m-2 pb-3 flex justify-around">
                                    <button className="border-2 border-yellow-500 py-2 px-4 rounded-2xl mt-4 flex text-yellow-400">
                                      Download Challan
                                      <ArrowDownIcon className="h-5 ml-2 text-yellow-300" />
                                    </button>
                                  </div>
                                </Link>
                              )}
                            {item?.status == "SUCCESS" &&
                              item?.invoiceUrl && (
                                <Link
                                  target="_blank"
                                  className=""
                                  href={item?.invoiceUrl}
                                >
                                  <div className="text-center m-2 pb-3 flex justify-around">
                                    <button className="border-2 border-yellow-500 py-2 px-4 rounded-2xl mt-4 flex text-yellow-400">
                                      Download Invoice
                                      <ArrowDownIcon className="h-5 ml-2 text-yellow-300" />
                                    </button>
                                  </div>
                                </Link>
                              )}
                          </div>
                        </div>
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
            <div className="grid grid-cols-3 justify-between items-center bg-themeLight p-4 rounded-xl text-white">
              <p>Current Page</p>
              <div className="flex justify-end sm:justify-center col-span-2 sm:col-span-1">
                <select
                  className="cursor-pointer text-white focus:outline-none bg-themeLight px-4 py-1 rounded"
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
              <div className="flex justify-center sm:justify-end col-span-3 sm:col-span-1 mt-2 sm:mt-0">
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
          {/* <Tab.Panels className="col-span-5 md:col-span-3">
            <div className="text-white">
              <OrderDetails orderDetails={activeTab} />
            </div>
          </Tab.Panels> */}
        </div>
        <div className=" m-2 text-lg inline-block float-right">
          <Timer />
        </div>
      </Tab.Group>
    </div>
  );
};

export default OrdersTabs;
