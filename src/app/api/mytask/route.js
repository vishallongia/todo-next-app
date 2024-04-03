import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { connectDB } from "../../../../utillis/Feature";
import ErrorHandler, {
  catchAsyncErrors,
} from "../../../../utillis/ErrorHandler";
import { Task } from "../../../../models/task";

export const GET = catchAsyncErrors(async function (NextRequest) {
  const page = Number(NextRequest.nextUrl.searchParams.get("pageno"));

  const perPage = 5; // Number of records per page

  let userId =
    headers().get("set-cookie").split("=")[1].split(";")[0] || undefined;
  if (!userId) {
    return ErrorHandler(401, "Please login first");
  }
  await connectDB();

  const totalRecords = await Task.countDocuments({ user: userId });

  const totalPages = Math.ceil(totalRecords / perPage);

  if (page < 1 || page > totalPages) {
    return ErrorHandler(400, "Invalid page number");
  }

  const skip = (page - 1) * perPage;

  let tasks = await Task.find({ user: userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(perPage);

  return NextResponse.json({
    success: true,
    message: tasks,
    totalRecords,
    totalPages,
    currentPage: page,
  });
});
