import axios from "axios";
import { useState, useEffect } from "react";

interface Option {
  value: string;
  isCorrect: boolean;
}

interface Quiz {
  title: string;
  options: Option[];
}

interface NewQuizProps {
  newQuizzes: Quiz[];
  setNewQuizzes: (newQuizzes: Quiz[]) => void;
}

export default function useQuizSetting({ setNewQuizzes }: NewQuizProps) {
  const [allQuizzes, setAllQuizzes] = useState<Quiz[]>([{ title: "", options: [] }]);

  const handleAddQuiz = () => {
    setAllQuizzes([...allQuizzes, { title: "", options: [] }]);
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedAllQuizzes = [...allQuizzes];
    updatedAllQuizzes[index] = { ...updatedAllQuizzes[index], [field]: value };
    setAllQuizzes(updatedAllQuizzes);
  };

  const handleDeleteInput = (index: number) => {
    const updatedAllQuizzes = [...allQuizzes];
    updatedAllQuizzes.splice(index, 1);
    setAllQuizzes(updatedAllQuizzes);
  };

  const handleUpdateOptions = (index: number, options: Option[]) => {
    const updatedAllQuizzes = [...allQuizzes];
    updatedAllQuizzes[index].options = options;
    setAllQuizzes(updatedAllQuizzes);
  };

  useEffect(() => {
    setNewQuizzes(allQuizzes);
  }, [allQuizzes, setNewQuizzes]);

  return {
    allQuizzes,
    setAllQuizzes,
    handleAddQuiz,
    handleInputChange,
    handleDeleteInput,
    handleUpdateOptions,
  };
}
