import { NextRequest, NextResponse } from "next/server";
import { tokenVerifier } from "../utillis/Feature";
import ErrorHandler from "../utillis/ErrorHandler";

// Limit the middleware to paths starting with `/api/`
export const config = {
  runtime: "experimental-edge", // for Edge API Routes only
  unstable_allowDynamic: [
    "/node_modules/mongoose/dist/browser.umd.js",
    "/utillis/Feature.js",
  ],
  matcher: [
    "/api/newtask",
    "/api/myprofile",
    "/api/mytask",
    "/api/deletetask",
    "/api/updatetask",
    "/api/addlabel",
    "/api/todaytasks",
    "/api/taskdetailsbyid/:id*",
  ],
};
export async function middleware(NextRequest) {
  let isAuthenticated = await tokenVerifier();
  if (isAuthenticated === "JWTExpired") {
    return ErrorHandler(401, "Token has been expired please login again");
  }
  if (!isAuthenticated) {
    return ErrorHandler(401, "Please login first");
  } else {
    const response = NextResponse.next();
    response.cookies.set({
      name: "userId",
      value: isAuthenticated,
      path: "/",
    });
    return response;
  }
}
