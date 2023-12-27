"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "./styles.css";

const features = [
  {
    img: "/client1.png",
  },
  {
    img: "/client2.png",
  },
  {
    img: "/client3.png",
  },
  {
    img: "/client4.png",
  },
  {
    img: "/client5.png",
  },
  {
    img: "/client6.png",
  },
  {
    img: "/client7.png",
  },
  {
    img: "/client8.png",
  },
  {
    img: "/client9.png",
  },
];
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function ClientSlider() {
  return (
    <>
      <div className="bg-white relative">
        {/* <img
          alt="banner"
          src="/images/trust_secure.svg"
          className=" absolute right-0 h-64 overflow-hidden"
        /> */}
        <div className="">
          <div className="mx-auto px-4 sm:px-6 lg:px-16 py-8">
            <h1 className="text-center extrabold  text-2xl text-gray-700 mb-8">
              We Are Trusted By
            </h1>
            <div className=" sm:hidden">
              <Swiper
                // slidesPerView={5}
                // spaceBetween={10}
                loop={true}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 10,
                  },
                }}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className="mySwiper"
              >
                {features.map((feature, index) => (
                  <SwiperSlide
                    key={`${index}-Slider`}
                    className="relative swiper-slide p-4"
                  >
                    <div className="rounded-lg client_grad">
                      <img
                        src={feature.img}
                        className=" mx-auto"
                        alt="insite"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="sm:grid grid-cols-5 gap-12 hidden place-items-center">
              <img src="/client1.png" className="my-2 mx-auto" alt="insite" />
              <img src="/client2.png" className="my-2 mx-auto" alt="insite" />
              <img src="/client3.png" className="my-2 mx-auto" alt="insite" />
              <img src="/client4.png" className="my-2  mx-auto" alt="insite" />
              <img src="/client5.png" className="my-2 mx-auto" alt="insite" />
            </div>
            <div className="sm:grid grid-cols-4 gap-16 hidden mt-2 place-items-center">
              <img
                src="/client6.png"
                className="my-2 px-8 mx-auto"
                alt="insite"
              />
              <img
                src="/client7.png"
                className="my-2 px-2 mx-auto"
                alt="insite"
              />
              <img
                src="/client8.png"
                className="my-2 px-8 mx-auto"
                alt="insite"
              />
              <img
                src="/client9.png"
                className="my-2 px-8 mx-auto"
                alt="insite"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
