import * as React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./admin.scss";

import AllQuizzes from "./pages/AllQuizzes";
import AddNew from "./pages/AddNew";

const router = createHashRouter([
  {
    path: "/all-quizzes",
    element: <AllQuizzes />,
  },
  {
    path: "/add-new",
    element: <AddNew />,
  },
]);

ReactDOM.createRoot(
  document.getElementById("quizbit") as HTMLElement
).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
