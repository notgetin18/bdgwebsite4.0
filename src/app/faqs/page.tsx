'use client';
import { funcForDecrypt } from '@/components/helperFunctions';
import React, { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';

const Section = ({ sectionType, faqData }: any) => {
  const [open, setOpen] = useState(false)
  const renderSection = () => {
    return faqData.map((faq: any, index: any) => {
      if (faq.type === sectionType) {
        return (
          <Disclosure as="div" key={faq?.index} className=""
            onClick={() => {
              setOpen(!open);
            }}
          >
            <>
              <dt>
                <Disclosure.Button className="flex w-full items-start justify-between text-left text-white bg-themeLight px-4 py-2 rounded-lg">
                  <span className="text-sm leading-5">
                    {faq.title}
                  </span>
                  <span className="ml-6 flex h-7 items-center">
                    {open ? (
                      <ArrowUpIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    ) : (
                      <ArrowDownIcon
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
      <h3 className="py-12 text-white text-center text-2xl">
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
    fetch(`${process.env.baseUrl}/public/faqs`, { headers: { 'content-type': "application/json" } })
      .then(response => response.json())
      .then(async (data) => {
        const decryptedData = await funcForDecrypt(data.payload);
        setFaqData(JSON.parse(decryptedData).data);
      })
      .catch(error => console.error(error));
  }, []);

  const sectionTypes = ["GENERAL", "BUY", "SELL", "DELIVERY", "GIFT", "KYC"];

  return (
    <div>
      <div className="col-span-2 p-4 rounded-lg bg-themeLight text-white">
        <p className='text-white text-3xl'>FAQs</p>
        {sectionTypes.map((sectionType) => (
          <Section key={sectionType} sectionType={sectionType} faqData={faqData} />
        ))}
      </div>
    </div>
  );
};

export default Faq;
