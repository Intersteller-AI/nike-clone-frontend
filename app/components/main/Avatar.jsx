"use client";

import React from "react";
import Image from "next/image";

const Avatar = ({ src }) => {
  return (
    <div className="w-9 h-9 rounded-full overflow-hidden">
      <Image
        className="w-full h-full object-cover object-top "
        width={30}
        height={30}
        alt="Avatar"
        src={src || "/assets/placeholder.jpg"}
      />
    </div>
  );
};

export default Avatar;
