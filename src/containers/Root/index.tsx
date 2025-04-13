import { FC, useEffect } from "react";
import { useAppSelector } from "@/store";
import { RouterProvider } from "@tanstack/react-router";
import useApp from "antd/es/app/useApp";
import { useGetProfileQuery } from "../Auth/api";
import { profileSelector } from "../Auth/selectors";
import FullscreenLoader from "../Common/FullscreenLoader";
import { notificationSelector } from "./selectors";
import { router } from "@/core/router";

const Root: FC = () => {
  const notification = useAppSelector(notificationSelector);

  const { notification: notify } = useApp();

  const profile = useAppSelector(profileSelector);
  const { isLoading: isProfileLoading } = useGetProfileQuery();

  useEffect(() => {
    if (notification) {
      notify[notification.status]({
        ...notification.config,
        placement: notification.config.placement ?? "bottomRight",
      });
    }
  }, [notification]);

  if (isProfileLoading) {
    return <FullscreenLoader />;
  }

  return (
    <RouterProvider router={router} context={{ profile: profile ?? null }} />
  );
};

export default Root;
