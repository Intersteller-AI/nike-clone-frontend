import React from "react";
import Heading from "../inputs/Heading";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";

const Thumbnail = ({ thumbnailPic, isLoading, setFile }) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Thumbnail of your product"
        subtitle="please select only one image"
      />
      <div className="relative w-full md:h-56 h-[30vh] rounded-md border-2 border-blue-500 lutline-primary overflow-hidden">
        <label
          htmlFor="thumbnail"
          className="cursor-pointer absolute inset-0 rounded-full bg-transparent"
        >
          {thumbnailPic ? (
            <Image
              width={200}
              height={200}
              src={thumbnailPic}
              alt="thumbnail"
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
                src="assets/double-ring-loader.svg"
                alt=""
              />
            </div>
          )}
        </label>
        <input
          className="sr-only"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          id="thumbnail"
        />
      </div>
    </div>
  );
};

export default Thumbnail;
