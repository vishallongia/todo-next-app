import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { connectDB, getUserIdFromHeaders } from "../../../../utillis/Feature";
import ErrorHandler, {
  catchAsyncErrors,
} from "../../../../utillis/ErrorHandler";
import { Task } from "../../../../models/task";
import mongoose from "mongoose";

export const POST = catchAsyncErrors(async function (NextRequest) {
  let userId = getUserIdFromHeaders();
  const { deleteTaskId } = await NextRequest.json();
  if (!userId) {
    return ErrorHandler(401, "Please login first");
  }
  if (
    !Array.isArray(deleteTaskId) ||
    deleteTaskId.some((id) => !mongoose.isValidObjectId(id))
  ) {
    return ErrorHandler(400, "Invalid deleteTaskId format");
  }
  await connectDB();
  const deletedTasks = await Task.deleteMany({
    user: userId,
    _id: { $in: deleteTaskId },
  });

  if (deletedTasks.deletedCount === 0) {
    return ErrorHandler(404, "No task found");
  }

  return NextResponse.json({
    success: true,
    message: `${deletedTasks.deletedCount} items deleted successfully`,
  });
});
