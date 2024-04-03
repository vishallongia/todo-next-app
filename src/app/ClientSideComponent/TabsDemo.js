"use client";
import React, { useState, useEffect } from "react";
import { Tabs } from "./Tabs";
import CheckBox from "./CheckBox";
import DeleteButton from "./DeleteButton";
import { FaCalendarAlt } from "react-icons/fa";
import { BiTaskX } from "react-icons/bi";
import { Badge } from "@chakra-ui/react";
import { MdDone } from "react-icons/md";
import PageNavigator from "./Pagination";

export function TabsDemo({ data, totalPages, backendCurrentPage }) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [data]);

  const tabs = [
    {
      title: "All",
      value: "All",
      content: (
        <div className="w-full overflow-hidden relative h-auto rounded-2xl px-2 py-4  text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#0b4f79] to-[#94caeb] mb-[70px]">
          {data && Array.isArray(data.message) && data.message.length > 0 ? (
            <>
              {data.message.map((task) => (
                <div
                  key={task._id}
                  className="flex items-center bg-[#0b4f79] text-white text-[16px] font-mono rounded-lg mx-[10px] py-[15px] font-medium mb-[20px]"
                >
                  <FaCalendarAlt size={40} className="basis-[30%]" />
                  <div className="flex items-center justify-around basis-[60%]">
                    <div className="basis-[70%]">
                      <p>{task.title}</p>
                    </div>
                    <div className="basis-[40%] flex justify-end gap-[10px] items-center">
                      {task.isCompleted ? (
                        <Badge className="py-[5px]">
                          <MdDone size={15} />
                        </Badge>
                      ) : (
                        <CheckBox id={task._id} />
                      )}
                      <DeleteButton id={task._id} />
                    </div>
                  </div>
                </div>
              ))}
              {totalPages !== 1 && (
                <PageNavigator
                  totalPages={totalPages || 1}
                  backendCurrentPage={backendCurrentPage}
                />
              )}
            </>
          ) : (
            <div className="w-[100%] text-center">
              <BiTaskX size={190} className="w-[100%]" />
              <p className="text-center text-[snow] text-lg font-medium text-[22px]">
                No tasks found.
              </p>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Recent",
      value: "Recent",
      content: (
        <div className="w-full overflow-hidden relative h-auto rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#0b4f79] to-[#94caeb]">
          <p>Services tab</p>
        </div>
      ),
    },
    {
      title: "Upcoming",
      value: "Upcoming",
      content: (
        <div className="w-full overflow-hidden relative h-auto rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#0b4f79] to-[#94caeb]">
          <p>Playground tab</p>
        </div>
      ),
    },
  ];

  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto my-10 w-[90%]">
      {/* Pass the key to force re-render of Tabs component */}
      <Tabs tabs={tabs} key={key} className="mb-[80px]" />
    </div>
  );
}
