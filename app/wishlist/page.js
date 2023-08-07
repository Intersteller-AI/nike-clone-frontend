"use client";

import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductCard, Wrapper } from "../components";
import { useQuery } from "@tanstack/react-query";
// import { getWishlist } from "../services/product";
import { userProfile } from "../services/user";
import { API_URL } from "../utils/urls";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const getWishlist = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/api/products/wishlist`, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.message) {
      return new Error(error.response.data.message);
    }
    return new Error(error.message);
  }
};

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [userWishlist, setUserWishlist] = useState([]);
  const counterState = useSelector((state) => state.counter);

  const { data: userData, refetch } = useQuery({
    queryFn: () => userProfile(),
    queryKey: ["profile"],
  });

  useEffect(() => {
    refetch();
    setUserWishlist(userData?.wishlist);
  }, [userData, refetch, counterState?.wishlistCounter]);

  const {
    data,
    isFetching,
    refetch: refetch2,
  } = useQuery({
    queryFn: () => getWishlist(),
    queryKey: ["wishlist"],
  });

  useEffect(() => {
    refetch2();
    setWishlist(data);
  }, [data, refetch2, counterState?.wishlistCounter]);

  return (
    <div className="w-full min-h-screen">
      <header className="bg-white drop-shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Wishlist
          </h1>
        </div>
      </header>
      <Wrapper>
        {wishlist?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
            {wishlist.map((product, index) => (
              <ProductCard
                key={`procard_${product?.slug}`}
                data={product}
                userWishlist={userWishlist}
              />
            ))}
          </div>
        ) : isFetching ? (
          <div className="w-full h-[70vh] flex items-center justify-center">
            <Image
              width={200}
              height={200}
              src="/assets/double-ring-loader.svg"
              alt="loader"
            />
          </div>
        ) : (
          <>
            {/* Empty cart content */}
            <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
              <Image
                src="/assets/empty-wishlist.jpg"
                width={300}
                height={300}
                alt="empty-cart"
                className="w-[200px] md:w-[300px]"
              />
              <span className="text-xl font-bold">your wishlist is empty</span>
              <span className="text-center mt-4">
                Looks like you have not added anything in your wishlist.
                <br />
                Go ahead and explore top categories.
              </span>
              <Link
                className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-all active:scale-95 active:text-black mb-3 mt-8 hover:opacity-75"
                href="/"
              >
                Continue Exploring
              </Link>
            </div>
          </>
        )}
      </Wrapper>
    </div>
  );
};

export default Wishlist;
