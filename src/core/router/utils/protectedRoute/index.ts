import { redirect } from "@tanstack/react-router";
import { ProtectedRouteType } from "./types";

export const protectedRoute: ProtectedRouteType =
  (authenticated, redirectTo) =>
  async ({ context }) => {
    if (authenticated && context.profile) {
      throw redirect({
        to: redirectTo ?? "/",
        replace: true,
      });
    } else if (!authenticated && !context.profile) {
      throw redirect({
        to: redirectTo ?? "/auth/login",
        replace: true,
      });
    }
  };
