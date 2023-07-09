import axios from "axios";
import { useState, useEffect } from "react";

interface Option {
  value: string;
  isCorrect: boolean;
}

interface Question {
  title: string;
  options: Option[];
}

interface NewQuizProps {
  newQuestions: Question[];
  setNewQuestions: (newQuestions: Question[]) => void;
}

export default function useQuestionSetting({
  newQuestions,
  setNewQuestions,
}: NewQuizProps) {
  const handleAddQuiz = () => {
    console.log("handleAddQuiz");
    setNewQuestions([
      ...newQuestions,
      {
        title: "",
        options: [
          { value: "", isCorrect: false },
          { value: "", isCorrect: false },
        ],
      },
    ]);
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedAllQuestions = [...newQuestions];
    updatedAllQuestions[index] = {
      ...updatedAllQuestions[index],
      [field]: value,
    };
    setNewQuestions(updatedAllQuestions);
  };

  const handleDeleteInput = (index: number) => {
    const updatedAllQuestions = [...newQuestions];
    updatedAllQuestions.splice(index, 1);
    setNewQuestions(updatedAllQuestions);
  };

  const handleUpdateOptions = (index: number, options: Option[]) => {
    const updatedAllQuestions = [...newQuestions];
    if (updatedAllQuestions && updatedAllQuestions[index]) {
      updatedAllQuestions[index].options = options;
    } else {
      console.error("Invalid index or undefined array.");
    }
    setNewQuestions(updatedAllQuestions);
  };

  return {
    handleAddQuiz,
    handleInputChange,
    handleDeleteInput,
    handleUpdateOptions,
  };
}
