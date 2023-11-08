import React from "react";

const ImageContainer = () => {
  return (
    <div className="imageContainer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid sm:grid-cols-2 gap-6 sm:gap-20">
        <img
          alt="banner"
          className="rounded-lg"
          src="/images/investing_gold.jpg"
        />
        <img
          alt="banner"
          className="rounded-lg"
          src="/images/digital_physical_gold.jpg"
        />
      </div>
    </div>
  );
};

export default ImageContainer;
