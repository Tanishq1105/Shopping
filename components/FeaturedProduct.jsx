import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const products = [
  {
    id: 1,
    image: assets.girl_with_headphone_image,
    title: "Unparalleled Sound",
    description: "Experience crystal-clear audio with premium headphones.",
  },
  {
    id: 2,
    image: assets.girl_with_earphone_image,
    title: "Stay Connected",
    description: "Compact and stylish earphones for every occasion.",
  },
  {
    id: 3,
    image: assets.boy_with_laptop_image,
    title: "Power in Every Pixel",
    description: "Shop the latest laptops for work, gaming, and more.",
  },
];

const FeaturedProduct = () => {
  return (
    <div className="mt-16">
      <div className="flex flex-col items-center">
        <p className="text-3xl md:text-4xl font-bold text-gray-900">Featured Products</p>
        <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mt-3 rounded-full" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mt-14 md:px-14 px-4">
        {products.map(({ id, image, title, description }) => (
          <div
            key={id}
            className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Image wrapper: required for Image fill */}
            <div className="relative w-full h-56 sm:h-64 md:h-72 lg:h-80">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover group-hover:brightness-75 group-hover:scale-110 transition-all duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={false}
              />
            </div>

            {/* Overlay (text + button) */}
            <div className="absolute bottom-6 left-6 right-6 md:left-8 md:right-auto text-white space-y-3">
              <p className="font-bold text-xl lg:text-2xl drop-shadow-lg">{title}</p>
              <p className="text-sm lg:text-base leading-6 max-w-60 drop-shadow-md">
                {description}
              </p>

              <button
                aria-label={`Buy now - ${title}`}
                className="flex items-center gap-2 bg-orange-600 px-5 py-2.5 rounded-full hover:bg-orange-700 transition-colors font-semibold shadow-lg"
              >
                <span>Buy now</span>
                <Image
                  src={assets.redirect_icon}
                  alt="redirect icon"
                  width={14}
                  height={14}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
