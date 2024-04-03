// api > hello > route.ts
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Task } from "../../../../models/task";
import { connectDB } from "../../../../utillis/Feature";
import ErrorHandler, {
  catchAsyncErrors,
} from "../../../../utillis/ErrorHandler";

export const POST = catchAsyncErrors(async function (NextRequest) {
  //Getting Login User id
  const userId =
    headers().get("set-cookie").split("=")[1].split(";")[0] || undefined;
  const { title, description, taskStartTime, taskEndTime, tag, taskDate } =
    await NextRequest.json();

  if (!userId) {
    return ErrorHandler(401, "Please login first");
  }

  if (!title) {
    return ErrorHandler(400, "Please provide title of task");
  }

  if (!description) {
    return ErrorHandler(400, "Please provide description of task");
  }
  if (!taskDate) {
    return ErrorHandler(400, "Please provide task date");
  }
  if (!taskStartTime) {
    return ErrorHandler(400, "Please provide task start time");
  }
  if (!taskEndTime) {
    return ErrorHandler(400, "Please provide task end time");
  } else {
    await connectDB();
    const data = await Task.create({
      title,
      description,
      user: userId,
      taskStartTime,
      taskEndTime,
      tag,
      taskDate,
    });
    return NextResponse.json({
      success: true,
      data,
      message: "Task Created Successfully",
    });
  }
});
