import React, { Suspense } from "react";
import AddTaskModal from "../ClientSideComponent/AddTaskModal";
import { FaHome } from "react-icons/fa";
import DateComp from "../ClientSideComponent/DateComp";
import LogoutButton from "../ClientSideComponent/LogoutButton";
import { myTask } from "../../../services/TaskService";
import { cookies } from "next/headers";
import { CgProfile } from "react-icons/cg";
import { TabsDemo } from "../ClientSideComponent/TabsDemo";
import ShowLabel from "../ClientSideComponent/ShowLabel";
import AddLabelModal from "../ClientSideComponent/AddLabelModal";

export default async function page({ searchParams }) {
  const currentPage = searchParams.page || 1;
  const data = await getMyTask(currentPage);

  return (
    <div className="bg-[mintcream] relative min-h-screen">
      <div className="bg-[#48aae6] h-[5px] fixed top-0 left-0 right-0"></div>
      <AddTaskModal />
      {/* <div className="flex justify-center">
        <DateComp></DateComp>
      </div> */}
      <h3 className="flex justify-center text-[60px] font-bold font-dhurjati">
        <span className="text-[#48aae6]">my</span>Todo
      </h3>
      <ShowLabel />
      <AddLabelModal />
      <div>
        {data && (
          <TabsDemo
            data={data}
            totalPages={data.totalPages}
            backendCurrentPage={data.currentPage}
          />
        )}
      </div>
      <div className="bg-[#48aae6] fixed bottom-0 left-0 right-0">
        <div className="flex py-[15px] items-center">
          <button className="basis-[33.3%] flex justify-center">
            <FaHome size={25} className="text-[snow]" />
          </button>
          <button className="basis-[33.3%] flex justify-center">
            <CgProfile size={30} className="text-[snow]" />
          </button>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

// Implement the getServerSideProps function
export async function getMyTask(pageno) {
  // Fetch data from an API or database
  const { value: token } = cookies().get("token") || {};
  const response = await myTask(token, pageno);

  return response;
}
