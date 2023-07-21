import React from "react";
import ReactDOM from "react-dom/client";

import AllQuestions from "./pages/all-quizzes";
import AddNew from "./pages/add-new";

import MenuRouter from "./routes/Router"
import "./admin.scss";
import { Provider } from "react-redux";
import store from "./store";

const MenuLists = [
  {
    path: "all-quizzes",
    element: <AllQuestions />,
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
    <Provider store={store}>
    <MenuRouter routers={MenuLists} />
    </Provider>
  </React.StrictMode>
);
