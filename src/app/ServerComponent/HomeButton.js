import React from "react";
import Link from "next/link";
export default function HomeButton() {
  return (
    <div className="text-center">
      <div>
        <Link href="/login">
          <button className="px-[80px] py-[8px] text-[18px] text-[#48aae6] font-bold border-2 border-solid rounded-full border-[#48aae6]  bg-[white] w-[fit-content] my-[15px]">
            Sign in
          </button>
        </Link>
      </div>

      <div>
        <Link href="/register">
          <button className="px-[50px] py-[8px] text-[18px] text-[white] font-bold  rounded-full   bg-[#48aae6] w-[fit-content] my-[15px]">
            Create Account
          </button>
        </Link>
      </div>
    </div>
  );
}
