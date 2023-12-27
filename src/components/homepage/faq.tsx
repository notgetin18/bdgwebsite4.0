"use client";
import Link from "next/link";
import React from "react";
import { Disclosure } from "@headlessui/react";
import {
  MinusSmallIcon,
  PlusSmallIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/24/outline";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";

const faqs = [
  {
    question: "What is Bright DiGi Gold?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "What is digital gold?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "Is it safe to use the Bright DiGi Gold?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
];
const Faq = () => {
  return (
    <div className="bg-theme relative">
      <div className="mx-auto px-4 sm:px-6 lg:px-16 py-12 ">
        <div className="flex justify-between ">
          <p></p>
          <h1 className="text-center text-yellow-500 text-3xl extrabold">
            FAQ's
          </h1>
          <Link
            href="/faqs"
            className="bg-themeLight px-3 py-1 text-md text-white rounded border border-gray-500"
          >
            View All
          </Link>
        </div>
        <div>
          <dl className="mt-8 space-y-1 divide-y divide-gray-900/10  z-50">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6 ">
                {({ open }) => (
                  <>
                    <dt>
                      {open ? (
                        <Disclosure.Button className="faq-back flex w-full relative text-sm sm:text-base items-start justify-between text-left text-white rounded-t-2xl px-4 py-4">
                          <span className="text-base font-semibold leading-7 ">
                            {faq.question}
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
                            {faq.question}
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
                      <p className="text-base leading-7 text-gray-600 rounded-b-2xl px-4 py-2 bg-themeBlue">
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
      <img
        src="/BDGwhite.png"
        className="absolute top-28 left-0 opacity-30 -z-10 sm:z-10"
      />
    </div>
  );
};

export default Faq;
