import React from "react";
import ReactDOM from "react-dom/client";

import MenuRouter  from "./Routes/MenuRouter";
import "./admin.scss";

ReactDOM.createRoot(
  document.getElementById("quizbit") as HTMLElement
).render(
  <React.StrictMode>
    <MenuRouter />
  </React.StrictMode>
);
