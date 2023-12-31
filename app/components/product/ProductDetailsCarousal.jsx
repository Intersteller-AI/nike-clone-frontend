"use client";

import React from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const ProductDetailsCarousal = ({ images }) => {
  return (
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto">
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        showThumbs={true}
        thumbWidth={60}
        className="productCarousel"
      >
        {images?.map((img, index) => (
          <img src={img} alt={img} key={index} />
        ))}
      </Carousel>
    </div>
  );
};

export default ProductDetailsCarousal;
