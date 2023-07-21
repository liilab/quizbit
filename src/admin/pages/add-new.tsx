import React, { useState } from "react";
import WpWrapper from "../components/Layout/WpWrapper";
import Navbar from "../components/Navbar";
import QuizFormWrapper from "../components/AddQuiz/QuizFormWrapper"
import { useLocation } from "react-router-dom";
import ModalWrapper from "../components/QuizTypeModal/ModalWrapper";
import { QuizType } from "../../shared/Types"

export default function AddNewQuiz() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const menus = [
    {
      name: "All Quizzes",
      path: "/all-quizzes",
    },
  ];


  return (
    <ModalWrapper>
      <WpWrapper>
        <Navbar menus={menus} border_color="blue" />
        <QuizFormWrapper id={id === null ? "" : id}/>
      </WpWrapper>
    </ModalWrapper>
  );
}
