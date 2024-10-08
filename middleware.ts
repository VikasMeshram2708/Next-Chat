import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Define public paths that don't require authentication
const PUBLIC_PATHS = new Set(["/u/login", "/u/signup"]);

export async function middleware(request: NextRequest) {
  try {
    // Get the current path
    const path = request.nextUrl.pathname;
    
    // Check if the current path is public
    const isPublicPath = PUBLIC_PATHS.has(path);

    // Get the authentication token
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET, // Changed from NEXT_AUTH_SECRET
    });

    // Redirect to login if accessing protected route without token
    if (!token && !isPublicPath) {
      return NextResponse.redirect(new URL("/u/login", request.url));
    }

    // Redirect to home if accessing public route with token
    if (token && isPublicPath) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Proceed with the request
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    // In case of error, redirect to login
    return NextResponse.redirect(new URL("/u/login", request.url));
  }
}


export const config = {
  matcher: ["/", "/u/login", "/u/signup", "/u/:path*"],
};
