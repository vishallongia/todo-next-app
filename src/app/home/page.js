import React, { Suspense } from "react";
import AddTaskModal from "../ClientSideComponent/AddTaskModal";
import { FaHome } from "react-icons/fa";
import DateComp from "../ClientSideComponent/DateComp";
import LogoutButton from "../ClientSideComponent/LogoutButton";
import { myTask } from "../../../services/TaskService";
import { cookies } from "next/headers";
import { TabsDemo } from "../ClientSideComponent/TabsDemo";
import ShowLabel from "../ClientSideComponent/ShowLabel";
import AddLabelModal from "../ClientSideComponent/AddLabelModal";
import ProfileDrawer from "../ClientSideComponent/ProfileDrawer";
import TodayTaskSlider from "../ClientSideComponent/TodayTaskSlider";
import TaskOptionDialer from "../ClientSideComponent/TaskOptionDialer";
export default async function page({ searchParams }) {
  const currentPage = searchParams.page || 1;
  const currentTab = searchParams.idx;
  const data = await getMyTask(currentPage, currentTab);
  return (
    <div className="bg-[mintcream] relative min-h-screen">
      <div className="bg-[#48aae6] h-[5px] fixed top-0 left-0 right-0"></div>

      <h3 className="flex justify-center text-[60px] font-bold font-dhurjati mb-[30px]">
        <span className="text-[#48aae6]">my</span>Todo
      </h3>
      <TaskOptionDialer className="sticky top-[12px]" />
      {/* <AddTaskModal /> */}
      {/* <div className="flex justify-center">
        <DateComp></DateComp>
      </div> */}

      <h3 className="flex justify-center text-[45px] font-bold font-dhurjati mb-[15px]">
        <span className="text-[#48aae6]">Today&apos;s</span>&nbsp;Tasks
      </h3>
      <TodayTaskSlider />
      {/* <ShowLabel />
      <AddLabelModal /> */}
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
        <div className="flex py-[15px] items-center w-[100%] justify-around">
          <ProfileDrawer />
          <FaHome size={30} className="text-[snow]" />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

// Implement the getServerSideProps function
export async function getMyTask(pageno, currentTab) {
  // Fetch data from an API or database
  const { value: token } = cookies().get("token") || {};
  const response = await myTask(token, pageno, currentTab);
  return response;
}
