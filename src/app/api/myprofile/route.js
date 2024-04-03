import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { User } from "../../../../models/user";
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
  await connectDB();

  let user = await User.findById(userId);

  if (!user) {
    return ErrorHandler(400, "Please login first");
  }

  return NextResponse.json({
    success: true,
    user,
  });
});
