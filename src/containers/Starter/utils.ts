import { ProtectedRouteType } from "@/core/router";
import { redirect } from "@tanstack/react-router";

export const starterRoute: ProtectedRouteType =
  (authenticated) =>
  async ({ context }) => {
    if (!context.appStatus?.virgin) {
      throw redirect({
        to: "/",
        replace: true,
      });
    }

    if (authenticated && context.profile) {
      throw redirect({
        to: "/starter",
        replace: true,
      });
    } else if (!authenticated && !context.profile) {
      throw redirect({
        to: "/starter/login",
        replace: true,
      });
    }
  };
