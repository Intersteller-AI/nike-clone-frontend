"use client";

import { useEffect, useState } from "react";
import { Hero, ProductCard, Wrapper } from "..";
import { API_URL } from "@/app/utils/urls";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const userProfile = async () => {
  try {
    const res = await fetch(`${API_URL}/api/users/profile`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return new Error(error.response.data.message);
    }
    return new Error(error.message);
  }
};

const ProductsSection = ({ products }) => {
  const [userData, setUserData] = useState([]);
  const userState = useSelector((state) => state.user);

  const { data, refetch } = useQuery({
    queryFn: () => userProfile(),
    queryKey: ["profile"],
  });

  useEffect(() => {
    setUserData(data?.wishlist);
  }, [data, refetch]);

  useEffect(() => {
    refetch();
  }, [refetch, userState]);

  return (
    <main>
      <Hero />
      {/* Heading and Paragraph */}
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 leading-tight font-semibold">
            Cusioning for Your Miles
          </div>
          <div className="text-md md:text-xl">
            A lightweight Nike ZoomX midsole is combined with increased stack
            heights to help provide cushioning during extended streching of
            running.
          </div>
        </div>
        {/* products cards section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {products.map((product, index) => (
            <ProductCard
              key={`procard_${product?.slug}`}
              data={product}
              userWishlist={userData}
            />
          ))}
        </div>
      </Wrapper>
    </main>
  );
};

export default ProductsSection;
