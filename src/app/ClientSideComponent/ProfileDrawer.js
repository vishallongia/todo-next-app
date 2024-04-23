"use client";
import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { Avatar } from "primereact/avatar";
import { UseAppContext } from "./Context";
import { Knob } from "primereact/knob";

export default function ProfileDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = UseAppContext();

  return (
    <>
      <CgProfile color="white" onClick={onOpen} size={25} />

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader className="bg-[lightcyan]">User Profile</DrawerHeader>
          <DrawerBody className="bg-[#48aae6] ">
            <div className="text-center">
              <Avatar
                image={user.avatar}
                shape="circle"
                className="w-[60%] mt-[90px]"
              />
            </div>
            <span className=" text-[24px] text-white flex justify-center mb-[20px] font-bungee">
              {user.name}
            </span>

            <Knob
              value={user.totalTasks}
              className="flex justify-center"
              max={user.totalTasks || 1}
              valueColor="#0b4f79"
              textColor="snow"
              rangeColor="snow"
            />
            <span className="text-[20px] text-white flex justify-center mb-[20px] font-semibold">
              Total Tasks
            </span>

            <Knob
              value={user.completedTask}
              className="flex justify-center"
              max={user.totalTasks || 1}
              valueColor="#0b4f79"
              textColor="snow"
              rangeColor="snow"
            />
            <span className="text-[20px] text-white flex justify-center mb-[20px] font-semibold">
              Completed Tasks
            </span>

            <Knob
              value={user.failedTask}
              className="flex justify-center"
              max={user.totalTasks || 1}
              valueColor="#0b4f79"
              textColor="snow"
              rangeColor="snow"
            />
            <span className="text-[20px] text-white flex justify-center mb-[20px] font-semibold">
              Failed Tasks
            </span>

            <Knob
              value={user.totalTasks - user.completedTask - user.failedTask}
              className="flex justify-center bg-snow"
              max={user.totalTasks || 1}
              valueColor="#0b4f79"
              textColor="snow"
              rangeColor="snow"
            />
            <span className="text-[20px] text-white flex justify-center mb-[20px] font-semibold">
              Pending Tasks
            </span>
          </DrawerBody>
          {/* <DrawerFooter className=""></DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </>
  );
}
