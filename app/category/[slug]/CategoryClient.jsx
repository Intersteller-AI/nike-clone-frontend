"use client";

import React from "react";
import { ProductCard, Wrapper } from "@/app/components";

const maxSize = 3;

export default function CategoryClient({ category, products }) {

  return (
    <div className="w-full md:py-20 relative">
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <h1 className="text-[28px] md:texr-[34px] font-semibold leading-tight">
            {category?.name}
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {products?.map((product, index) => (
            <ProductCard key={`procard_${product?.id}`} data={product} />
          ))}
        </div>

        {/* PAGINATION BUTTONS START */}
        {/* {data?.meta.pagination.total > maxSize && (
          <div className="flex gap-3 items-center justify-center my-16 md:my-0">
            <button
              className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
              disabled={pageIndex === 1}
              onClick={() => setPageIndex(pageIndex - 1)}
            >
              Previous
            </button>

            <span className="font-bold">{`${pageIndex} of ${
              data && data?.meta.pagination.pageCount
            }`}</span>

            <button
              className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
              disabled={pageIndex === (data && data.meta.pagination.pageCount)}
              onClick={() => setPageIndex(pageIndex + 1)}
            >
              Next
            </button>
          </div>
        )} */}
        {/* PAGINATION BUTTONS END */}
        {/* {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">
            <Image
              src="/assets/loader2.svg"
              width={150}
              height={150}
              alt="loader"
            />
            <span className="text-2xl font-medium">Loading...</span>
          </div>
        )} */}
      </Wrapper>
    </div>
  );
}
