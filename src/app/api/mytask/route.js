import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { connectDB } from "../../../../utillis/Feature";
import ErrorHandler, {
  catchAsyncErrors,
} from "../../../../utillis/ErrorHandler";
import { Task } from "../../../../models/task";

export const GET = catchAsyncErrors(async function (NextRequest) {
  const page = Number(NextRequest.nextUrl.searchParams.get("pageno")) || 1;
  const activeTab = Number(NextRequest.nextUrl.searchParams.get("idx")) || 0;

  const perPage = 5; // Number of records per page
  const currentDate = new Date(); // Get the current date and time
  currentDate.setHours(0, 0, 0, 0); // Set the time to 00:00:00 to represent the start of the current day

  let userId =
    headers().get("set-cookie").split("=")[1].split(";")[0] || undefined;
  if (!userId) {
    return ErrorHandler(401, "Please login first");
  }

  const skip = (page - 1) * perPage;
  let tasks;

  await connectDB();

  if (activeTab === 2) {
    tasks = await Task.find({
      user: userId,
      taskDate: { $gt: currentDate }, // Fetch tasks with taskDate greater than the current date
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage);
  } else if (activeTab === 1) {
    tasks = await Task.find({
      user: userId,
      taskDate: { $lt: currentDate }, // Fetch tasks with taskDate greater than the current date
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage);
  } else {
    tasks = await Task.find({ user: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage);
  }
  const totalRecords = await Task.countDocuments({
    user: userId,
    ...(activeTab === 1
      ? { taskDate: { $lt: currentDate } } // If activeTab is 1, check for taskDate less than currentDate
      : activeTab !== 0
      ? { taskDate: { $gt: currentDate } } // If activeTab is not 0, check for taskDate greater than currentDate
      : {}), // If activeTab is 0, don't apply any additional conditions
  });
  const totalPages = Math.ceil(totalRecords / perPage);
  if (page < 1 || page > totalPages) {
    return ErrorHandler(400, "Invalid page number");
  }

  return NextResponse.json({
    success: true,
    message: tasks,
    totalRecords,
    totalPages,
    currentPage: page,
  });
});
