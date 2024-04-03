import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { connectDB, getUserIdFromHeaders } from "../../../../utillis/Feature";
import ErrorHandler, {
  catchAsyncErrors,
} from "../../../../utillis/ErrorHandler";
import { User } from "../../../../models/user";

export const POST = catchAsyncErrors(async function (NextRequest) {
  let userId = getUserIdFromHeaders();
  const { newLabel } = await NextRequest.json();
  if (!userId) {
    return ErrorHandler(401, "Please login first");
  }

  await connectDB();
  const user = await User.findByIdAndUpdate(
    userId,
    { $push: { label: { $each: newLabel } } },
    { new: true }
  );

  return NextResponse.json({
    success: true,
    message: `Label added successfully`,
  });
});
