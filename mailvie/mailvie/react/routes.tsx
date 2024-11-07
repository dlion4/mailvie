import {
  Outlet,
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { App } from ".";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: App,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: function About() {
    return <div className="p-2">Hello from About!</div>;
  },
});
const pricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pricing",
  component: function About() {
    return <div className="p-2">Hello from pricing!</div>;
  },
});
const teamRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/team",
  component: function About() {
    return <div className="p-2">Hello from team!</div>;
  },
});




const routeTree = rootRoute.addChildren([indexRoute, aboutRoute, pricingRoute, teamRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}


