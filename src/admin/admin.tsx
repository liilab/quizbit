import React from "react";
import ReactDOM from "react-dom/client";

import AllQuizzes from "./pages/all-quizzes";
import AddNew from "./pages/add-new";

import MenuRouter  from "./Routes/Router";
import "./admin.scss";

const MenuLists = [
  {
    path: "all-quizzes",
    element: <AllQuizzes />,
  },
  {
    path: "add-new",
    element: <AddNew />,
  },
];


ReactDOM.createRoot(
  document.getElementById("quizbit") as HTMLElement
).render(
  <React.StrictMode>
    <MenuRouter routers={MenuLists} />
  </React.StrictMode>
);
