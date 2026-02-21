import NextAuth from "next-auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
} from "@/routes";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  // ✅ Allow these API routes without login
  const isPublicApiRoute =
    nextUrl.pathname.startsWith("/api/code-completion") ||
    nextUrl.pathname.startsWith("/api/chat");

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Allow next-auth api routes + our public APIs
  if (isApiAuthRoute || isPublicApiRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/sign-in", nextUrl));
  }

  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
