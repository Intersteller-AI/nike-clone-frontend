"use client";
import { Wrapper } from "@/app/components";
import Cookies from "js-cookie";
import { API_URL } from "@/app/utils/urls";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { counterActions } from "@/app/store/reducers/counter";
import { PiReceiptXFill } from "react-icons/pi";
import OrderItem from "@/app/components/product/OrderItem";

const retrieveStatus = async (orderId) => {
  const res = await fetch(`${API_URL}/api/orders/retrieve`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sessionId: orderId }),
  });
  const data = await res.json();
  return data;
};

const Failed = () => {
  const getCookie = Cookies.get("orderId");
  const dispatch = useDispatch();

  const { mutate, isLoading, data } = useMutation({
    mutationFn: (orderId) => retrieveStatus(orderId),
    onSuccess: (data) => {
      console.log(data);
      dispatch(counterActions.cartLen(data?.user.cart.length));
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    mutate(getCookie);
  }, [mutate, getCookie]);

  return (
    <div className="min-h-[650px] flex items-center py-8">
      <Wrapper>
        {isLoading ? (
          <div className="w-full min-h-screen flex flex-col items-center justify-center">
            <Image
              width={100}
              height={100}
              src="/assets/rhythm-loader.svg"
              alt="loader"
            />
            <h1 className="animate-pulse mt-4 text-lg font-semibold">
              Fetching order summary
            </h1>
          </div>
        ) : (
          <div className="flex flex-col min-h-screen">
            {/* upp section */}
            <div className="flex-[0.2] flex flex-col items-center justify-center text-center">
              <PiReceiptXFill className="text-red-500" size={40} />
              <h1 className="font-semibold text-xl mt-4">
                Looks like you messed up 😕
              </h1>
              <h3 className="max-w-xs mt-4 font-medium">
                {
                  "We'll get started on that right away. Feel free to reach out to us for returns, questions, or feedback."
                }
              </h3>
              <h3 className="max-w-sm text-slate-500 mt-3">
                Your order id is {data?.orderInfo._id}
              </h3>
            </div>

            {/* down section */}
            <div className="flex-1 flex border-t lg:flex-row flex-col mt-6">
              <div className="flex-[0.5] lg:border-r px-4">
                <h1 className="text-xl font-bold mt-4">Shipping</h1>
                <h3 className="capitalize font-semibold mt-3">
                  {data?.user?.name}
                </h3>
                <h2 className="mt-2 font-semibold w-full flex gap-5">
                  Payment Status :{" "}
                  <span className="capitalize font-semibold">
                    {data?.orderInfo?.paymentInfo?.status} ❌
                  </span>
                </h2>
                <h2 className="mt-2 font-semibold w-full flex gap-5">
                  Order Status :{" "}
                  <span className="capitalize text-red-500">
                    {data?.orderInfo?.orderStatus} 😓
                  </span>
                </h2>
              </div>
              <hr className="mt-6 h-1" />
              <div className="flex-1 px-4 lg:mt-0 mt-6">
                <div className="flex flex-col">
                  {data?.orderInfo?.orderItems?.map((item, index) => (
                    <OrderItem key={index} data={item} />
                  ))}
                </div>
                <div className="w-full flex justify-between mt-6">
                  <span className="font-semibold">Total Price</span>
                  <span className="font-semibold">
                    &#8377;{data?.orderInfo?.totalPrice}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Failed;
