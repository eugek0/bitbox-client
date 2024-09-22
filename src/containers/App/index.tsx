import { routeTree } from "@/routeTree.gen";
import { useAppSelector } from "@/store";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { FC } from "react";
import { useGetProfileQuery } from "../Auth/api";
import { profileSelector } from "../Auth/selectors";
import FullscreenLoader from "../Common/FullscreenLoader";

const router = createRouter({ routeTree, context: { profile: null } });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App: FC = () => {
  const profile = useAppSelector(profileSelector);
  const { isLoading } = useGetProfileQuery();

  if (isLoading) {
    return <FullscreenLoader />;
  }

  return (
    <RouterProvider router={router} context={{ profile: profile ?? null }} />
  );
};

export default App;
