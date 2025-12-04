"use client";
import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

const Navbar = () => {
  const { router } = useAppContext();

  const safePush = (path) => {
    if (router && typeof router.push === "function") {
      router.push(path);
    }
  };

  return (
    <div className="flex items-center px-4 md:px-8 py-3 justify-between border-b bg-white">
      {/* Logo */}
      <button
        type="button"
        onClick={() => safePush("/")}
        aria-label="Go to dashboard home"
        className="cursor-pointer"
      >
        <Image
          src={assets.logo}
          alt="Shopping admin logo"
          width={130}
          height={40}
          className="w-28 lg:w-32"
        />
      </button>

      {/* Logout Button */}
      <button
        type="button"
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-gray-700 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
