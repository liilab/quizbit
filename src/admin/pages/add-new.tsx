import React from "react";
import WpWrapper from "../Components/Layout/WpWrapper";
import Navbar from "../Components/Navbar";
import QuizFormWrapper from "../Components/AddQuiz/QuizFormWrapper"
import { useLocation } from "react-router-dom";

export default function AddNewQuiz() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  console.log(id);

  const menus = [
    {
      name: "All Quizzes",
      path: "/all-quizzes",
    },
  ];

  return (
    <WpWrapper>
      <Navbar menus={menus} border_color="blue" />
      <QuizFormWrapper id={id === null ? "" : id} />
    </WpWrapper>
  );
}
