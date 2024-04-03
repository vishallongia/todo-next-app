import { NextRequest, NextResponse } from "next/server";
import { User } from "../../../../models/user";
import {
  connectDB,
  cookieSetter,
  tokenGenrator,
} from "../../../../utillis/Feature";
import ErrorHandler, {
  catchAsyncErrors,
} from "../../../../utillis/ErrorHandler";
import bcrypt from "bcrypt";

export const POST = catchAsyncErrors(async function (NextRequest) {
  const { email, password } = await NextRequest.json();

  if (!email) {
    return ErrorHandler(400, "Please provide email of user");
  }

  if (!password) {
    return ErrorHandler(400, "Please provide password of user");
  }
  await connectDB();

  let user = await User.findOne({ email }).select("+password");

  if (!user) {
    return ErrorHandler(400, "Invalid email or password");
  }

  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    return ErrorHandler(400, "Invalid email or password");
  }

  const token = await tokenGenrator(user._id);
  await cookieSetter(token, true, null);

  return NextResponse.json({
    success: true,
    message: `Welcome back , ${user.name}`,
    user,
  });
});
