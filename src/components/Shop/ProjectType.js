import React from "react";

function ProjectType({ types, selectedtype, selectedtypes }) {
  return (
    <div className="flex flex-wrap gap-8 my-14">
      {types.map((item, index) => (
        <button
          onClick={() => selectedtypes(item)}
          className={` font-bold duration-300 ${
            item === selectedtype && "text-[#FF4C60]"
          } hover:text-[#FF4C60]`}
          key={index}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default ProjectType;
