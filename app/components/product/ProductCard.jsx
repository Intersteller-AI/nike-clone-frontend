"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoMdHeartEmpty } from "react-icons/io";
import { AiOutlineCheck } from "react-icons/ai";
import { useRouter } from "next/navigation";
import useLoginModel from "@/app/hooks/useLoginModal";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { handleWishlist } from "@/app/services/product";
import { toast } from "react-hot-toast";
import { counterActions } from "@/app/store/reducers/counter";

const getDiscount = (original_price, discounted_price)=>{
  return ((original_price - discounted_price)/original_price * 100).toFixed(2)
}

const ProductCard = ({ data, userWishlist = null }) => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const loginModal = useLoginModel();

  const [liked, setLiked] = useState(false);

  const router = useRouter();

  const { refetch } = useQuery({
    enabled: false,
    queryFn: () => handleWishlist({ slug: data?.slug }),
    onSuccess: (data) => {
      dispatch(counterActions.wishlistLen(data?.count));
    },
    onError: (error) => {
      console.log(error);
    },
    queryKey: ["product"],
  });

  const wishlistHandler = () => {
    if (userState?.userInfo) {
      refetch();
      setLiked(!liked);
      liked
        ? toast.success("Remove from your wishlist 😃", {
            position: "bottom-center",
          })
        : toast.success("Added to you wishlist 🎉", {
            position: "bottom-center",
          });
    } else {
      loginModal.onOpen();
      toast.error("Please login to continue!");
    }
  };

  useEffect(() => {
    setLiked(userWishlist?.includes(data?._id));
  }, [userWishlist, data, router]);

  return (
    <div className="transform relative overflow-hidden flex flex-col bg-white duration-200 hover:scale-105 cursor-pointer">
      <div className="z-50 w-full flex justify-end items-start p-4 absolute top-0 left-0 ">
        <button
          className={`${
            liked ? "wishlist-remove" : "wishlist-info"
          } absolute top-0 right-0 p-4 m-4 rounded-full ${
            liked ? "bg-green-400" : "bg-rose-500"
          } text-white text-lg flex items-center justify-center`}
          onClick={wishlistHandler}
        >
          {liked ? <AiOutlineCheck size={20} /> : <IoMdHeartEmpty size={20} />}
        </button>
      </div>
      <div onClick={() => router.push(`/product/${data?.slug}`)}>
        <Image
          width={500}
          height={500}
          src={data?.thumbnail}
          alt={data?.name}
          priority
          className=""
        />
        <div className="p-4 text-black/[0.9]">
          <h2 className="text-lg font-semibold">{data?.name}</h2>
          <div className="flex items-center text-black/[0.5]">
            <p className="mr-2 font-semibold">&#8377;{data?.price}</p>
            {data?.original_price && (
              <>
                <p className="text-base font-medium line-through">
                  &#8377; {data?.original_price}
                </p>
                <p className="ml-auto text-base font-medium text-green-500">
                  {getDiscount(data?.original_price, data?.price)}% off
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
