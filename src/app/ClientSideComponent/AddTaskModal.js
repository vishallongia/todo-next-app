"use client";
import React, { useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { InputGroup, InputRightElement } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@chakra-ui/react";
import { useFormik } from "formik";
import { MdDescription } from "react-icons/md";
import { MdTitle } from "react-icons/md";
import { createTask } from "../../../services/TaskService";
import { UIErrorHandler } from "../../../utillis/UIErrorHandler";
import { UseAppContext } from "./context";

export default function AddTaskModal() {
  const { user } = UseAppContext();
  const OverlayTwo = () => (
    <ModalOverlay
      backdropFilter="auto"
      backdropHueRotate="5"
      backdropBlur="2px"
    />
  );
  const router = useRouter();
  const [overlay, setOverlay] = React.useState(<OverlayTwo />);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated, setIsAuthenticated } = UseAppContext();
  const [dateTimeInputChanger, setDateTimeInputChanger] = useState("");

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const initialValues = {
    title: "",
    description: "",
    taskStartTime: "",
    taskEndTime: "",
    tag: "",
    taskDate: "",
  };

  const validate = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = "Please enter title";
    }
    if (!values.description) {
      errors.description = "Please enter description";
    }
    if (!values.taskStartTime) {
      errors.taskStartTime = "Please enter task start time";
    }
    if (!values.taskEndTime) {
      errors.taskEndTime = "Please enter task end time";
    }
    if (!values.tag) {
      errors.tag = "Please select tag";
    }
    if (!values.taskDate) {
      errors.taskDate = "Please enter task date";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async (values) => {
      const response = await createTask(values);
      const { redirection, success } = UIErrorHandler(response);
      if (redirection && !success) {
        router.push(redirection);
      }
      if (success) {
        onClose();
        // formik.resetForm();
        router.refresh();
      }
    },
  });

  return (
    <>
      <div className="mt-[30px] flex justify-end mb-[15px] sticky top-[10px]">
        <Button
          onClick={() => {
            setOverlay(<OverlayTwo />);
            onOpen();
          }}
          color={"white"}
          background={"#48aae6"}
          fontSize={26}
          fontWeight="md"
          className=" flex items-center px-[22px]  rounded-lg   w-[fit-content] mr-[5px] mt-[5px] font-dhurjati"
        >
          Add Task
        </Button>

        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={() => {
            formik.resetForm();
            onClose();
          }}
          isCentered
          size={"xs"}
        >
          {overlay}
          <form onSubmit={formik.handleSubmit}>
            <ModalContent>
              <ModalHeader>Task Details</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <InputGroup
                  className={
                    formik.touched.title && formik.errors.title
                      ? "mb-[0px]"
                      : "mb-[20px] border-[black]"
                  }
                >
                  <InputRightElement>
                    <MdTitle />
                  </InputRightElement>
                  <Input
                    type="text"
                    placeholder="Title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="title"
                    isInvalid={formik.touched.title && formik.errors.title}
                  />
                </InputGroup>
                {formik.touched.title && formik.errors.title ? (
                  <p className="flex justify-start w-[80%]  pt-[5px] text-[#df4a4a] font-medium mb-[8px]">
                    {formik.errors.title}
                  </p>
                ) : null}
                <InputGroup
                  className={
                    formik.touched.description && formik.errors.description
                      ? "mb-[0px]"
                      : "mb-[20px] border-[black]"
                  }
                >
                  <InputRightElement>
                    <MdDescription />
                  </InputRightElement>
                  <Textarea
                    placeholder="Description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.description && formik.errors.description
                    }
                  />
                </InputGroup>

                {formik.touched.description && formik.errors.description ? (
                  <p className="flex justify-start w-[80%]  pt-[5px] text-[#df4a4a] font-medium  mb-[8px]">
                    {formik.errors.description}
                  </p>
                ) : null}

                <Input
                  size="md"
                  type={
                    dateTimeInputChanger === "taskStartTime" ||
                    formik.values.taskDate
                      ? "time"
                      : "text"
                  }
                  onBlur={(e) => {
                    formik.handleBlur(e);
                    setDateTimeInputChanger("");
                  }}
                  onFocus={() => {
                    setDateTimeInputChanger("taskStartTime");
                  }}
                  placeholder="Task Start Time"
                  name="taskStartTime"
                  value={formik.values.taskStartTime}
                  onChange={formik.handleChange}
                  className={
                    formik.touched.taskStartTime && formik.errors.taskStartTime
                      ? "mb-[0px]"
                      : "mb-[20px] border-[black]"
                  }
                  isInvalid={
                    formik.touched.taskStartTime && formik.errors.taskStartTime
                  }
                />
                {formik.touched.taskStartTime && formik.errors.taskStartTime ? (
                  <p className="flex justify-start w-[80%]  pt-[5px] text-[#df4a4a] font-medium  mb-[8px]">
                    {formik.errors.taskStartTime}
                  </p>
                ) : null}

                <Input
                  size="md"
                  type={
                    dateTimeInputChanger === "taskEndTime" ||
                    formik.values.taskDate
                      ? "time"
                      : "text"
                  }
                  onBlur={(e) => {
                    formik.handleBlur(e);
                    setDateTimeInputChanger("");
                  }}
                  onFocus={() => {
                    setDateTimeInputChanger("taskEndTime");
                  }}
                  placeholder="Task End Time"
                  name="taskEndTime"
                  value={formik.values.taskEndTime}
                  onChange={formik.handleChange}
                  className={
                    formik.touched.taskEndTime && formik.errors.taskEndTime
                      ? "mb-[0px]"
                      : "mb-[20px] border-[black]"
                  }
                  isInvalid={
                    formik.touched.taskEndTime && formik.errors.taskEndTime
                  }
                />
                {formik.touched.taskEndTime && formik.errors.taskEndTime ? (
                  <p className="flex justify-start w-[80%]  pt-[5px] text-[#df4a4a] font-medium mb-[8px]">
                    {formik.errors.taskEndTime}
                  </p>
                ) : null}

                <Input
                  size="md"
                  type={
                    dateTimeInputChanger === "taskDate" ||
                    formik.values.taskDate
                      ? "date"
                      : "text"
                  }
                  onBlur={(e) => {
                    formik.handleBlur(e);
                    setDateTimeInputChanger("");
                  }}
                  onFocus={() => {
                    setDateTimeInputChanger("taskDate");
                  }}
                  placeholder="Task Start Date"
                  name="taskDate"
                  value={formik.values.taskDate}
                  onChange={formik.handleChange}
                  className={
                    formik.touched.taskDate && formik.errors.taskDate
                      ? "mb-[0px]"
                      : "mb-[20px] border-[black] !important"
                  }
                  isInvalid={formik.touched.taskDate && formik.errors.taskDate}
                />

                {formik.touched.taskDate && formik.errors.taskDate ? (
                  <p className="flex justify-start w-[80%]  pt-[5px] text-[#df4a4a] font-medium mb-[8px]">
                    {formik.errors.taskDate}
                  </p>
                ) : null}

                <div className="mb-[20px] relative ">
                  <Select
                    name="tag"
                    value={formik.values.tag}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.tag && formik.errors.tag}
                    placeholder="Please Select Tag"
                    className={
                      formik.touched.tag && formik.errors.tag
                        ? "mb-[0px]"
                        : "border-[black] !important pt-[0px]!important pb-[8px]"
                    }
                  >
                    {user &&
                      user.label.map((labelText) => (
                        <option key={labelText} value={labelText}>
                          {labelText}
                        </option>
                      ))}
                  </Select>
                  {formik.touched.tag && formik.errors.tag ? (
                    <p className="flex justify-start w-[80%]  pt-[5px] text-[#df4a4a] font-medium  mb-[8px]">
                      {formik.errors.tag}
                    </p>
                  ) : null}
                </div>
              </ModalBody>

              <ModalFooter>
                <button
                  type="submit"
                  className=" hover:bg-[#65b1e0] bg-[#48aae6] px-[12px] py-[7px] rounded-md text-[16px] font-semibold text-white mr-[12px]"
                  // onClick={onClose}
                >
                  Create
                </button>
                <Button
                  onClick={() => {
                    formik.resetForm();
                    onClose();
                  }}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>
      </div>
    </>
  );
}
