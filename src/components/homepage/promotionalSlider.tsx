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
    img: "https://d2fbpyhlah02sy.cloudfront.net/banner/equalgramsofsilver.jpg",
  },
  {
    img: "https://d2fbpyhlah02sy.cloudfront.net/banner/EXTRAGOLDBANNER.jpg",
  },
];
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Promotional() {
  return (
    <>
      <div className="bg-yellow-50">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8">
          <Swiper
            slidesPerView={2}
            spaceBetween={30}
            // centeredSlides={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 30,
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
                <img
                  src={feature.img}
                  className="my-2 w-full rounded-lg"
                  alt="insite"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
