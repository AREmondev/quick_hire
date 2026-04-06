import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Only allow candidates who are logged in
        return !!token && token.user?.role === "candidate";
      },
    },
    pages: {
      signIn: "/auth/login",
    },
  },
);

export const config = {
  matcher: [
    "/profile/:path*",
    "/applications/:path*",
    "/jobs/:slug/apply",
    "/jobs/:slug/assessment",
    "/jobs/:slug/submit",
    "/resume/:path*",
  ],
};
