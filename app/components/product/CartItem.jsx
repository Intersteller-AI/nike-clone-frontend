"use client";

import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import { counterActions } from "@/app/store/reducers/counter";
import { useMutation } from "@tanstack/react-query";
import { handleCart, removeFromCart } from "@/app/services/product";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";

const CartItem = ({ data }) => {
  const productDetails = data?.product;
  const router = useRouter();

  const dispatch = useDispatch();

  const { mutate } = useMutation({
    mutationFn: (formData) => handleCart({ formData }),
    onSuccess: (data) => {
      dispatch(counterActions.cartLen(data?.count));
      router.refresh();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const updateCartItem = (e, key) => {
    const formData = new FormData();

    if (key === "quantity") {
      formData.append("selectedSize", data?.selectedSize);
      formData.append("slug", productDetails?.slug);
      formData.append("quantity", parseInt(e.target.value));
      mutate(formData);
    }
    dispatch(counterActions.cartLen(0))
  };

  const { mutate: removeFromCartMutate } = useMutation({
    mutationFn: (formData) => removeFromCart({ formData }),
    onSuccess: (data) => {
      dispatch(counterActions.cartLen(data?.count))
      toast.success("Item Removed!");
      router.refresh();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const deleteHandler = (val) => {
    const formData = new FormData();

    formData.append("_id", val);

    removeFromCartMutate(formData);
  };


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
              <select
                className="hover:text-black"
                onChange={(e) => updateCartItem(e, "quantity")}
                defaultValue={data?.quantity}
              >
                {Array.from({ length: 10 }, (_, index) => index + 1).map(
                  (quantity, index) => (
                    <option key={index} value={quantity}>
                      {quantity}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
          <div
            className="flex items-center gap-2 text-red-500 cursor-pointer hover:bg-red-500 rounded-md border-2 border-red-500 px-2 py-1 hover:text-white"
            onClick={()=> deleteHandler(data?._id)}
          >
            <AiOutlineDelete size={14} />{" "}
            <span className="text-[12px] font-bold">Remove</span>
          </div>

          {/* <RiDeleteBin6Line
            onClick={() => dispatch(cartActions.removeFromCart(data))}
            className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
