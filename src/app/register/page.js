"use client";
import React, { useRef } from "react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { FallingLines } from "react-loader-spinner";
import { SiNamecheap } from "react-icons/si";
import { registerUser } from "../../../services/UserService";
import { UIErrorHandler } from "../../../utillis/UIErrorHandler";
import { UseAppContext } from "../ClientSideComponent/context";

export default function page() {
  const { setIsAuthenticated } = UseAppContext();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const showHidePasswordFn = () => {
    setShowPassword(!showPassword);
  };

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Please enter name";
    }
    if (!values.email) {
      errors.email = "Please enter username";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Please enter password";
    } else if (values.password.length < 8) {
      errors.password = "Password is too short";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async (values) => {
      setIsLoading(true);
      const response = await registerUser(values);
      const redirection = UIErrorHandler(response, "/home");
      setIsLoading(false);
      if (redirection) {
        router.push(redirection);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className=" flex items-center justify-center bg-gradient-to-r from-[#0b4f79] to-[#94caeb] h-screen ">
        <div className="w-[90%] text-center rounded-lg  pb-[50px] pt-[50px] bg-[snow]">
          <h1 className="text-[35px] font-bungee font-semibold">Sign Up</h1>
          <p>It's quick and easy</p>
          <div className="flex justify-center mb-[25px] mt-[10px]">
            {" "}
            <FaRegUser size={120} className="" />
          </div>
          <div className="mb-[20px] relative ">
            <input
              type="text"
              className="py-[12px] pl-[12px] pr-[30px] w-[80%]  border-b-2 border-[#48aae6] focus:border-0 focus:bg-[#48aae6] focus:placeholder:text-[snow] focus:text-[snow] text-[18px] font-medium"
              placeholder="Full Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></input>
            <SiNamecheap
              size={20}
              className="absolute right-[12%] top-[16px] cursor-pointer"
            />
            {formik.touched.name && formik.errors.name ? (
              <p className="flex justify-start w-[80%] mx-[auto] pt-[5px] text-[#df4a4a] font-medium">
                {formik.errors.name}
              </p>
            ) : null}
          </div>

          <div className="mb-[20px] relative ">
            <input
              type="text"
              className="py-[12px] pl-[12px] pr-[30px] w-[80%]  border-b-2 border-[#48aae6] focus:border-0 focus:bg-[#48aae6] focus:placeholder:text-[snow] focus:text-[snow] text-[18px] font-medium"
              placeholder="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></input>
            <FaUser
              size={20}
              className="absolute right-[12%] top-[16px] cursor-pointer"
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="flex justify-start w-[80%] mx-[auto] pt-[5px] text-[#df4a4a] font-medium">
                {formik.errors.email}
              </p>
            ) : null}
          </div>
          <div className="my-[20px] relative">
            <input
              type={showPassword ? "text" : "password"}
              className="py-[12px] pl-[12px] pr-[30px] w-[80%]   border-b-2 border-[#48aae6] focus:border-0 focus:outline-0 focus:bg-[#48aae6] focus:placeholder:text-[snow] focus:text-[snow] text-[18px] font-medium"
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></input>
            {showPassword ? (
              <IoMdEye
                size={25}
                className="absolute right-[12%] top-[16px] cursor-pointer"
                onClick={showHidePasswordFn}
              />
            ) : (
              <IoMdEyeOff
                size={25}
                className="absolute right-[12%] top-[16px] cursor-pointer"
                onClick={showHidePasswordFn}
              />
            )}
            {formik.touched.password && formik.errors.password ? (
              <p className="flex justify-start w-[80%] mx-[auto] pt-[5px] text-[#df4a4a] font-medium">
                {formik.errors.password}
              </p>
            ) : null}
          </div>
          <button
            type="submit"
            className="bg-[#48aae6] px-[40px] py-[8px] rounded-lg text-[18px] font-semibold text-white mb-[12px] "
            disabled={isLoading}
          >
            {isLoading ? (
              <FallingLines
                color="white"
                width="25"
                visible={true}
                ariaLabel="falling-circles-loading"
              />
            ) : (
              "Sign Up"
            )}
          </button>
          <p className="mx-[20px]">
            Already have an account ?{" "}
            <Link href="/login" className="text-[#48aae6]">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}
