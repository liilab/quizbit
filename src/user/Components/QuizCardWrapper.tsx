import React from "react";
import { useQuizCard } from "../hooks/useQuizCard";
import QuizCard from "./QuizCard";

export default function QuizCardWrapper (id: any){
  const {
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
  } = useQuizCard(id);

  return (
    <QuizCard
    quizData = {quizData}
    currentQuestionIndex = {currentQuestionIndex}
    selectedQuizzes = {selectedQuizzes}
    scores = {scores}
    showResults ={showResults}
    handleQuizSelect = {handleQuizSelect}
    isQuizSelected = {isQuizSelected}
    handleNextQuestion ={handleNextQuestion}
    quizLength = {quizLength}
    setShowResults = {setShowResults}
    setScores = {setScores}
    />
  );
};
