"use client";
import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[70vh]">
      <div
        role="status"
        className="animate-spin rounded-full h-20 w-20 border-4 border-gray-200 border-t-orange-500"
      ></div>
    </div>
  );
};

export default Loading;
