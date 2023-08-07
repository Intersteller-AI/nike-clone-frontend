"use client";

import { createReview, deleteReview } from "@/app/services/product";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineDelete, AiOutlinePlusSquare } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { FaPen } from "react-icons/fa";
import { useSelector } from "react-redux";

const ReviewForm = ({
  submitHandler,
  formCancelHandler,
  loading,
  value,
  btnLabel,
  setValue,
}) => (
  <form onSubmit={submitHandler}>
    <div className="flex flex-col items-end border border-primary rounded-lg p-4">
      <textarea
        className="w-full focus:outline-none bg-transparent"
        placeholder="Provide your review"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="flex flex-col-reverse gap-y-2 items-center gap-x-2 pt-2 min-[420px]:flex-row">
        {formCancelHandler && (
          <button
            onClick={formCancelHandler}
            className="px-3 py-1 rounded-sm text-sm font-semibold disabled:opacity-70 disabled:cursor-not-allowed border-2 border-red-500 text-red-500 hover:text-white hover:bg-red-500"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-3 py-1 rounded-sm text-sm font-semibold disabled:opacity-70 disabled:cursor-not-allowed bg-white border-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500"
        >
          {btnLabel}
        </button>
      </div>
    </div>
  </form>
);

const Reviews = ({ heading, data }) => {
  const router = useRouter();
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [activeForm, setActiveForm] = useState(false);
  const [reviewData, setReviewData] = useState([]);
  const [value, setValue] = useState("");

  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    setReviewData(data?.reviews);
  }, [data]);

  const userFounded = reviewData.find(
    (user) => user.user?._id === userInfo?._id
  );

  const { mutate } = useMutation({
    mutationFn: (formData) => createReview({ formData }),
    onSuccess: (data) => {
      toast.success("Review added 😀!");
      setValue("");
      setActiveForm(null);
      router.refresh();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("desc", value);
    formData.append("slug", data?.slug);

    mutate(formData);
  };

  const { mutate: deleteReviewMutate } = useMutation({
    mutationFn: (formData) => deleteReview({ formData }),
    onSuccess: (data) => {
      toast.success("Review deleted successfully.");
      router.refresh();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const deleteHandler = (val) => {
    const formData = new FormData();

    formData.append("_id", val);
    formData.append("slug", data?.slug);

    deleteReviewMutate(formData);
  };

  const updateReview = (desc) => {
    setValue(desc);
    setActiveForm(true);
  };

  return (
    <div className="w-full mt-12">
      <div
        className={`w-full ${
          !isReviewsOpen ? "h-12" : "h-max"
        } relative flex flex-col justify-between overflow-hidden`}
      >
        <div
          className={`z-10 flex justify-between items-center hover:cursor-pointer bg-white`}
          onClick={() => {
            setIsReviewsOpen(!isReviewsOpen);
          }}
        >
          <h5 className="text-[18px] capitalize font-semibold">{heading}</h5>
          <div
            className={`p-3 hover:bg-slate-300 hover:cursor-pointer rounded-full mr-4 ${
              isReviewsOpen ? "rotate-180" : "rotate-0"
            } transition-all duration-150`}
          >
            <BsChevronDown />
          </div>
        </div>
        <div
          style={{
            transform: `translateY(${!isReviewsOpen ? "-140%" : "0%"})`,
          }}
          className={`z-0 transition-transform duration-75 flex flex-col gap-3 mt-3 max-h-[600px]`}
        >
          {!activeForm && !userFounded && (
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setActiveForm(true)}
            >
              <h1>Give a review</h1>
              <AiOutlinePlusSquare size={20} className="text-blue-600" />
            </div>
          )}
          {activeForm && (
            <ReviewForm
              submitHandler={submitHandler}
              setValue={setValue}
              value={value}
              btnLabel="Send"
              formCancelHandler={() => setActiveForm(null)}
            />
          )}
          {reviewData
            .map((val, index) => (
              <div key={`${heading}_${index}`}>
                <div className="flex flex-nowrap items-start gap-x-3 rounded-lg bg-[#F2F4F5] p-3">
                  <Image
                    width={200}
                    height={200}
                    src={
                      val?.user?.avatar
                        ? val?.user?.avatar
                        : "/assets/placeholder.jpg"
                    }
                    alt="user profile"
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <h5 className="text-xs font-bold capitalize text-dark-hard lg:text-sm">
                      {val?.user?.name}
                    </h5>
                    <p className="mt-[10px] font-opensans text-dark-light">
                      {val?.desc}
                    </p>
                    <div className="mt-3 mb-3 flex items-center gap-x-3 font-roboto text-sm text-dark-light">
                      {userInfo?._id === val?.user._id && (
                        <>
                          <div
                            className="flex items-center gap-2 text-blue-500 cursor-pointer hover:bg-blue-500 rounded-md border-2 border-blue-500 px-2 py-1 hover:text-white"
                            onClick={() => updateReview(val?.desc)}
                          >
                            <FaPen />{" "}
                            <span className="text-[12px] font-bold">Edit</span>
                          </div>
                          <div
                            className="flex items-center gap-2 text-red-500 cursor-pointer hover:bg-red-500 rounded-md border-2 border-red-500 px-2 py-1 hover:text-white"
                            onClick={() => deleteHandler(val?._id)}
                          >
                            <AiOutlineDelete size={14} />{" "}
                            <span className="text-[12px] font-bold">
                              Delete
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
            .reverse()}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
