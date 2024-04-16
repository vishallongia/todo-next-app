import React, { Suspense } from "react";
import { FaHome } from "react-icons/fa";
import DateComp from "../ClientSideComponent/DateComp";
import LogoutButton from "../ClientSideComponent/LogoutButton";
import { myTask, todayTasks } from "../../../services/TaskService";
import { cookies } from "next/headers";
import { TabsDemo } from "../ClientSideComponent/TabsDemo";
import ShowLabel from "../ClientSideComponent/ShowLabel";
import AddLabelModal from "../ClientSideComponent/AddLabelModal";
import ProfileDrawer from "../ClientSideComponent/ProfileDrawer";
import TodayTaskSlider from "../ClientSideComponent/TodayTaskSlider";
import TaskOptionDialer from "../ClientSideComponent/TaskOptionDialer";
import { getHostNameUrl } from "../../../utillis/Feature";
export default async function Page({ searchParams }) {
  const currentPage = searchParams.page || 1;
  const currentTab = searchParams.idx;
  const hostName = getHostNameUrl();
  const data = await getMyTask(currentPage, currentTab, hostName);
  const todayTasksData = await getTodayTask(hostName);
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
      <TodayTaskSlider todayTasksData={todayTasksData} />
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

export async function getMyTask(pageno, currentTab, hostName) {
  const { value: token } = cookies().get("token") || {};
  const response = await myTask(token, pageno, currentTab, hostName);
  return response;
}

export async function getTodayTask(hostName) {
  const { value: token } = cookies().get("token") || {};
  const response = await todayTasks(token, hostName);
  return response;
}
