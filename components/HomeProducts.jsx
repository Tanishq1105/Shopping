"use client";
import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";

const HomeProducts = () => {
  const { products = [], router } = useAppContext();

  const safePush = (path) => {
    if (router && typeof router.push === "function") {
      router.push(path);
    }
  };

  return (
    <div className="flex flex-col items-center pt-14 px-4">
      <p className="text-2xl font-medium w-full">Popular Products</p>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id || product.name} product={product} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No products available.
          </p>
        )}
      </div>

      {/* See More Button */}
      <button
        type="button"
        onClick={() => safePush("/all-products")}
        className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50 transition"
      >
        See more
      </button>
    </div>
  );
};

export default HomeProducts;
