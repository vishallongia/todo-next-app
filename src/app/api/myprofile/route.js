import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { User } from "../../../../models/user";
import { Task } from "../../../../models/task";
import { connectDB } from "../../../../utillis/Feature";
import ErrorHandler, {
  catchAsyncErrors,
} from "../../../../utillis/ErrorHandler";

export const GET = catchAsyncErrors(async function (NextRequest) {
  let userId =
    headers().get("set-cookie").split("=")[1].split(";")[0] || undefined;
  if (!userId) {
    return ErrorHandler(401, "Please login first");
  }
  const currentDate = new Date(); // Get the current date and time
  currentDate.setHours(0, 0, 0, 0); // Set the time to 00:00:00 to represent the start of the current day
  await connectDB();

  let user = await User.findById(userId);

  if (!user) {
    return ErrorHandler(400, "Please login first");
  }
  const totalTasks = await Task.countDocuments({ user: userId });
  const completedTask = await Task.countDocuments({
    user: userId,
    isCompleted: true,
  });
  const failedTask = await Task.countDocuments({
    user: userId,
    isCompleted: false,
    taskDate: { $lt: currentDate },
  });

  user = {
    ...user.toObject(), // Convert Mongoose user object to plain JavaScript object
    totalTasks,
    completedTask,
    failedTask,
  };

  return NextResponse.json({
    success: true,
    user,
  });
});
