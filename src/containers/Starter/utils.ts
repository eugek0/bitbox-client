import { ProtectedRouteType } from "@/core/router";
import { redirect } from "@tanstack/react-router";

export const starterRoute: ProtectedRouteType =
  () =>
  async ({ context }) => {
    if (!context.appStatus?.virgin) {
      throw redirect({
        to: "/",
        replace: true,
      });
    }
  };
