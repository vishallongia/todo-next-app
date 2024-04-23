"use client";
import React from "react";
import { Toolbar } from "primereact/toolbar";
import { Avatar } from "primereact/avatar";
import AddTaskModal from "./AddTaskModal";
import AddLabelModal from "./AddLabelModal";
import { UseAppContext } from "./Context";

export default function TaskOptionDialer() {
  const { user } = UseAppContext();
  const startContent = <></>;

  const centerContent = (
    <>
      <div className="flex flex-wrap align-items-center gap-[40px]">
        <AddTaskModal />
        <AddLabelModal />
      </div>
    </>
  );

  const endContent = (
    <React.Fragment>
      <div className="flex align-items-center gap-2">
        <Avatar image={user.avatar} shape="circle" className="w-[50px]" />
        <span className="font-bold mt-[5px] text-white">{user.name}</span>
      </div>
    </React.Fragment>
  );

  return (
    <div className="card sticky top-[8px] z-[10] mb-[10px] px-[20px]">
      <Toolbar
        start={startContent}
        center={centerContent}
        end={endContent}
        className="bg-[#0b4f79] shadow-md shadow-[black]"
        style={{
          borderRadius: "3rem",
        }}
      />
    </div>
  );
}
