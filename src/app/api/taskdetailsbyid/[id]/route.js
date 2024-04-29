import { NextRequest, NextResponse } from "next/server";
import { User } from "../../../../../models/user";
import { Task } from "../../../../../models/task";
import { connectDB } from "../../../../../utillis/Feature";
import ErrorHandler, {
  catchAsyncErrors,
} from "../../../../../utillis/ErrorHandler";
import { getUserIdFromHeaders } from "../../../../../utillis/Feature";

export const GET = catchAsyncErrors(async function (NextRequest, { params }) {
  const { id } = params;
  let userId = getUserIdFromHeaders();

  if (!userId) {
    return ErrorHandler(401, "Please login first");
  }

  await connectDB();

  let user = await User.findById(userId);

  if (!user) {
    return ErrorHandler(400, "Please login first");
  }

  const taskDetails = await Task.findById({ _id: id });

  return NextResponse.json({
    success: true,
    taskDetails,
  });
});
