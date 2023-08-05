"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "../utils/urls";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { CartItem, Wrapper } from "../components";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const getCart = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/api/products/cart`, {
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

const handlePayment = async (subTotal) => {
  const res = await fetch(`${API_URL}/api/orders/process`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount: subTotal }),
  });
  const data = await res.json();
  // Cookies.set("orderId", data.id, { expires: 1 });
  // window.location.href = data.url;

  // console.log(data.url);
  return data;
};

const Page = () => {
  const router = useRouter();
  const counterState = useSelector((state) => state.counter);

  const {
    data: cart,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: getCart,
    queryKey: ["cart"],
  });

  useEffect(() => {
    refetch();
  }, [counterState, refetch]);

  const subTotal = useMemo(() => {
    return cart?.reduce((total, val) => {
      const price = Number(val?.oneQuantityPrice) * val?.quantity;
      return total + price;
    }, 0);
  }, [cart]);

  const { mutate, isLoading: isPaymentLoading } = useMutation({
    mutationFn: (val) => handlePayment(val),
    onSuccess: (data) => {
      Cookies.set("orderId", data?.id, { expires: 1 });
      router.push(data?.url);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleCheckout = () => {
    mutate(subTotal);
  };

  return (
    <Wrapper>
      {cart?.length > 0 ? (
        <>
          {/* heading */}
          <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
            <div className="text-[28px] md:text-[34px] font-semibold leading-tight">
              Shoping Cart
            </div>
          </div>
          {/* cart content */}
          <div className="flex flex-col lg:flex-row gap-12 py-10">
            {/* cart items */}
            <div className="flex-[2]">
              <div className="text-lg font-bold">Cart Items</div>
              {cart?.map((item, index) => (
                <CartItem key={`cartitem_${index}`} data={item} />
              ))}
            </div>
            {/* summary */}
            <div className="flex-[1]">
              <div className="text-lg font-bold">Summary</div>

              <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
                <div className="flex justify-between">
                  <div className="uppercase text-sm md:text-lg font-semibold text-black">
                    Subtotal
                  </div>
                  <div className="text-sm md:text-[16px] font-semibold text-black">
                    &#8377; {subTotal}
                  </div>
                </div>
                <div className="text-sm py-5 border-t mt-5">
                  The subtotal reflects the total price of your order, including
                  duties and taxes, before any applicable discounts. It does not
                  include delivery costs and international transaction fees.
                </div>
              </div>

              {/* BUTTON START */}
              <button
                className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center"
                onClick={handleCheckout}
              >
                {isPaymentLoading ? (
                  <Image
                    width={100}
                    height={100}
                    src="/assets/double-ring-loader.svg"
                    alt="loader"
                    className="w-9 h-9"
                  />
                ) : (
                  "Checkout"
                )}
              </button>
              {/* BUTTON END */}
            </div>
          </div>
          {/* cart ended */}
        </>
      ) : isLoading ? (
        <div className="w-full h-screen md:h-[60vh] flex flex-col items-center justify-center gap-2">
          <Image
            width={200}
            height={200}
            src="assets/loader2.svg"
            alt="loader"
            className="w-16 h-16"
          />
          <h1 className="animate-pulse text-xl font-semibold text-gray-700">
            Fetching your cart details
          </h1>
        </div>
      ) : (
        <>
          {/* Empty cart content */}
          <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
            <Image
              src="/assets/empty-cart.jpg"
              width={500}
              height={500}
              alt="empty-cart"
              priority
              className="w-[300px] md:w-[400px]"
            />
            <span className="text-xl font-bold">your cart is empty</span>
            <span className="text-center mt-4">
              Looks like you have not added anything in your cart.
              <br />
              Go ahead and explore top categories.
            </span>
            <Link
              className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-all active:scale-95 active:text-black mb-3 mt-8 hover:opacity-75"
              href="/"
            >
              Continue Shopping
            </Link>
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default Page;
