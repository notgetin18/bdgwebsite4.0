import { AesDecrypt } from "@/components/helperFunctions";
import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { memo, useEffect, useState } from "react";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";

const GiftFaq: React.FC = () => {
  const [accordionData, setAccordionData] = useState<any[]>([]);
  useEffect(() => {
    fetch(`${process.env.baseUrl}/public/faqs?type=GIFT`, {
      headers: { "content-type": "application/json" },
    })
      .then((response) => response.json())
      .then(async (data) => {
        const decryptedData = AesDecrypt(data.payload);
        setAccordionData(JSON.parse(decryptedData).data);
      })
      .catch((error) => console.error(error));
  }, []);
  // console.log('accordionData', accordionData)
  console.log("i am from GiftFaq");

  return (
    <div>
      <div className=" col-span-2 p-4 rounded-lg bg-themeLight text-white">
        <p className="text-white text-center text-xl">GIFT FAQ</p>
        <dl className="mt-10 space-y-2 divide-y divide-gray-900/10">
          {accordionData.map((faq, index) => {
            if (index < 5) {
              return (
                <Disclosure as="div" key={faq.slug} className="">
                  {({ open }) => (
                    <>
                      <dt>
                        <Disclosure.Button className="flex w-full items-start justify-between text-left text-white bg-themeLight px-4 py-2 rounded-lg">
                          <span className="text-sm font-semibold leading-5">
                            {faq?.title}
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
                      </dt>
                      <Disclosure.Panel
                        as="dd"
                        className="mt-1 pr-12 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-700 to-blue-900"
                      >
                        <p
                          dangerouslySetInnerHTML={{ __html: faq.description }}
                        />
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              );
            }
          })}
          <div className="flex justify-center items-center">
            <Link href="/faqs">
              <div className="mt-4 border-2 border-yellow-400 rounded px-12 py-2 cursor-pointer text-lg font-semibold">
                View All
              </div>
            </Link>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default memo(GiftFaq);
