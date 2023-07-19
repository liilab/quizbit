import React from "react";
import QuizForm from "./QuizForm";
import useQuizForm from "../../hooks/useQuizForm";


interface QuizFormWrapperProps {
  id?: string;
}

export default function QuizFormWrapper({ id = ""}: QuizFormWrapperProps) {  
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
