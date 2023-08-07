"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

const OrderItem = ({ data }) => {
  const productDetails = data?.product;
  const router = useRouter();

  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      {/* IMAGE START */}
      <Link href={`/product/${productDetails?.slug}`}>
        <div className="shrink-0 aspect-square w-[50px] md:w-[120px] hover:opacity-80">
          <Image
            src={productDetails?.thumbnail}
            alt={productDetails?.name}
            width={120}
            height={120}
          />
        </div>
      </Link>

      {/* IMAGE END */}

      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          {/* PRODUCT TITLE */}
          <Link href={`/product/${productDetails?.slug}`}>
            <div className="text-lg md:text-2xl font-semibold text-black/[0.8] hover:text-blue-500">
              {productDetails?.name}
            </div>
          </Link>
          {/* PRODUCT SUBTITLE */}
          <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
            {productDetails?.subtitle}
          </div>

          {/* PRODUCT PRICE */}
          <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
            MRP : &#8377;{data?.oneQuantityPrice * data?.quantity}
          </div>
        </div>

        {/* PRODUCT SUBTITLE */}
        <div className="text-md font-medium text-black/[0.5] hidden md:block max-w-[30vw] truncate">
          {productDetails?.subtitle}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
            <div className="flex items-center gap-1">
              <div className="font-semibold">Size:</div>
              <div className="hover:text-black">{data?.selectedSize}</div>
            </div>

            <div className="flex items-center gap-1">
              <div className="font-semibold">Quantity:</div>
              <div className="hover:text-black">{data?.quantity}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
