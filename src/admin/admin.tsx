import * as React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./admin.scss";

import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";

const router = createHashRouter([
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
]);

ReactDOM.createRoot(
  document.getElementById("quizbit") as HTMLElement
).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
