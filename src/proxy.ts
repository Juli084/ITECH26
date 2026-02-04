import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function proxy(req) {
        if (
            req.nextUrl.pathname.startsWith("/dashboard") &&
            req.nextauth.token?.role !== "ADMIN"
        ) {
            return NextResponse.rewrite(new URL("/login?message=Unauthorized", req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: ["/dashboard/:path*"],
};
