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
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);
  await connectDB();

  let user = await User.findById(userId);

  if (!user) {
    return ErrorHandler(400, "Please login first");
  }

  const todayTasks = await Task.find({
    user: userId,
    taskDate: { $gte: startOfToday, $lte: endOfToday },
  });

  return NextResponse.json({
    success: true,
    todayTasks,
  });
});
