"use client";
import { classNames } from "@/components";
import Timer from "@/components/globalTimer";
import { Tab } from "@headlessui/react";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

const data = [
  { id: 1, name: "DIGITAL GOLD ₹(10)" },
  { id: 2, name: "DIGITAL GOLD ₹(10)" },
  { id: 3, name: "DIGITAL GOLD ₹(10)" },
  { id: 4, name: "DIGITAL GOLD ₹(10)" },
  { id: 5, name: "DIGITAL GOLD ₹(10)" },
];
const orders = [
  { email: "lindsay.walton@example.com", role: "Member" },
  { email: "lindsay.walton@example.com", role: "Member" },
  { email: "lindsay.walton@example.com", role: "Member" },
  { email: "lindsay.walton@example.com", role: "Member" },
  { email: "lindsay.walton@example.com", role: "Member" },
  // More people...
];
const OrdersTabs = () => {
  return (
    <div className="w-full">
      <Tab.Group defaultIndex={1}>
        <div className="grid grid-cols-5 gap-6">
          <Tab.List className=" col-span-2 rounded-xl p-1">
            {data.map((category) => (
              <Tab
                //   key={category}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-1 text-sm font-medium leading-5 px-4 mb-2",
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
                      className="h-8 mr-6"
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
          <Tab.Panels className=" col-span-3">
            {data.map((category) => (
              <Tab.Panel
                className={classNames(
                  "rounded-lg bg-themeLight",
                  "focus:outline-none"
                )}
              >
                <table className="min-w-full">
                  <tbody className="divide-y divide-blue-950">
                    {orders.map((order) => (
                      <tr key={order.email}>
                        <td className="hidden px-3 py-3 text-sm text-gray-500 sm:table-cell">
                          {order.email}
                        </td>
                        <td className="px-3 py-3 text-sm text-white">
                          {order.role}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </div>
        <div className="bg-blue-400"><Timer /></div>
      </Tab.Group>
    </div>
  );
};

export default OrdersTabs;
