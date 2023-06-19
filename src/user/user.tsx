import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./user.scss";


const root = ReactDOM.createRoot(document.getElementById("quizbit_current_user_info") as HTMLElement);
const attributesData = document.getElementById("quizbit_current_user_info")?.getAttribute("quizbit_current_user_info");

const array = JSON.parse(attributesData || '{}');


root.render(
  <React.StrictMode>
    <App {...array} />
  </React.StrictMode>
);

