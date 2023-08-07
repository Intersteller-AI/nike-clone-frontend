"use client";
import useLoginModel from "@/app/hooks/useLoginModal";
import { logoutUser } from "@/app/services/user";
import { logout } from "@/app/store/actions/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { BsChevronDown } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

const subMenuData = [
  { id: 1, name: "Jordan", doc_count: 11, link: "jordan" },
  { id: 2, name: "Sneakers", doc_count: 8, link:"sneakers" },
  { id: 3, name: "Running shoes", doc_count: 64, link: "running" },
  { id: 4, name: "Football shoes", doc_count: 107, link:"football" },
];

const MobileMenu = ({ showCatMenu, setShowCatMenu, setMobileMenu }) => {
  const currentPath = usePathname();
  const userState = useSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const loginModel = useLoginModel();

  const { mutate } = useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: (data) => {
      toast.success("Logout Successfully!");
      setMobileMenu(false);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.message);
    },
  });

  const logoutHandler = () => {
    dispatch(logout);
    router.push("/");
    mutate();
  };

  return (
    <div className="flex flex-col md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] border-t text-black bg-white">
      <div className="py-4 px-5 border-b">
        {userState?.userInfo ? (
          <Link
            href={currentPath === "/" ? "/profile" : "/"}
            onClick={() => setMobileMenu(false)}
          >
            {currentPath === "/" ? "Profile" : "Home"}
          </Link>
        ) : (
          <div onClick={loginModel.onOpen}>Login</div>
        )}
      </div>
      <div
        className="cursor-pointer flex flex-col relative py-4 px-5 border-b"
        onClick={() => setShowCatMenu(!showCatMenu)}
      >
        <div className="flex items-center justify-between">
          Categories
          <BsChevronDown
            size={14}
            className={`${
              showCatMenu ? "rotate-180" : "rotate-0"
            } transition-all duration-100`}
          />
        </div>
        {showCatMenu && (
          <div className="bg-black/[0.05] -mx-5 mt-4 -mb-4">
            {subMenuData?.map((categoriesData, index) => (
              <Link
                key={`subMenu_${index}`}
                href={`/category/${categoriesData?.link}`}
                onClick={() => {
                  setShowCatMenu(false);
                  setMobileMenu(false);
                }}
              >
                <div className="py-4 px-8 border-t flex justify-between">
                  {categoriesData?.name}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="py-4 px-5 border-b">
        <Link href="/" onClick={() => setMobileMenu(false)}>
          About
        </Link>
      </div>
      <div className="py-4 px-5 border-b">
        <Link href="/" onClick={() => setMobileMenu(false)}>
          Contact
        </Link>
      </div>
      {userState?.userInfo && (
        <div className="py-4 px-5 border-b" onClick={logoutHandler}>
          Logout
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
