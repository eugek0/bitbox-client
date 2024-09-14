import { store } from "@/store";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Provider } from "react-redux";

export const Route = createRootRoute({
  component: () => (
    <Provider store={store}>
      <Outlet />
      <TanStackRouterDevtools />
    </Provider>
  ),
});
