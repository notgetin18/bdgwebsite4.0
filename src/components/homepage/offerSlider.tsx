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
    img: "/lottie/offer1.jpg",
  },
  {
    img: "/lottie/offer2.jpg",
  },
];
import { Autoplay } from "swiper/modules";

export default function OfferSlider() {
  return (
    <>
      <div className="relative">
        {/* <img
          alt="banner"
          src="/images/trust_secure.svg"
          className=" absolute right-0 h-64 overflow-hidden"
        /> */}
        <div className="">
          <div className="mx-auto">
            <div className="">
              <Swiper
                // slidesPerView={5}
                // spaceBetween={10}
                loop={true}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  1024: {
                    slidesPerView: 1,
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
                    className="relative swiper-slide"
                  >
                    <div className=" client_grad">
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
            {/* <div className="sm:grid grid-cols-2 gap-12 hidden place-items-center">
              <img
                src="/lottie/offer1.jpg"
                className=" mx-auto rounded-lg"
                alt="insite"
              />
              <img
                src="/lottie/offer2.jpg"
                className=" mx-auto rounded-lg"
                alt="insite"
              />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
