"use client";
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";

const Product = () => {
  const { id } = useParams();
  const { products = [], router, addToCart } = useAppContext();

  const [mainImage, setMainImage] = useState(null);
  const [productData, setProductData] = useState(null);

  const safePush = (path) => {
    if (router && typeof router.push === "function") {
      router.push(path);
    } else if (typeof window !== "undefined") {
      window.location.href = path;
    }
  };

  // find product by id whenever products or id change
  useEffect(() => {
    if (!id || !Array.isArray(products) || products.length === 0) {
      setProductData(null);
      return;
    }
    const found = products.find((p) => String(p._id) === String(id));
    setProductData(found ?? null);
  }, [id, products]);

  // set initial main image when product loads
  useEffect(() => {
    if (productData && Array.isArray(productData.image) && productData.image.length > 0) {
      setMainImage(productData.image[0]);
    } else {
      setMainImage(null);
    }
  }, [productData]);

  // If still resolving product list, show loading
  if (!productData && (!products || products.length === 0)) {
    return <Loading />;
  }

  // If product not found (products loaded but id invalid)
  if (!productData) {
    return (
      <>
        <Navbar />
        <main className="px-6 md:px-16 lg:px-32 pt-14">
          <div className="py-20 text-center">
            <h2 className="text-2xl font-semibold">Product not found</h2>
            <p className="text-gray-500 mt-2">The product you are looking for does not exist.</p>
            <button
              type="button"
              onClick={() => safePush("/all-products")}
              className="mt-6 px-6 py-2 bg-orange-600 text-white rounded"
            >
              Browse products
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // productData is available here
  return (
    <>
      <Navbar />
      <main className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Images */}
          <div className="px-5 lg:px-16 xl:px-20">
            <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
              <Image
                src={mainImage || productData.image?.[0] || assets.logo}
                alt={productData.name || "Product image"}
                className="w-full h-auto object-cover mix-blend-multiply"
                width={1280}
                height={720}
                priority
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {(Array.isArray(productData.image) ? productData.image : []).map((image, index) => (
                <button
                  key={image ?? index}
                  type="button"
                  onClick={() => setMainImage(image)}
                  className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10 p-0"
                  aria-label={`Show image ${index + 1}`}
                >
                  <Image
                    src={image || assets.logo}
                    alt={`${productData.name} thumbnail ${index + 1}`}
                    className="w-full h-auto object-cover mix-blend-multiply"
                    width={320}
                    height={180}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-medium text-gray-800/90 mb-4">{productData.name}</h1>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <Image src={assets.star_icon} alt="star" width={16} height={16} />
                <Image src={assets.star_icon} alt="star" width={16} height={16} />
                <Image src={assets.star_icon} alt="star" width={16} height={16} />
                <Image src={assets.star_icon} alt="star" width={16} height={16} />
                <Image src={assets.star_dull_icon} alt="star dull" width={16} height={16} />
              </div>
              <p className="text-sm text-gray-600">(4.5)</p>
            </div>

            <p className="text-gray-600 mt-3">{productData.description}</p>

            <p className="text-3xl font-medium mt-6">
              ₹{productData.offerPrice}
              <span className="text-base font-normal text-gray-800/60 line-through ml-2">
                ₹{productData.price}
              </span>
            </p>

            <hr className="bg-gray-200 my-6" />

            <div className="overflow-x-auto">
              <table className="table-auto border-collapse w-full max-w-72">
                <tbody>
                  <tr>
                    <td className="text-gray-600 font-medium py-1">Brand</td>
                    <td className="text-gray-800/50 py-1">Generic</td>
                  </tr>
                  <tr>
                    <td className="text-gray-600 font-medium py-1">Color</td>
                    <td className="text-gray-800/50 py-1">Multi</td>
                  </tr>
                  <tr>
                    <td className="text-gray-600 font-medium py-1">Category</td>
                    <td className="text-gray-800/50 py-1">{productData.category}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center mt-10 gap-4">
              <button
                type="button"
                onClick={() => {
                  if (typeof addToCart === "function") addToCart(productData._id);
                }}
                className="w-full py-3.5 bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition rounded"
                aria-label="Add to cart"
              >
                Add to Cart
              </button>

              <button
                type="button"
                onClick={() => {
                  if (typeof addToCart === "function") addToCart(productData._id);
                  safePush("/cart");
                }}
                className="w-full py-3.5 bg-orange-500 text-white hover:bg-orange-600 transition rounded"
                aria-label="Buy now"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>

        {/* Featured */}
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center mb-4 mt-16">
            <p className="text-3xl font-medium">
              Featured <span className="font-medium text-orange-600">Products</span>
            </p>
            <div className="w-28 h-0.5 bg-orange-600 mt-2" />
          </div>

          <div className="w-full">
            {Array.isArray(products) && products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14">
                {products.slice(0, 5).map((p) => (
                  <ProductCard key={p._id ?? p.name} product={p} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">No featured products available.</p>
            )}
          </div>

          <button
            type="button"
            onClick={() => safePush("/all-products")}
            className="px-8 py-2 mb-16 border rounded text-gray-500/70 hover:bg-slate-50/90 transition"
          >
            See more
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Product;
