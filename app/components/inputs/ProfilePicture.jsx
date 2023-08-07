"use client";
import { useEffect, useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { userActions } from "@/app/store/reducers/user";
import axios from "axios";
import { API_URL } from "@/app/utils/urls";

const uploadProfilePic = async ({ formData }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${API_URL}/api/users/profilePic`,
      formData,
      config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      return new Error(error.response.data.message);
    return new Error(error.message);
  }
};

const deleteProfilePic = async () => {
  try {
    const { data } = await axios.delete(`${API_URL}/api/users/profilePic`, {
      withCredentials: true
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      return new Error(error.response.data.message);
    return new Error(error.message);
  }
};

const ProfilePicture = ({ avatar, className }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const [photo, setPhoto] = useState(null);

  const { mutate, isLoading: isDeletingPic } = useMutation({
    mutationFn: () => deleteProfilePic(),
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      queryClient.invalidateQueries(["profile"]);
      toast.success("Profile Photo is removed");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const handleDeleteImage = () => {
    if (window.confirm("Do you want to delete your profile picture")) {
      try {

        mutate();
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    }
  };

  const { mutate: uploadPicMutate, isLoading } = useMutation({
    mutationFn: (formData) => uploadProfilePic({ formData: formData }),
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      queryClient.invalidateQueries(["profile"]);
      toast.success("Profile Photo is updated.");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    const getImage = async () => {
      if (photo) {
        const formData = new FormData();
        formData.append("avatar", photo);
        uploadPicMutate(formData);
      }
    };
    getImage();
  }, [uploadPicMutate, photo]);

  return (
    <div className={`w-full flex flex-col items-center gap-4 ${className}`}>
      <div className="relative w-36 h-36 rounded-full border-2 border-blue-500 lutline-primary overflow-hidden">
        <label
          htmlFor="profilePic"
          className="cursor-pointer absolute inset-0 rounded-full bg-transparent"
        >
          {avatar ? (
            <Image
              priority
              width={200}
              height={200}
              src={avatar}
              alt="profilePic"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-blue-50/50 flex justify-center items-center">
              <TbPhotoPlus className="w-7 h-auto text-primary" />
            </div>
          )}
          {isLoading && (
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flexitems-center justify-center">
              <Image
                width={200}
                height={200}
                className="w-28 h-28"
                src="assets/loader2.svg"
                alt=""
              />
            </div>
          )}
        </label>
        <input
          className="sr-only"
          type="file"
          onChange={(e) => setPhoto(e.target.files[0])}
          id="profilePic"
        />
      </div>
      {avatar && (
        <button
          onClick={handleDeleteImage}
          type="button"
          className="border border-red-500 hover:text-white hover:bg-red-500 transition duration-150 rounded-md px-4 py-2 md:text-[14px] font-normal text-red-500"
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default ProfilePicture;
