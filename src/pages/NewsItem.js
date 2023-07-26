import Image from "next/image";
import Link from "next/link";
import React from "react";

const NewsItem = ({ title, backgroundImg }) => {
  return (
    <div className="relative flex items-center justify-center h-auto w-full shadow-xl shadow-gray-400 rounded-xl group hover:bg-gradient-to-r from-[#F5F5DC] to-[#666362]">
      <img
        className="rounded-xl group-hover:opacity-10"
        src={backgroundImg}
        alt="/"
      />
      <div className="hidden group-hover:block absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] overflow-wrap: break-word;">
        <h3 className="text-2xl text-black font-bold tracking-wider text-center">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default NewsItem;
