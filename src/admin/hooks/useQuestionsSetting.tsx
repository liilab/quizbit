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
    { title: "", options: [] },
  ]);

  const handleAddQuiz = () => {
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
    updatedAllQuestions[index].options = options;
    setAllQuestions(updatedAllQuestions);
  };

  useEffect(() => {
    setNewQuestions(allQuestions);
  }, [allQuestions, setNewQuestions]);

  return {
    setAllQuestions,
    handleAddQuiz,
    handleInputChange,
    handleDeleteInput,
    handleUpdateOptions,
  };
}
