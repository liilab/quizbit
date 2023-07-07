import { useState, useEffect } from "react";
import axios from "axios";

interface Option {
  id: number;
  question_id: number;
  value: string;
  isCorrect: string;
}

interface Question {
  id: number;
  quiz_id: number;
  title: string;
  options: Option[];
}

interface Quiz {
  title: string;
  description: string;
  questions: Question[];
}

export function useQuizCard(quizId: any) {
  quizId = quizId.id;
  const [quizData, setQuizData] = useState<Quiz>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedQuizzes, setSelectedQuizzes] = useState<number[]>([]);
  const [scores, setScores] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const home_url = (window as any).userLocalize.home_url;

  const handleQuizSelect = (quizId: number) => {
    setSelectedQuizzes((prevSelectedQuizzes) => [
      ...prevSelectedQuizzes,
      quizId,
    ]);
  };

  const isQuizSelected = (quizId: number) => {
    return selectedQuizzes.includes(quizId);
  };

  useEffect(() => {
    axios
      .get(home_url + `/wp-json/quizbit/v1/quiz/${quizId}`)
      .then((response) => {
        setQuizData(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [quizId]);

  const quizLength = quizData?.questions.length || 0;

  const handleNextQuestion = (plus: boolean) => {
    if (
      plus &&
      quizData &&
      quizData.questions &&
      currentQuestionIndex < quizData.questions.length - 1
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (!plus && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return {
    quizData,
    currentQuestionIndex,
    selectedQuizzes,
    scores,
    showResults,
    handleQuizSelect,
    isQuizSelected,
    handleNextQuestion,
    quizLength,
    setShowResults,
    setScores,
  };
}
