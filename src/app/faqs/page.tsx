"use client";
import { funcForDecrypt } from "@/components/helperFunctions";
import React, { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";

const Section = ({ sectionType, faqData }: any) => {
  const [open, setOpen] = useState(false);
  const renderSection = () => {
    return faqData.map((faq: any, index: any) => {
      if (faq.type === sectionType) {
        return (
          <Disclosure
            as="div"
            key={faq?.index}
            className="pt-4"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <>
              <dt>
                {open ? (
                  <Disclosure.Button className="faq-back flex w-full relative text-sm sm:text-base items-start justify-between text-left text-white rounded-t-2xl px-4 py-4">
                    <span className="text-sm leading-5">{faq.title}</span>
                    <span className="ml-6 flex h-7 items-center">
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
                    <span className="text-base font-semibold leading-7">
                      {faq.title}
                    </span>
                    <span className="ml-6 flex h-7 items-center">
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
              <Disclosure.Panel
                as="dd"
                className="text-base leading-7 text-gray-600 rounded-b-2xl px-4 py-2 bg-themeBlue"
              >
                <p dangerouslySetInnerHTML={{ __html: faq.description }} />
              </Disclosure.Panel>
            </>
          </Disclosure>
        );
      }
    });
  };

  return (
    <div>
      <h3 className="py-12 pb-6 text-gold01 text-center text-2xl">
        {sectionType}
      </h3>
      <dl className="space-y-2 divide-y divide-gray-900/10">
        {/* Assuming you have a way to determine whether the section is open or closed */}
        {renderSection()}
      </dl>
    </div>
  );
};

const Faq = () => {
  const [faqData, setFaqData] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${process.env.baseUrl}/public/faqs`, {
      headers: { "content-type": "application/json" },
    })
      .then((response) => response.json())
      .then(async (data) => {
        const decryptedData = await funcForDecrypt(data.payload);
        setFaqData(JSON.parse(decryptedData).data);
      })
      .catch((error) => console.error(error));
  }, []);

  const sectionTypes = ["GENERAL", "BUY", "SELL", "DELIVERY", "GIFT", "KYC"];

  return (
    <div>
      <div className="col-span-2 p-4  text-white">
        <p className="text-white text-3xl text-center">FAQs</p>
        {sectionTypes.map((sectionType) => (
          <Section
            key={sectionType}
            sectionType={sectionType}
            faqData={faqData}
          />
        ))}
      </div>
    </div>
  );
};

export default Faq;
