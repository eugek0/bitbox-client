import { routeTree } from "@/routeTree.gen";
import { useAppSelector } from "@/store";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { FC, useEffect } from "react";
import { useGetProfileQuery } from "../Auth/api";
import { profileSelector } from "../Auth/selectors";
import FullscreenLoader from "../Common/FullscreenLoader";
import { notificationSelector } from "./selectors";
import useNotification from "antd/es/notification/useNotification";

const router = createRouter({
  routeTree,
  context: { profile: null },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const Root: FC = () => {
  const notification = useAppSelector(notificationSelector);

  const [notificate, contextHolder] = useNotification();

  const profile = useAppSelector(profileSelector);
  const { isLoading: isProfileLoading } = useGetProfileQuery();

  useEffect(() => {
    if (notification) {
      notificate[notification.status](notification.config);
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
