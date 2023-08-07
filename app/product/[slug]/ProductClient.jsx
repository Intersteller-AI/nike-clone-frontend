"use client";

import React, { useEffect, useState } from "react";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast as rt } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ProductDetailsCarousal,
  RelatedProducts,
  Wrapper,
} from "../../components";
import { useMutation, useQuery } from "@tanstack/react-query";
import useLoginModel from "@/app/hooks/useLoginModal";
import { toast } from "react-hot-toast";
import { handleCart, handleWishlist } from "@/app/services/product";
import { userProfile } from "@/app/services/user";
import { counterActions } from "@/app/store/reducers/counter";
import Reviews from "@/app/components/product/Reviews";
import { useRouter } from "next/navigation";

const getDiscount = (original_price, discounted_price)=>{
  return ((original_price - discounted_price)/original_price * 100).toFixed(2)
}

const SizeSelector = ({ size, unavailable = false, onClick, classes }) => (
  <div
    onClick={onClick}
    className={`border rounded-md text-center py-3 font-medium ${
      unavailable
        ? "cursor-not-allowed bg-black/[0.1] opacity-50"
        : "hover:border-black cursor-pointer"
    } ${classes}`}
  >
    {size}
  </div>
);

export default function ProductClient({ productDetails, products }) {
  const [showError, setShowError] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [wishlisted, setWishlisted] = useState(false);
  const [user, setUser] = useState([]);
  const router = useRouter();

  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const loginModal = useLoginModel();

  const notify = () => {
    rt.success("Successfully added to your cart!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const { refetch } = useQuery({
    enabled: false,
    queryFn: () => handleWishlist({ slug: productDetails?.slug }),
    onSuccess: (data) => {
      dispatch(counterActions.wishlistLen(data?.count));
    },
    onError: (error) => {
      console.log(error);
    },
    queryKey: ["products"],
  });

  const { data: userData } = useQuery({
    queryFn: () => userProfile(),
    queryKey: ["profile"],
  });

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  useEffect(() => {
    setWishlisted(user?.wishlist?.includes(productDetails?._id));
  }, [productDetails, user]);

  const wishlistHandler = () => {
    if (userState?.userInfo) {
      refetch();
      setWishlisted(!wishlisted);
      wishlisted
        ? toast.success("Remove from your wishlist 😃")
        : toast.success("Added to you wishlist 🎉");
    } else {
      loginModal.onOpen();
      toast.error("Please login to continue!");
    }
  };

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

  const cartHandler = () => {
    if (!userState?.userInfo) {
      loginModal.onOpen();
      toast.error("Please login to continue! 😑");
      return;
    }
    if (!selectedSize) {
      setShowError(true);
      document.getElementById("sizesGrid").scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
      return;
    }
    const formData = new FormData();
    formData.append("selectedSize", selectedSize);
    formData.append("oneQuantityPrice", productDetails?.price);
    formData.append("slug", productDetails?.slug);
    mutate(formData);
    notify();
  };

  return (
    <div className="w-full md:py-12">
      <ToastContainer />
      <Wrapper>
        <div className="flex flex-col lg:flex-row px-10 gap-[50px] lg:gap-[100px]">
          {/* left */}
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            <ProductDetailsCarousal images={productDetails?.images} />
          </div>
          {/* right */}
          <div className="flex-[1] py-3">
            {/* Product Title */}
            <div className="md:text-[30px] text-[24px] font-semibold mb-2 leading-tight">
              {productDetails?.name || "product name"}
            </div>
            {/* Product Subtitle */}
            <div className="text-lg font-semibold mb-5">
              {productDetails?.subtitle || "product subtitle"}
            </div>
            {/* Product Price */}
            <div className="flex items-center md:text-lg text-sm">
              <p className="mr-2 font-semibold">
                MRP : &#8377;{productDetails?.price}
              </p>
              {productDetails?.original_price && (
                <>
                  <p className="font-medium line-through">
                    &#8377;{productDetails?.original_price}
                  </p>
                  <p className="ml-auto font-medium text-green-500">
                    {getDiscount(
                      productDetails?.original_price,
                      productDetails?.price
                    )}
                    % off
                  </p>
                </>
              )}
            </div>
            <div className="text-sm font-medium text-black/[0.5]">
              Incl. of taxes
            </div>
            <div className="text-sm font-medium text-black/[0.5] mb-20">
              {`(Also includes all applicable duties)`}
            </div>
            {/* PRODUCT SIZE RANGE START */}
            <div className="mb-10">
              {/* Heading */}
              <div className="flex justify-between mb-2">
                <div className="text-sm font-medium text-black/[0.5]">
                  Select Size
                </div>
                <div className="text-sm font-medium text-black/[0.5]">
                  Select Guides
                </div>
              </div>
              {/* SIZE SELECTION */}
              <div id="sizesGrid" className="grid grid-cols-3 gap-2">
                {productDetails?.size.data.map((sizeAtt, index) => (
                  <SizeSelector
                    key={`size_${index}`}
                    size={sizeAtt.size}
                    unavailable={!sizeAtt.enabled}
                    onClick={() => {
                      if (sizeAtt.enabled) {
                        setSelectedSize(sizeAtt.size);
                        setShowError(false);
                      }
                    }}
                    classes={`${
                      selectedSize === sizeAtt.size ? "border-black" : ""
                    }`}
                  />
                ))}
              </div>
              {showError && (
                <div className="text-red-600 my-3">
                  Size selection is required
                </div>
              )}
              <button
                className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 md:mt-6 mt-8"
                onClick={cartHandler}
              >
                Add to Cart
              </button>
              {/* ADD TO CART BUTTON END */}

              {/* WHISHLIST BUTTON START */}
              <button
                onClick={wishlistHandler}
                className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10"
              >
                {wishlisted ? (
                  <>
                    Whishlisted
                    <IoMdHeart size={22} className="text-red-500" />
                  </>
                ) : (
                  <>
                    Whishlist
                    <IoMdHeartEmpty size={20} />
                  </>
                )}
              </button>
              {/* WHISHLIST BUTTON END */}
              {/* DESCRIPTION */}
              <div>
                <div className="text-lg font-bold mb-5">Product Details</div>
                <div className="markdown text-md mb-5">
                  <ReactMarkdown>
                    {String(productDetails?.description)}
                  </ReactMarkdown>
                </div>
              </div>
              <hr className="w-full my-8" />
              <Reviews data={productDetails} heading="Reviews" />
            </div>
          </div>
        </div>
        {/* <RelatedProducts products={products} /> */}
      </Wrapper>
    </div>
  );
}
