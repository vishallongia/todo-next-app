"use client";
import React from "react";
import { UseAppContext } from "./context";

export default function ShowLabel() {
  const { user } = UseAppContext();
  return (
    <>
      <div className="flex gap-[10px] ml-[20px] overflow-scroll mb-[10px]">
        {user &&
          user.label.map((labelName, index) => {
            return (
              <button
                key={index} // Using index as the unique key
                className="px-[22px] text-[26px] text-[white] font-medium rounded-lg bg-[#48aae6] w-[fit-content] my-[15px] font-dhurjati"
              >
                {labelName}
              </button>
            );
          })}
      </div>
    </>
  );
}
