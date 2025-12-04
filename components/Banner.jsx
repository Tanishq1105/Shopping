import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between md:pl-20 py-10 md:py-0 bg-gradient-to-br from-blue-50 to-indigo-100 my-16 rounded-2xl overflow-hidden shadow-lg">
      
      {/* Left Product Image */}
      <Image
        className="max-w-56 transform hover:scale-105 transition-transform duration-300"
        src={assets.jbl_soundbox_image}
        alt="jbl_soundbox_image"
        width={220}
        height={220}
      />

      {/* Text Section */}
      <div className="flex flex-col items-center justify-center text-center space-y-4 px-6 md:px-0">
        <h2 className="text-2xl md:text-4xl font-bold max-w-[320px] text-gray-900">
          Level Up Your Gaming Experience
        </h2>
        <p className="max-w-[343px] font-medium text-gray-600">
          From immersive sound to precise controls—everything you need to win
        </p>

        <button className="group flex items-center justify-center gap-2 px-12 py-3 bg-orange-600 rounded-full text-white font-semibold hover:bg-orange-700 transition-all shadow-md hover:shadow-xl transform hover:-translate-y-0.5">
          Buy now
          <Image
            className="group-hover:translate-x-1 transition-transform"
            src={assets.arrow_icon_white}
            alt="arrow_icon_white"
            width={18}
            height={18}
          />
        </button>
      </div>

      {/* Large Controller Image (Desktop) */}
      <Image
        className="hidden md:block max-w-80 transform hover:scale-105 transition-transform duration-300"
        src={assets.md_controller_image}
        alt="md_controller_image"
        width={350}
        height={350}
      />

      {/* Small Controller Image (Mobile) */}
      <Image
        className="md:hidden mt-6"
        src={assets.sm_controller_image}
        alt="sm_controller_image"
        width={200}
        height={200}
      />
    </div>
  );
};

export default Banner;
