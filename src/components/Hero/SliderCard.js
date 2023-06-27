import React from "react";

const SliderCard = ({ image }) => {
  return (
    <div className="">
      <img
        src={`/images/${image}.png`}
        alt=""
        className="w-full h-full object-cover fixed"
      />
      <div className="absolute top-1/3 left-14 space-y-4 z-10">
        <h1 className="text-2xl font-bold capitalize">hot & trend</h1>
        <h1 className="text-5xl font-bold capitalize">Baby kids toys</h1>
        <p className="font-semibold">get up to 30% off from your frist order</p>
        <button className="bg-pink-500 text-white rounded-md px-4 py-2 capitalize hover:bg-pink-600 duration-300">
          get now
        </button>
      </div>
    </div>
  );
};

export default SliderCard;
