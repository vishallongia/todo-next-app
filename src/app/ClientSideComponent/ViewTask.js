"use client";
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { TiEye } from "react-icons/ti";
import { Badge } from "primereact/badge";

export default function ViewTask({ taskDetails }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0);
  const isPending =
    new Date(taskDetails.taskDate) > currentDate && !taskDetails.isCompleted;
  const isFailed =
    !(new Date(taskDetails.taskDate) > currentDate) && !taskDetails.isCompleted;
  const isSuccess = !isPending && !isFailed && taskDetails.isCompleted;

  return (
    <>
      <TiEye
        size={32}
        className="text-[white] cursor-pointer hover:opacity-75"
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"xs"}>
        <ModalOverlay />
        <ModalContent className="rounded-lg">
          <ModalHeader className="bg-[#48aae6] text-white">
            Task Detail
          </ModalHeader>
          <ModalCloseButton className="text-white" />
          <ModalBody>
            <div className="p-4 rounded-lg shadow-md shadow-black mt-[20px] bg-[#0b4f79]">
              <p className="font-semibold text-white">Title</p>
              <p className="text-white">{taskDetails.title}</p>
              <p className="font-semibold mt-4 text-white">Tag</p>
              <p className="text-white">{taskDetails.tag}</p>
              <p className="font-semibold mt-4 text-white">Description</p>
              <p className="text-white">{taskDetails.description}</p>
              <p className="font-semibold mt-4 text-white">Start Time</p>
              <p className="text-white">{taskDetails.taskStartTime}</p>
              <p className="font-semibold mt-4 text-white">End Time</p>
              <p className="text-white">{taskDetails.taskEndTime}</p>
              <p className="font-semibold mt-4 text-white">Date</p>
              <p className="text-white">
                {new Date(taskDetails.taskDate).toDateString()}
              </p>
              <p className="font-semibold mt-4 text-white">Status</p>
              {isPending && <Badge value="Pending" severity="warning" />}
              {isFailed && <Badge value="Failed" severity="danger" />}
              {isSuccess && <Badge value="Success" severity="success" />}
            </div>
          </ModalBody>

          <ModalFooter className=""></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
