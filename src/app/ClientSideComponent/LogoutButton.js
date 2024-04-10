"use client";
import React, { useEffect } from "react";
import { UIErrorHandler } from "../../../utillis/UIErrorHandler";
import { FaPowerOff } from "react-icons/fa6";
import { logoutUser } from "../../../services/UserService";
import { useRouter } from "next/navigation";
import { UseAppContext } from "./Context";
import AddTaskModal from "./AddTaskModal";

export default function LogoutButton() {
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

  return <FaPowerOff size={30} className="text-[snow]" onClick={logoutFn} />;
}
