import { useAppSelector } from "@/store";
import { RouterProvider } from "@tanstack/react-router";
import { FC, useEffect } from "react";
import { useGetProfileQuery } from "../Auth/api";
import { profileSelector } from "../Auth/selectors";
import FullscreenLoader from "../Common/FullscreenLoader";
import { notificationSelector } from "./selectors";
import useNotification from "antd/es/notification/useNotification";
import { router } from "@/core/router";

const Root: FC = () => {
  const notification = useAppSelector(notificationSelector);

  const [notificate, contextHolder] = useNotification();

  const profile = useAppSelector(profileSelector);
  const { isLoading: isProfileLoading } = useGetProfileQuery();

  useEffect(() => {
    if (notification) {
      notificate[notification.status]({
        ...notification.config,
        placement: notification.config.placement ?? "bottomRight",
      });
    }
  }, [notification]);

  if (isProfileLoading) {
    return <FullscreenLoader />;
  }

  return (
    <>
      {contextHolder}
      <RouterProvider router={router} context={{ profile: profile ?? null }} />
    </>
  );
};

export default Root;
