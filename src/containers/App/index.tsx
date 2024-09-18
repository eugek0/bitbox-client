import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { FC } from "react";
import { useGetProfileQuery } from "../Auth/api";
import FullscreenLoader from "../Common/FullscreenLoader";

const App: FC = () => {
  const { isLoading } = useGetProfileQuery();

  if (isLoading) {
    return <FullscreenLoader />;
  }

  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
};

export default App;
