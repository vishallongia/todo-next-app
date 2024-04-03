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
  const { taskId } = await NextRequest.json();
  if (!userId) {
    return ErrorHandler(401, "Please login first");
  }
  // if (
  //   !Array.isArray(deleteTaskId) ||
  //   deleteTaskId.some((id) => !mongoose.isValidObjectId(id))
  // ) {
  //   return ErrorHandler(400, "Invalid deleteTaskId format");
  // }
  await connectDB();
  const updatedTask = await Task.findOneAndUpdate(
    { _id: taskId }, // Query: find task by its ID
    { isCompleted: true }, // Update: set isCompleted field to true
    { new: true } // Options: return the updated document
  );

  return NextResponse.json({
    success: true,
    message: `Task updated successfully`,
  });
});
