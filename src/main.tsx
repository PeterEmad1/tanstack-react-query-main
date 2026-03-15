import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import Main from "./layouts/Main";
import Home from "./pages/Home";
import Info from "./pages/Info";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import Create from "./pages/Create";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/create",
        // element: <Create />,
      },
      {
        path: "/info",
        element: <Info />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools/>
  </QueryClientProvider>,
);
