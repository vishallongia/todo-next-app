import { NextResponse, NextRequest } from "next/server";
const ErrorHandler = (statusCode = 500, message = "Internal Server Error") => {
  return NextResponse.json({ success: false, message }, { status: statusCode });
};

export const catchAsyncErrors = (passedFn) => (NextRequest, NextResponse) => {
  return Promise.resolve(passedFn(NextRequest, NextResponse)).catch((err) => {
    return ErrorHandler(500, err.message);
  });
};

export default ErrorHandler;
