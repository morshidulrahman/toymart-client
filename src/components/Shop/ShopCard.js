import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authcontext } from "../Provider/AuthProvider";
import { toast } from "react-hot-toast";
const ShopCard = ({ menu }) => {
  const navigate = useNavigate();
  const { user } = useContext(Authcontext);

  const navigationhandeler = (id) => {
    if (!user) {
      toast.error("You have to log in first to view details");
    } else {
      navigate(`/toys/${id}`);
    }
  };
  return (
    <>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 items-center">
        {menu.map((item, index) => (
          <div
            key={index}
            className="w-full border border-gray-200 rounded-lg shadow  bg-[#f6f7f9]"
          >
            <img
              className="p-8 rounded-t-lg  md:w-[450px] w-full h-[400px] md:h-[320px] rounded-md object-cover "
              loading="lazy"
              src={item.picture}
              alt="product image"
            />
            <div className="px-5 pb-5">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 ">
                {item.name}
              </h5>

              <div className="flex items-center mt-2.5 mb-5">
                {Array.from({ length: item.rating }, (_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 fill-current text-yellow-500"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 1.5L12.63 6.59L18 7.36L14.47 11.35L15.41 16.19L10 13.77L4.59 16.19L5.53 11.35L2 7.36L7.37 6.59L10 1.5Z" />
                  </svg>
                ))}
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                  {item.rating}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 ">
                  $ {item.price}
                </span>
                <button
                  onClick={() => navigationhandeler(item._id)}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ShopCard;
