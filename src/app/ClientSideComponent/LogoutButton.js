"use client";
import React, { useEffect } from "react";
import { UIErrorHandler } from "../../../utillis/UIErrorHandler";
import { FaPowerOff } from "react-icons/fa6";
import { logoutUser } from "../../../services/UserService";
import { useRouter } from "next/navigation";
import { UseAppContext } from "./context";
import AddTaskModal from "./AddTaskModal";

export default function logoutButton() {
  const { isAuthenticated } = UseAppContext();

  const router = useRouter();

  const logoutFn = async () => {
    const response = await logoutUser();
    const { redirection, success } = UIErrorHandler(response, "/login");
    if (redirection) {
      router.push(redirection);
    }
  };

  // if (!isAuthenticated) {
  //   router.push("/login");
  // }

  return (
    <button className="basis-[33.3%] flex justify-center">
      <FaPowerOff size={25} className="text-[snow]" onClick={logoutFn} />
    </button>
  );
}
