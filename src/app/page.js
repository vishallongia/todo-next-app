import HomeButton from "./ServerComponent/HomeButton";
export default function Home() {
  return (
    <>
      <div className="">
        <div className="bg-[#48aae6] h-[5px] fixed top-0 left-0 right-0"></div>
        <div className="flex  bg-[#F3F2F2]">
          <div className="w-[100%] text-center py-[80px] ">
            <h1 className="font-bungee text-[50px] font-extrabold text-[#48aae6]">
              TODO.
            </h1>
            <h1 className="font-bungee text-[50px] font-extrabold text-[#48aae6]">
              Next App
            </h1>
          </div>
        </div>
        <div className="bg-[#48aae6] rounded-lg mx-[25px] p-[18px] mt-[15px] mb-[10px]">
          <span>
            <h1 className="flex justify-center text-[28px] text-[white] font-extrabold font-bungee mb-[5px] ">
              Why Us ?{" "}
            </h1>
          </span>
          <p className=" text-[28px] my-[15px] font-dhurjati font-medium  text-white  ">
            TODO Next App help you set up your work and keep track of tasks. A
            good digital to-do list makes it easier to get work done and makes
            it harder to miss deadlines.
          </p>
        </div>
        <HomeButton />
        <div className="bg-[#48aae6] h-[5px] mt-[15px] fixed bottom-0 left-0 right-0"></div>
      </div>
    </>
  );
}
