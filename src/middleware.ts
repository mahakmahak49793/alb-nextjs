// import NextAuth from "next-auth";
// import authConfig from "@/auth.config";
// import { NextResponse } from "next/server";

// const { auth } = NextAuth(authConfig);

// export default auth(async (req) => {
//   // ✅ Always allow
//   return NextResponse.next();
// });

// export const config = {
//   matcher: [
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|mp4|mov|avi|mkv|webm|ogg|wav|mp3)).*)",
//     "/(api|trpc)(.*)",
//   ],
// };

import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  // ✅ Always allow
  return NextResponse.next();
});

export const config = {
  // Only run on specific protected routes
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*", 
    "/profile/:path*"
    // Add only the routes you actually want to protect
  ],
};
