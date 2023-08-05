"use client";

import Link from "next/link";
import React from "react";
import { BsChevronDown } from "react-icons/bs";

const data = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "About", url: "/" },
  { id: 3, name: "Categories", subMenu: true },
  { id: 4, name: "Contact", url: "/" },
];

const subMenuData = [
  { id: 1, name: "Jordan", path: "jordan" },
  { id: 2, name: "Sneakers", path: "sneakers" },
  { id: 3, name: "Running shoes", path: "running" },
  { id: 4, name: "Football shoes", path: "football" },
];

const Menu = ({ showCatMenu, setShowCatMenu }) => {
  return (
    <div className="hidden md:flex items-center gap-8 font-medium text-black relative">
      {data.map((item, index) => (
        <div key={`menu_${item.id}`} className="">
          {!!item?.subMenu ? (
            <div
              className="cursor-pointer flex gap-2 font-medium text-black"
              onMouseEnter={() => setShowCatMenu(true)}
              onMouseLeave={() => setShowCatMenu(false)}
            >
              {item.name}
              <BsChevronDown size={14} />
              {showCatMenu && (
                <div className="bg-white absolute top-6 gap-0 min-w-[250px] px-1 py-1 text-black shadow-lg rounded-sm">
                  {subMenuData?.map((categoriesData, index) => (
                    <Link
                      key={`subMenu_${index}`}
                      href={`/category/${categoriesData.path}`}
                      onClick={() => setShowCatMenu(false)}
                    >
                      <div className="h-12 flex justify-between items-center px-3 hover:bg-black/[0.03]">
                        {categoriesData?.name}
                        {/* <span className="opacity-50 text-sm">{`(${categoriesData.doc_count})`}</span> */}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="cursor-pointer">
              <Link href={item.url}>{item.name}</Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Menu;
