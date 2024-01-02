"use client";
import { funcForDecrypt } from "@/components/helperFunctions";
import React, { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
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
      <h3 className="py-6 text-gold01 text-center text-2xl">{sectionType}</h3>
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
      <div className="mx-auto px-4 sm:px-6 lg:px-16 py-8 text-white">
        <p className="text-white text-5xl extrabold text-center">FAQs</p>

        <div className="grid grid-cols-4 lg:grid-cols-8 gap-x-2 gap-y-5 sm:gap-x-5 mt-6 place-items-center">
          <div className="w-full sm:w-auto">
            <a
              href=""
              className="rounded-md bg-themeLight block sm:inline-block px-2 sm:px-6 py-1 sm:py-2 text-center shadow-xl text-white hover:bg-slate-800"
            >
              <img src="/faq1.png" className="h-12 mx-auto" />
              <p className="text-xxs  sm:text-sm mt-1">BDG</p>
            </a>
          </div>
          <div className="w-full sm:w-auto">
            <a
              href=""
              className="rounded-md bg-themeLight block sm:inline-block px-2 sm:px-6 py-1 sm:py-2 text-center shadow-xl text-white hover:bg-slate-800"
            >
              <img src="/faq2.png" className="h-12 mx-auto" />
              <p className="text-xxs  sm:text-sm mt-1">BUY</p>
            </a>
          </div>
          <div className="w-full sm:w-auto">
            <a
              href=""
              className="rounded-md bg-themeLight block sm:inline-block px-2 sm:px-6 py-1 sm:py-2 text-center shadow-xl text-white hover:bg-slate-800"
            >
              <img src="/faq3.png" className="h-12 mx-auto" />
              <p className="text-xxs  sm:text-sm mt-1">SELL</p>
            </a>
          </div>
          <div className="w-full sm:w-auto">
            <a
              href=""
              className="rounded-md bg-themeLight block sm:inline-block px-2 sm:px-6 py-1 sm:py-2 text-center shadow-xl text-white hover:bg-slate-800"
            >
              <img src="/faq4.png" className="h-12 mx-auto" />
              <p className="text-xxs  sm:text-sm mt-1">DELIVERY</p>
            </a>
          </div>
          <div className="w-full sm:w-auto">
            <a
              href=""
              className="rounded-md bg-themeLight block sm:inline-block px-2 sm:px-6 py-1 sm:py-2 text-center shadow-xl text-white hover:bg-slate-800"
            >
              <img src="/faq5.png" className="h-12 mx-auto" />
              <p className="text-xxs  sm:text-sm mt-1">GIFT</p>
            </a>
          </div>
          <div className="w-full sm:w-auto">
            <a
              href=""
              className="rounded-md bg-themeLight block sm:inline-block px-2 sm:px-6 py-1 sm:py-2 text-center shadow-xl text-white hover:bg-slate-800"
            >
              <img src="/faq6.png" className="h-12 mx-auto" />
              <p className="text-xxs  sm:text-sm mt-1">RNE</p>
            </a>
          </div>
          <div className="w-full sm:w-auto">
            <a
              href=""
              className="rounded-md bg-themeLight block sm:inline-block px-2 sm:px-6 py-1 sm:py-2 text-center shadow-xl text-white hover:bg-slate-800"
            >
              <img src="/faq7.png" className="h-12 mx-auto" />
              <p className="text-xxs  sm:text-sm mt-1">KYC</p>
            </a>
          </div>
          <div className="w-full sm:w-auto">
            <a
              href=""
              className="rounded-md bg-themeLight block sm:inline-block px-2 sm:px-6 py-1 sm:py-2 text-center shadow-xl text-white hover:bg-slate-800"
            >
              <img src="/faq8.png" className="h-12 mx-auto" />
              <p className="text-xxs  sm:text-sm mt-1">DIGITAL GOLD</p>
            </a>
          </div>
        </div>

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
