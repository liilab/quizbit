import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./user.scss";

const id = "quizbit-quiz-card";
const root = ReactDOM.createRoot(document.getElementById(id) as HTMLElement);
const attributesData = document.getElementById(id)?.getAttribute(id);

const array = JSON.parse(attributesData || '{}');


root.render(
  <React.StrictMode>
    <App {...array} />
  </React.StrictMode>
);

