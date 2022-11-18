import React from "react";

const Chip = ({ action, text }) => {
  return (
    <div className="h-[3.6rem]  rounded-[24px] border border-green-400 bg-[#F0FBFF] flex items-center justify-between px-[16px] py-[8px] body_heavy ">
      <span className="mr-[1.4rem] text-black">{text}</span>{" "}
      <span
        onClick={() => {
          action();
        }}
        className=" cursor-pointer"
      >
        🗙
      </span>
    </div>
  );
};

export default Chip;