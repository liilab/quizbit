import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";



export interface RouterProps {
  routers : {
    path: string;
    element: React.ReactNode;
  }[];
}

export default function Router({ routers }: RouterProps) {
  const hash_router = createHashRouter([...routers]);
  return <RouterProvider router={hash_router} />;
}
