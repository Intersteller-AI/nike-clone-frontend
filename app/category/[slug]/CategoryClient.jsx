"use client";

import React from "react";
import { ProductCard, Wrapper } from "@/app/components";

const maxSize = 3;

export default function CategoryClient({ category, products }) {

  return (
    <div className="w-full min-h-screen md:py-20 relative">
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <h1 className="text-[28px] md:texr-[34px] font-semibold leading-tight capitalize">
            {category}
          </h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {products?.map((product, index) => (
            <ProductCard key={`procard_${index}`} data={product} />
          ))}
        </div>
      </Wrapper>
    </div>
  );
}
