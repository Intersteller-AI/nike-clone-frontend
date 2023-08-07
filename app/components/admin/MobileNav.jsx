"use client";
import React, { useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { Wrapper } from "..";
import Image from "next/image";
import Link from "next/link";

const MobileNav = ({mobileMenu, setMobileMenu}) => {

  return (
    <div
      className={`w-full h-[50px] md:h-[80px] bg-white flex lg:hidden items-center justify-between z-20 sticky top-0 transition-transform duration-300`}
    >
      <Wrapper className={`flex h-[60px] items-center justify-between`}>
        <Link href="/">
          <Image
            priority="false"
            src="/assets/logo.svg"
            alt="logo"
            width={90}
            height={90}
            className="w-[40px] md:w-[60px]"
          />
        </Link>

        <div className={`flex items-center gap-2 text-black`}>
          {/* mobile menu */}
          <div
            onClick={() => setMobileMenu(!mobileMenu)}
            className="w-8 md:w-12 h-8 md:h-12 rounded-full flex lg:hidden justify-center items-center cursor-pointer hover:bg-black/[0.05] relative"
          >
            {mobileMenu ? (
              <VscChromeClose className="md:text-[28px] text-[20px]" />
            ) : (
              <BiMenuAltRight className="md:text-[28px] text-[20px]" />
            )}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default MobileNav;
