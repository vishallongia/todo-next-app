import { NextRequest, NextResponse } from "next/server";
import { cookieSetter } from "../../../../utillis/Feature";
import { catchAsyncErrors } from "../../../../utillis/ErrorHandler";

export const GET = catchAsyncErrors(async function (NextRequest) {
  await cookieSetter(null, false);

  return NextResponse.json({
    success: true,
    message: `Logout Successfully`,
  });
});
