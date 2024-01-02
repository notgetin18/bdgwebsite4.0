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
    img: "/piyush.jpg",
    name: "Abhinitya Kumar",
    pera: "Best app easy to use and nice interface",
  },
  {
    img: "/Jyoti.jpg",
    name: "Jaydeep Thorat",
    pera: "What a amazing app for gold purchase I really like it    ",
  },
  {
    img: "/Minakshi.jpg",
    name: "Krishna Gopal Deb    ",
    pera: "India top app bright digi gold 🥇. By selling instant payment Super is just a simple easy app.    ",
  },
  {
    img: "/Nitin Gupta.jpg",
    name: "Divu Senjaliya    ",
    pera: "Very nice app for buying gold. It's a very safe and easy to use nice app.",
  },
  {
    img: "/sumit.jpg",
    name: "Ayush Jain",
    pera: "This platform is best for investment in gold. We can buy and sell gold at any time. The app is the best.    ",
  },
];
import { Autoplay } from "swiper/modules";

export default function Review() {
  return (
    <>
      <div className="bg-themeBlue">
        <div className="mx-auto px-4 sm:px-6 lg:px-16 py-8">
          <h1 className="text-center text-gray-800 text-5xl extrabold mb-12">
            Users Who Trust Us
          </h1>
          <Swiper
            loop={true}
            breakpoints={{
              600: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 3,
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
                className="relative swiper-slide p-4 pt-10"
              >
                <div className="bg-theme rounded-2xl border-b-2 border-blue-400  relative">
                  <div className="bg-themeLight h-72 p-4">
                    <div className="flex justify-center">
                      <img
                        src={feature.img}
                        className="rounded-full absolute -top-10 h-24 w-24 border border-blue-300"
                        alt="insite"
                      />
                    </div>
                    <p className="mt-16 text-center text-white extrabold text-sm">
                      {feature.name}
                    </p>
                    <p className="mt-6 text-center text-white text-sm">
                      {feature.pera}
                    </p>
                    <img
                      alt="user"
                      className="h-8 absolute bottom-2 right-6"
                      src="/images/testimonial2.png"
                    ></img>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
