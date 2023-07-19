import React, { useState } from "react";
import WpWrapper from "../Components/Layout/WpWrapper";
import Navbar from "../Components/Navbar";
import QuizFormWrapper from "../components/AddQuiz/QuizFormWrapper";
import { useLocation } from "react-router-dom";
import ModalWrapper from "../components/QuizTypeModal/ModalWrapper";
import { QuizType } from "../../shared/Types"
import { useSelector, useDispatch } from 'react-redux';

export default function AddNewQuiz() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [quizType, setQuizType] = useState<QuizType | null>(null);

  const menus = [
    {
      name: "All Quizzes",
      path: "/all-quizzes",
    },
  ];


  return (
    <ModalWrapper quizType={quizType} setQuizType={setQuizType}>
      <WpWrapper>
        <Navbar menus={menus} border_color="blue" />
        <QuizFormWrapper id={id === null ? "" : id} quizType={quizType} />
      </WpWrapper>
    </ModalWrapper>
  );
}
