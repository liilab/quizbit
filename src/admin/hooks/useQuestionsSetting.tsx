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
  const [allQuestions, setAllQuestions] = useState<Question[]>([
    ...newQuestions,
  ]);

  const handleAddQuiz = () => {
    console.log("handleAddQuiz");
    setAllQuestions([...allQuestions, { title: "", options: [] }]);
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedAllQuestions = [...allQuestions];
    updatedAllQuestions[index] = {
      ...updatedAllQuestions[index],
      [field]: value,
    };
    setAllQuestions(updatedAllQuestions);
  };

  const handleDeleteInput = (index: number) => {
    const updatedAllQuestions = [...allQuestions];
    updatedAllQuestions.splice(index, 1);
    setAllQuestions(updatedAllQuestions);
  };

  const handleUpdateOptions = (index: number, options: Option[]) => {
    const updatedAllQuestions = [...allQuestions];
    if (updatedAllQuestions && updatedAllQuestions[index]) {
      updatedAllQuestions[index].options = options;
    } else {
      console.error("Invalid index or undefined array.");
    }
    setAllQuestions(updatedAllQuestions);
  };

  useEffect(() => {
    setNewQuestions(allQuestions);
  }, [allQuestions]);

  return {
    handleAddQuiz,
    handleInputChange,
    handleDeleteInput,
    handleUpdateOptions,
  };
}
