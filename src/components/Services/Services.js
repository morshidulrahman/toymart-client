import React from "react";
import { ServicesData } from "../../data/Data";

const Services = () => {
  return (
    <section className="py-10">
      <div className="flex justify-between flex-wrap container">
        {ServicesData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center w-full md:w-[20%] border border-gray-100 space-y-2 rounded-md shadow-sm py-5 md:gap-0 gap-4"
          >
            <img src={item.img} alt={item.title} />
            <h2 className="font-bold text-lg capitalize">{item.title}</h2>
            <p className="text-gray-600 capitalize font-semibold">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
