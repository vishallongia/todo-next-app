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

  if (!taskId) {
    return ErrorHandler(400, "Please provide task id");
  }
  await connectDB();
  const updatedTask = await Task.findOneAndUpdate(
    { _id: taskId }, // Query: find task by its ID
    { isCompleted: true }, // Update: set isCompleted field to true
    { new: true } // Options: return the updated document
  );

  if (!updatedTask) {
    return ErrorHandler(400, "Task id not found");
  }

  return NextResponse.json({
    success: true,
    message: `Task updated successfully`,
  });
});
