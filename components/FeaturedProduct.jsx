import React from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";

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

export default function FeaturedProduct() {
  return (
    <section className="mt-16">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Products</h2>
        <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mt-3 rounded-full" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mt-14 md:px-14 px-4">

        {products.map(({ id, image, title, description }) => (
          <article
            key={id}
            className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            {/* make the image fill the card - Next/Image requires width/height or `fill` */}
          
            <div className="w-full">
               <Image
                 src={image}
                 alt={title}
                 width={1200}   // pick sensible values
                 height={800}   // 4:3
                 sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                 className="object-cover w-full h-auto"
                />
            </div>


            <div className="absolute bottom-6 left-6 text-white space-y-3 max-w-[15rem]">
              <h3 className="font-bold text-xl lg:text-2xl drop-shadow-lg">{title}</h3>
              <p className="text-sm lg:text-base leading-6 drop-shadow-md">{description}</p>
              <button
                type="button"
                className="inline-flex items-center gap-2 bg-orange-600 px-4 py-2 rounded-full hover:bg-orange-700 transition-colors font-semibold shadow-lg"
              >
                Buy now
                {/* small decorative icon - provide explicit width/height to satisfy next/image */}
                <Image src={assets.redirect_icon} alt="redirect" width={14} height={14} />
              </button>
            </div>

            {/* Optional overlay for better text readability */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </article>
        ))}
      </div>
    </section>
  );
}
