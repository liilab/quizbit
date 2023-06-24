import React from "react";
import WpWrapper from "../Components/Layout/WpWrapper";
import Navbar from "../Components/Navbar";
import AddQuizWrapper from "../components/AddQuiz/AddQuizWrapper";

export default function AddNewQuiz() {
  const menus = [
    {
      name: "All Quizzes",
      path: "/all-quizzes",
    },
  ];

  return (
    <WpWrapper>
      <Navbar menus={menus} border_color="blue" />
      <AddQuizWrapper />
    </WpWrapper>
  );
}
