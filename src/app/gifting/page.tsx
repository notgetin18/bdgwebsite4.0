'use client';
import { funcForDecrypt } from '@/components/helperFunctions';
import React, { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/20/solid';

const Section = ({ sectionType, accordionData }: any) => {
  const renderSection = (open: boolean) => {
    return accordionData.map((faq: any, index: any) => {
      if (faq.type === sectionType) {
        return (
          <Disclosure as="div" key={faq?.index} className="">
            <>
              <dt>
                <Disclosure.Button className="flex w-full items-start justify-between text-left text-white bg-themeLight px-4 py-2 rounded-lg">
                  <span className="text-sm font-semibold leading-5">
                    {faq?.title}
                  </span>
                  <span className="ml-6 flex h-7 items-center">
                    {open ? (
                      <PlusSmallIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    ) : (
                      <MinusSmallIcon
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
        {renderSection(true /* or pass the actual value based on your logic */)}
      </dl>
    </div>
  );
};

const Faq = () => {
  const [accordionData, setAccordionData] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${process.env.baseUrl}/public/faqs`, { headers: { 'content-type': "application/json" } })
      .then(response => response.json())
      .then(async (data) => {
        const decryptedData = await funcForDecrypt(data.payload);
        setAccordionData(JSON.parse(decryptedData).data);
      })
      .catch(error => console.error(error));
  }, []);

  const sectionTypes = ["GENERAL", "BUY", "SELL", "DELIVERY", "GIFT", "KYC"];

  return (
    <div>
      <div className="col-span-2 p-4 rounded-lg bg-themeLight text-white">
        <p className='text-white text-3xl'>FAQs</p>
        {sectionTypes.map((sectionType) => (
          <Section key={sectionType} sectionType={sectionType} accordionData={accordionData} />
        ))}
      </div>
    </div>
  );
};

export default Faq;
