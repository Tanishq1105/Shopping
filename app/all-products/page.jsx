"use client";
import React from "react";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

const AllProducts = () => {
  const { products } = useAppContext();
  const productsArr = Array.isArray(products) ? products : [];

  return (
    <>
      <Navbar />

      <main className="flex flex-col items-start px-6 md:px-16 lg:px-32">
        <header className="w-full flex flex-col items-start pt-12">
          <p className="text-2xl font-medium">All products</p>
          <div className="w-16 h-0.5 bg-orange-600 rounded-full mt-2" />
        </header>

        <section className="w-full mt-12 pb-14">
          {productsArr.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {productsArr.map((product) => (
                <ProductCard key={product._id ?? product.name} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center w-full">
              <p className="text-gray-500">No products available right now.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default AllProducts;
