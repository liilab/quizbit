import React from "react";
import QuizForm from "./QuizForm";
import useQuizForm from "../../hooks/useQuizForm";
import { QuizType } from "../../../shared/Types";

interface QuizFormWrapperProps {
  id?: string;
  quizType?: QuizType | null;
}

export default function QuizFormWrapper({ id = "", quizType }: QuizFormWrapperProps) {  
  const {
    showDescription,
    setShowDescription,
    title,
    setTitle,
    description,
    setDescription,
    newQuestions,
    handleSaveQuiz,
    setNewQuestions,
    formSubmit,
  } = useQuizForm(id);

  console.log("QuizFormWrapper", id, quizType);

  return (
    <>
      <QuizForm
        showDescription={showDescription}
        setShowDescription={setShowDescription}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        newQuestions={newQuestions}
        setNewQuestions={setNewQuestions}
        handleSaveQuiz={handleSaveQuiz}
        handleQuizButtonText={id ? "Update Quiz" : "Save Quiz"}
        formSubmit={formSubmit}
      />
    </>
  );
}
