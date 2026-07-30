import { NextResponse } from "next/server";

import { auth } from "@/auth";

export default auth((request) => {
  const isLoggedIn = Boolean(request.auth);
  const pathname = request.nextUrl.pathname;

  const isLoginPage = pathname === "/login";

  if (!isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
