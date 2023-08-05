"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Avatar from "../main/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCloseCircle, AiOutlineHome } from "react-icons/ai";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import { logout } from "../../store/actions/user";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import MobileNav from "./MobileNav";

const navMenu = [
  {
    icon: <AiOutlineHome />,
    label: "Home",
    ref: "/",
  },
  {
    icon: <LuLayoutDashboard />,
    label: "Dashboard",
    ref: "/admin/dashboard",
  },
  {
    icon: <FiLogOut />,
    label: "Logout",
  },
];

const Sidebar = () => {
  const userState = useSelector((state) => state.user);

  const [userInfo, setUserInfo] = useState(null);

  const [mobileMenu, setMobileMenu] = useState(false)

  useEffect(() => {
    setUserInfo(userState.userInfo);
  }, [userState]);

  const dispatch = useDispatch();
  const router = useRouter();

  const { refetch } = useQuery({
    refetchOnWindowFocus: false,
    enabled: false,
    queryFn: () => logoutUser(),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.message);
    },
    queryKey: ["admin"],
  });

  const logoutHandler = () => {
    dispatch(logout);
    refetch();
    router.push("/");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1000) {
        setMobileMenu(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="bg-gray-800 lg:flex hidden flex-col">
        <div className="hover:cursor-pointer relative flex items-center gap-3 bg-gray-700 p-2 rounded-lg shadow-lg my-4 mx-3.5">
          <Avatar alt="Avatar" src={userInfo?.avatar} />
          <div className="flex flex-col gap-0 text-white">
            <span className="font-medium text-lg capitalize">
              {userInfo?.name}
            </span>
            <span className="text-sm max-w-[200px] truncate">
              {userInfo?.email}
            </span>
          </div>
          <button
            onClick={() => setToggleSidebar(false)}
            className="sm:hidden bg-gray-800 ml-auto rounded-full w-10 h-10 flex items-center justify-center"
          >
            <AiOutlineCloseCircle />
          </button>
        </div>

        <div className="flex flex-col w-full gap-1 my-8">
          {navMenu?.map((item, index) => {
            const { icon, label, ref } = item;
            return (
              <div key={`side_${index}`} className="text-white">
                {label === "Logout" ? (
                  <button
                    onClick={logoutHandler}
                    className="hover:bg-gray-700 flex gap-3 items-center py-3 px-4 font-medium w-full"
                  >
                    <span>{icon}</span>
                    <span>{label}</span>
                  </button>
                ) : label === "Home" ? (
                  <Link
                    href={ref}
                    className="hover:bg-gray-700 flex gap-3 items-center py-3 px-4 font-medium w-full"
                  >
                    <span>{icon}</span>
                    <span>{label}</span>
                  </Link>
                ) : (
                  <button
                    className={`hover:bg-gray-700 flex gap-3 items-center py-3 px-4 font-medium w-full`}
                  >
                    <span>{icon}</span>
                    <span>{label}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-1 bg-gray-700 p-3 rounded-lg shadow-lg mb-6 mt-28 mx-3.5 overflow-hidden">
          <h5 className="text-gray-300">Developed with ❤️ by :</h5>
          <div className="flex flex-col gap-0">
            <a
              href="https://www.linkedin.com/in/jigar-sable"
              target="_blank"
              rel="noreferrer"
              className="text-gray-200 font-medium capitalize text-lg hover:text-blue-500"
            >
              Priyanshu sahu
            </a>
            <a
              href="mailto:sahupriyanshu67@gmail.com"
              className="text-gray-200 text-sm hover:text-blue-500"
            >
              sahupriyanshu67@gmail.com
            </a>
          </div>
        </div>
      </div>
      {/* for mobile */}
      <MobileNav mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
      <div
        className="bg-gray-800 flex flex-col lg:hidden fixed z-20 transition-all duration-150 h-screen"
        style={{ left: mobileMenu ? "0%" : "-100%" }}
      >
        <div className="hover:cursor-pointer relative flex items-center gap-3 bg-gray-700 p-2 rounded-lg shadow-lg my-4 mx-3.5">
          <Avatar alt="Avatar" src={userInfo?.avatar} />
          <div className="flex flex-col gap-0 text-white">
            <span className="font-medium text-lg capitalize">
              {userInfo?.name}
            </span>
            <span className="text-sm max-w-[200px] truncate">
              {userInfo?.email}
            </span>
          </div>
        </div>

        <div className="flex flex-col w-full gap-1 my-8">
          {navMenu?.map((item, index) => {
            const { icon, label, ref } = item;
            return (
              <div key={`side_${index}`} className="text-white">
                {label === "Logout" ? (
                  <button
                    onClick={logoutHandler}
                    className="hover:bg-gray-700 flex gap-3 items-center py-3 px-4 font-medium w-full"
                  >
                    <span>{icon}</span>
                    <span>{label}</span>
                  </button>
                ) : label === "Home" ? (
                  <Link
                    href={ref}
                    className="hover:bg-gray-700 flex gap-3 items-center py-3 px-4 font-medium w-full"
                  >
                    <span>{icon}</span>
                    <span>{label}</span>
                  </Link>
                ) : (
                  <button
                    className={`hover:bg-gray-700 flex gap-3 items-center py-3 px-4 font-medium w-full`}
                  >
                    <span>{icon}</span>
                    <span>{label}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-1 bg-gray-700 p-3 rounded-lg shadow-lg mb-6 mt-28 mx-3.5 overflow-hidden">
          <h5 className="text-gray-300">Developed with ❤️ by :</h5>
          <div className="flex flex-col gap-0">
            <a
              href="https://www.linkedin.com/in/jigar-sable"
              target="_blank"
              rel="noreferrer"
              className="text-gray-200 font-medium capitalize text-lg hover:text-blue-500"
            >
              Priyanshu sahu
            </a>
            <a
              href="mailto:sahupriyanshu67@gmail.com"
              className="text-gray-200 text-sm hover:text-blue-500"
            >
              sahupriyanshu67@gmail.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
