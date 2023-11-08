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
    img: "https://d2fbpyhlah02sy.cloudfront.net/banner/phonepay.svg",
  },
  {
    img: "https://d2fbpyhlah02sy.cloudfront.net/banner/Ecom-express_logo.svg",
  },
  {
    img: "https://d2fbpyhlah02sy.cloudfront.net/banner/brinks.svg",
  },
  {
    img: "https://d2fbpyhlah02sy.cloudfront.net/banner/brightGold.svg",
  },
  {
    img: "https://d2fbpyhlah02sy.cloudfront.net/banner/nabl.svg",
  },
  {
    img: "https://d2fbpyhlah02sy.cloudfront.net/banner/startup registration_bg.png",
  },
  //   {
  //     img: "https://d2fbpyhlah02sy.cloudfront.net/banner/razorpayx.svg",
  //   },
];
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function ClientSlider() {
  return (
    <>
      <div className="bg-theme relative">
        <img
          alt="banner"
          src="/images/trust_secure.svg"
          className=" absolute right-0 h-64 overflow-hidden"
        />
        <div className="bg-themeLight">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8">
            <h1 className="text-center extrabold  text-2xl text-white mb-8">
              Trusted And Secured By
            </h1>
            <Swiper
              slidesPerView={5}
              spaceBetween={10}
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
                  <div className="px-10 py-6 rounded-lg client_grad flex justify-center">
                    <img src={feature.img} className="h-10" alt="insite" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}
