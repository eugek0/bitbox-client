import { routeTree } from "@/routeTree.gen";
import { useAppSelector } from "@/store";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { FC } from "react";
import { useGetProfileQuery } from "../Auth/api";
import { profileSelector } from "../Auth/selectors";
import FullscreenLoader from "../Common/FullscreenLoader";
import { useGetAppStatusQuery } from "./api";
import { appStatusSelector } from "./selectors";

const router = createRouter({
  routeTree,
  context: { profile: null, appStatus: null },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App: FC = () => {
  const profile = useAppSelector(profileSelector);
  const appStatus = useAppSelector(appStatusSelector);
  const { isLoading: isProfileLoading } = useGetProfileQuery();
  const { isLoading: isAppStateLoading } = useGetAppStatusQuery();

  if (isProfileLoading || isAppStateLoading) {
    return <FullscreenLoader />;
  }

  return (
    <RouterProvider
      router={router}
      context={{ profile: profile ?? null, appStatus: appStatus ?? null }}
    />
  );
};

export default App;
