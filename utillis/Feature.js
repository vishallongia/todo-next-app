import mongoose from "mongoose";
import { cookies } from "next/headers";
import * as jose from "jose";
import { headers } from "next/headers";
import ErrorHandler from "./ErrorHandler";

export const config = {
  runtime: "edge", // for Edge API Routes only
  unstable_allowDynamic: [
    "/node_modules/mongoose/dist/browser.umd.js",
    "/utillis/Feature.js",
  ],
};

//Connection with DB
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    ("DB connection success");
  } catch (e) {
    e;
    return ErrorHandler(500, "Internal Server Error");
  }
};

// Cookies Setter Function
export const cookieSetter = async (token, set) => {
  if (set) {
    cookies().set("token", token, {
      secure: false,
      maxAge: 60 * 60 * 1000,
    });
  } else {
    cookies().delete("token");
    cookies().delete("userId");
  }
};

// JWT token Genrator
export const tokenGenrator = async (_id) => {
  const token = await new jose.SignJWT({
    userId: _id,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1hr")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  return token;
  // return jwt.sign({ _id }, process.env.JWT_SECRET);
};

// JWT  token Verifier

export const tokenVerifier = async () => {
  //Getting token value means token string
  headers().get("set-cookie");
  const { value } = cookies().get("token") || {};
  if (value) {
    try {
      const decodedData = await jose.jwtVerify(
        value,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      return decodedData.payload.userId;
    } catch (e) {
      if (e.name === "JWTExpired") {
        return e.name;
      }
    }
  }
};

// getUserIdFromHeaders Common Function
export function getUserIdFromHeaders() {
  const cookieHeader = headers().get("set-cookie");
  if (cookieHeader) {
    return cookieHeader.split("=")[1].split(";")[0];
  }
  return undefined;
}

//Get Host Name

export function getHostNameUrl() {
  const hostName = headers().get("host");
  if (hostName.includes("localhost")) {
    return process.env.LOCAL_URL;
  } else {
    return process.env.PRODUCTION_URL;
  }
}
