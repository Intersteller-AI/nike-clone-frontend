import { logout } from "@/app/store/actions/user";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";
import { BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";

const subMenuData = [
  { id: 1, name: "Jordan", doc_count: 11 },
  { id: 2, name: "Sneakers", doc_count: 8 },
  { id: 3, name: "Running shoes", doc_count: 64 },
  { id: 4, name: "Football shoes", doc_count: 107 },
];

const MobileMenu = ({ showCatMenu, setShowCatMenu, setMobileMenu }) => {
  const currentPath = usePathname();
  const userState = useSelector((state) => state.user);
  const router = useRouter();

  const { refetch } = useQuery({
    refetchOnWindowFocus: false,
    enabled: false,
    queryFn: () => logoutUser(),
    onSuccess: (data) => {
      toast.success(data?.message);
      setMobileMenu(false)
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.message);
    },
    queryKey: ["profile"],
  });

  const logoutHandler = () => {
    dispatch(logout);
    router.push("/");
    refetch();
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
          <Link href="/login" onClick={() => setMobileMenu(false)}>
            Login
          </Link>
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
                href={`/category/${categoriesData?.name}`}
                onClick={() => {
                  setShowCatMenu(false);
                  setMobileMenu(false);
                }}
              >
                <div className="py-4 px-8 border-t flex justify-between">
                  {categoriesData?.name}
                  <span className="opacity-50 text-sm">{`(${categoriesData.doc_count})`}</span>
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
