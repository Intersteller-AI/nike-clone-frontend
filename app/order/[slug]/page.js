"use client";
import { Wrapper } from "@/app/components";
import { API_URL } from "@/app/utils/urls";
import Image from "next/image";
import { AiFillCheckCircle } from "react-icons/ai";
import OrderItem from "@/app/components/product/OrderItem";
import { PiReceiptXFill } from "react-icons/pi";
import { useQuery } from "@tanstack/react-query";

const getOrder = async (orderId) => {
  const res = await fetch(`${API_URL}/api/orders/${orderId}`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

const Success = ({ params }) => {
  console.log(params);
  const { data, isLoading } = useQuery({
    queryFn: () => getOrder(params.slug),
    queryKey: ["orders"],
  });

  console.log(data);

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
              Fetching your order
            </h1>
          </div>
        ) : data?.orderInfo.orderStatus === "Failed" ? (
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
                <hr className="mt-4"/>
                <h2 className="mt-3 font-semibold w-full flex gap-5">
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
        ) : (
          <div className="flex flex-col min-h-screen">
            {/* upp section */}
            <div className="flex-[0.2] flex flex-col items-center justify-center text-center">
              <AiFillCheckCircle className="text-green-500" size={40} />
              <h1 className="font-semibold text-xl mt-4">
                Thanks for your order 😊
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
                <h3 className="font-medium">
                  {data?.orderInfo?.shippingInfo?.address1}
                </h3>
                <h3 className="font-medium">
                  {data?.orderInfo?.shippingInfo?.address2}
                </h3>
                <h2 className="font-medium">
                  {data?.orderInfo?.shippingInfo?.state},{" "}
                  {data?.orderInfo?.shippingInfo?.city},{" "}
                  {data?.orderInfo?.shippingInfo?.postal_code}
                </h2>
                <h2 className="mt-2 font-semibold w-full flex gap-5">
                  Payment Status :{" "}
                  <span className="font-normal capitalize text-green-500">
                    {data?.orderInfo?.paymentInfo?.status} ✅
                  </span>
                </h2>
                <h2 className="mt-2 font-semibold w-full flex gap-5">
                  Order Status :{" "}
                  <span className="font-medium capitalize text-yellow-400">
                    {data?.orderInfo?.orderStatus} ⌛
                  </span>
                </h2>
                <hr className="mt-5" />
                <div className="flex items-center gap-2 mt-4 lg:justify-start justify-between">
                  <div className="">
                    <h1 className="font-semibold text-lg">Made a Mistake?</h1>
                    <h3 className="font-medium text-slate-500 mt-2 max-w-md">
                      You have one hour from order placement to cancel your
                      order, Simply click Cancel Order
                    </h3>
                  </div>
                  <button className="border-2 hover:bg-red-500 hover:text-white transition duration-75 font-semibold border-red-400 text-red-500 px-4 whitespace-nowrap h-12 rounded-sm">
                    Cancel Order
                  </button>
                </div>
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
                <hr className="mt-4" />
                <div className="border-[4px] border-yellow-300 rounded-sm p-2 mt-6 font-medium">
                  {`Our Return Policy We accept returns within 30 days from the ship
                date, solong as the items haven't been worn, wushed, damaged. or
                altered. Don't get rd of any tems tags or packaging until you
                know youre keeping it—wail need those to meke the return. For
                more details underwear returns, one-off specifics, etc. orto
                begin o return, visit everlane.com/returns.`}
                </div>
              </div>
            </div>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Success;
