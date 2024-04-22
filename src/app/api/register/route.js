// api > hello > route.ts
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
  const { name, email, password, avatar } = await NextRequest.json();

  if (!name) {
    return ErrorHandler(400, "Please provide name of user");
  }
  if (!email) {
    return ErrorHandler(400, "Please provide email of user");
  }

  if (!password) {
    return ErrorHandler(400, "Please provide password of user");
  }
  await connectDB();

  let user = await User.findOne({ email });

  if (user) {
    return ErrorHandler(400, "User already exist");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({ name, email, password: hashedPassword, avatar });
  const token = tokenGenrator(user._id);
  await cookieSetter(token, true);

  return await NextResponse.json({
    success: true,
    message: "User Created Sucessfully",
  });
});
