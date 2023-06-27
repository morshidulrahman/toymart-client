import React from "react";
import Clock from "./Clock";
import { Link } from "react-router-dom";

const Limited = () => {
  return (
    <section className={`bg-[#f6f7f9]`}>
      <div className="container py-10 ">
        <div className="flex md:gap-4 flex-wrap items-center sm:justify-between gap-8 justify-center">
          <div className="text-center sm:text-start">
            <p className="text-black/90 font-semibold capitalize text-xl leading-6">
              Limited offers
            </p>
            <p className="text-black/90 font-semibold mb-2 capitalize text-xl">
              Quality Armchair
            </p>
            <div>
              <Clock />
            </div>
            <button
              className={`text-white bg-gray-800 rounded-sm px-3 py-2 capitalize text-xs font-semibold`}
            >
              Buy Now
            </button>
          </div>
          <img
            src="https://media.istockphoto.com/id/867830532/photo/wooden-toys-on-white-background-3d-rendering.jpg?s=612x612&w=0&k=20&c=nFp5PMl2r5_nC1jjpFRTHqZOd4XnSFHlSu147x7943I="
            alt="img"
            className="w-[30%] hidden sm:flex "
          />
        </div>
      </div>
    </section>
  );
};

export default Limited;
