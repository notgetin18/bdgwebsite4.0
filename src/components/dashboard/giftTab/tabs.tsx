import React from "react";
import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
];

const GiftTab = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-4 p-4 rounded-lg bg-themeLight text-white grid grid-cols-2 gap-6">
          <div>
            <img
              alt="gold-logo"
              className="p-8"
              src="/images/gift_gold_web.png"
            />
          </div>
          <div></div>
        </div>
        <div className=" col-span-2 p-4 rounded-lg bg-themeLight text-white">
          <p className="text-white text-center">GIFT FAQ</p>
          <dl className="mt-10 space-y-2 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-white bg-themeLight px-4 py-2 rounded-lg">
                        <span className="text-sm font-semibold leading-5">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <PlusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel
                      as="dd"
                      className="mt-1 pr-12 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-700 to-blue-900"
                    >
                      <p className="text-base leading-7 text-white">
                        {faq.answer}
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
      {/* redeem part */}
    </div>
  );
};

export default GiftTab;
