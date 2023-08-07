"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Wrapper, Menu, MobileMenu } from "..";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { useSelector } from "react-redux";
import Avatar from "./Avatar";
import useRegisterModel from "../../hooks/useRegisterModal";
import useLoginModel from "../../hooks/useLoginModal";
import { usePathname, useRouter } from "next/navigation";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const MenuItem = ({ onClick, label }) => (
  <div
    onClick={onClick}
    className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer rounded-md"
  >
    {label}
  </div>
);

const NotyIcon = ({ Icon, data, linkJump = "/", cartEmpty = true }) => (
  <Link href={linkJump}>
    <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center cursor-pointer hover:bg-black/[0.05] relative">
      <Icon className="text-[15px] md:text-[20px]" />
      <div
        className={`h-[14px] md:h-[18px] min-w-[15px] md:min-w-[18px] rounded-full ${
          cartEmpty ? "" : "bg-red-600"
        } absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]`}
      >
        {data}
      </div>
    </div>
  </Link>
);

const Header = () => {
  const router = useRouter();
  const registerModal = useRegisterModel();
  const loginModel = useLoginModel();
  const [userInfo, setUserInfo] = useState(null);
  const [wishCounter, setWishCounter] = useState(0);
  const [cartCounter, setCartCounter] = useState(0);
  const userState = useSelector((state) => state.user);
  const counterState = useSelector((state) => state.counter);

  useEffect(() => {
    setUserInfo(userState.userInfo);
  }, [userState]);

  useEffect(() => {
    setWishCounter(counterState?.wishlistCounter);
    setCartCounter(counterState?.cartCounter);
  }, [counterState]);

  const location = usePathname();

  const clickHandler = () => {
    router.push("/profile");
  };

  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      window.scrollY > lastScrollY && !mobileMenu
        ? setShow("-translate-y-[80px]")
        : setShow("drop-shadow-sm");
    } else {
      setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastScrollY]);

  return (
    <div
      className={`${
        location === "/admin" ? "hidden" : "block"
      } w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
    >
      <Wrapper className={`flex h-[60px] items-center justify-between`}>
        <Link href="/" shallow>
          <Image
            priority="false"
            src="/assets/logo.svg"
            alt="logo"
            width={90}
            height={90}
            className="w-[40px] md:w-[60px]"
          />
        </Link>
        <Menu showCatMenu={showCatMenu} setShowCatMenu={setShowCatMenu} />

        {mobileMenu && (
          <MobileMenu
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            setMobileMenu={setMobileMenu}
          />
        )}

        <div className={`flex items-center gap-2 text-black`}>
          <div className="relative md:block hidden">
            {userInfo ? (
              <div className="flex flex-row items-center gap-3 border rounded-full">
                {userInfo?.admin && (
                  <NotyIcon
                    Icon={MdOutlineAdminPanelSettings}
                    data={0}
                    linkJump="/admin"
                  />
                )}
                <NotyIcon
                  Icon={IoMdHeartEmpty}
                  data={wishCounter}
                  cartEmpty={wishCounter > 0 ? false : true}
                  linkJump="/wishlist"
                />
                <NotyIcon
                  Icon={BsCart}
                  data={cartCounter}
                  linkJump="/cart"
                  cartEmpty={cartCounter > 0 ? false : true}
                />
                <div
                  onClick={clickHandler}
                  className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center cursor-pointer hover:bg-black/[0.05] relative "
                >
                  <Avatar src={userInfo?.avatar} />
                </div>
              </div>
            ) : (
              <div className="flex flex-row items-center gap-3">
                <MenuItem onClick={loginModel.onOpen} label="Login" />
                /
                <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
              </div>
            )}
          </div>

          {/* mobile menu */}
          <div
            onClick={() => setMobileMenu(!mobileMenu)}
            className="w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center items-center cursor-pointer hover:bg-black/[0.05] relative"
          >
            {mobileMenu ? (
              <VscChromeClose className="text-[16px]" />
            ) : (
              <BiMenuAltRight className="text-[16px]" />
            )}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Header;
