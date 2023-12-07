"use client";
import { classNames } from "@/components";
import Timer from "@/components/globalTimer";
import { Tab } from "@headlessui/react";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";

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
  return (
    <div className="w-full">
      <Tab.Group defaultIndex={1}>
        <div className="grid grid-cols-5 gap-6">
          <div className=" col-span-2">
            <Tab.List className="rounded-xl p-1">
              {data.map((category) => (
                <Tab
                  //   key={category}
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2 text-sm font-medium leading-5 px-4 mb-2",
                      "focus:outline-none",
                      selected
                        ? "bg-themeLight  text-white shadow"
                        : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                    )
                  }
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <img
                        alt="gold-logo"
                        className="h-6 mr-6"
                        src="/images/goldBars.png"
                      />
                      {category.name}
                    </div>
                    <div className="flex items-center">
                      <span className="bg-green-500 text-white text-xs rounded-lg px-3 py-1 mr-4">
                        Completed
                      </span>
                      <ArrowRightIcon className="h-5" />
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
