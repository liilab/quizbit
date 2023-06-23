import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";

import AllQuizzes from "../pages/all-quizzes";
import AddNew from "../pages/add-new";

interface MenuRouterProps {
}

export default function MenuRouter(props: MenuRouterProps) {
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

  return (
    <RouterProvider router={router} />
  )
}
