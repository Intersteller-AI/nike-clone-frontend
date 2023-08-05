import React from "react";
import Heading from "../inputs/Heading";
import { TbPhotoPlus } from "react-icons/tb";
import Image from "next/image";

const Images = ({ demoPictures, imagesLoading, setFiles }) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="show case images of your product"
        subtitle="you can select multiple images, you can select 6 images max!"
      />
      <div className="relative w-full h-[50vh] rounded-md border-2 border-blue-500 lutline-primary overflow-hidden">
        <label
          htmlFor="images"
          className="cursor-pointer absolute inset-0 rounded-full bg-transparent"
        >
          {demoPictures.length ? (
            <div className="w-full h-full images-grid">
              {demoPictures.map((img, index) => {
                return (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={index}
                    src={img}
                    alt="img"
                    className="object-cover h-full w-full border border-blue-500"
                  />
                );
              })}
            </div>
          ) : (
            <div className="w-full h-full bg-blue-50/50 flex justify-center items-center">
              <TbPhotoPlus className="w-7 h-auto text-primary" />
            </div>
          )}
          {imagesLoading && (
            <div className="absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center">
              <Image
                width={200}
                height={200}
                className="w-28 h-28"
                src="assets/double-ring-loader.svg"
                alt="loader"
              />
            </div>
          )}
        </label>
        <input
          multiple
          className="sr-only"
          type="file"
          onChange={(e) => setFiles(e.target.files)}
          id="images"
        />
      </div>
      <Heading
        subtitle="If you have uploaded wrong images please choose again!"
        className="mt-0"
      />
    </div>
  );
};

export default Images;
