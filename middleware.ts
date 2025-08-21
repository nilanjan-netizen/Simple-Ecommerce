
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Public routes (add more if you want them open)
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhook(.*)", // keep Stripe webhook public
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect(); // redirect unauthenticated users to sign-in
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files, always run for API
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};


