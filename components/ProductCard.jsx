import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

const ProductCard = ({ product }) => {
  const { currency, router } = useAppContext();

  const rating = product.rating ?? 4.5;
  const fullStars = Math.floor(rating);

  return (
    <div
      onClick={() => {
        router.push("/product/" + product._id);
        if (typeof window !== "undefined") {
          window.scrollTo(0, 0);
        }
      }}
      className="flex flex-col items-start gap-1 max-w-[200px] w-full cursor-pointer group"
    >
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl w-full h-52 flex items-center justify-center overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
        <Image
          src={product.image[0]}
          alt={product.name}
          className="group-hover:scale-110 transition-transform duration-500 object-cover w-4/5 h-4/5 md:w-full md:h-full"
          width={800}
          height={800}
        />

        <button
          type="button"
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-lg hover:bg-red-50 hover:scale-110 transition-all duration-200"
          onClick={(e) => {
            e.stopPropagation(); // prevent triggering the card click
            // handle wishlist here if you have logic
          }}
        >
          <Image
            src={assets.heart_icon}
            alt="Add to wishlist"
            width={14}
            height={14}
            className="h-3.5 w-3.5"
          />
        </button>
      </div>

      <p className="md:text-base font-semibold pt-3 w-full truncate text-gray-900">
        {product.name}
      </p>

      <p className="w-full text-xs text-gray-500 max-sm:hidden truncate">
        {product.description}
      </p>

      <div className="flex items-center gap-2 mt-1">
        <p className="text-xs font-medium text-gray-700">
          {rating.toFixed(1)}
        </p>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Image
              key={index}
              src={index < fullStars ? assets.star_icon : assets.star_dull_icon}
              alt="star_icon"
              width={12}
              height={12}
              className="h-3 w-3"
            />
          ))}
        </div>
      </div>

      <div className="flex items-end justify-between w-full mt-2">
        <p className="text-lg font-bold text-orange-600">
          {currency}
          {product.offerPrice}
        </p>
        <button
          type="button"
          className="max-sm:hidden px-4 py-1.5 text-gray-700 border-2 border-gray-200 rounded-full text-xs hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all duration-200 font-medium"
          onClick={(e) => {
            e.stopPropagation();
            router.push("/product/" + product._id);
            if (typeof window !== "undefined") {
              window.scrollTo(0, 0);
            }
          }}
        >
          Buy now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
