import React from "react";
import Options from "./Options";
import { FaChevronCircleLeft } from "react-icons/fa";

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

interface Quiz{
  title: string;
  description: string;
  questions: Question[];
}

  
interface QuizCardProps {
  quizData: Quiz | undefined;
  currentQuestionIndex: number;
  selectedQuizzes: number[];
  scores: number;
  showResults: boolean;
  quizLength: number;
  handleQuizSelect: (quizId: number) => void;
  isQuizSelected: (quizId: number) => boolean;
  handleNextQuestion: (plus: boolean) => void;
  setShowResults: (show: boolean) => void;
  setScores: (scores: number) => void;
}

export default function QuizCard({
  quizData,
  currentQuestionIndex,
  selectedQuizzes,
  scores,
  showResults,
  quizLength,
  handleQuizSelect,
  isQuizSelected,
  handleNextQuestion,
  setShowResults,
  setScores,
} : QuizCardProps){

  return (
    <div>
      <div className="flex justify-center">
        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
          {!showResults ? (
            <>
              <h5 className="mb-4 text-center text-3xl text-slate-950 font-bold tracking-tight">
                {quizData?.title}
              </h5>
              <hr className="h-px my-6 bg-gray-700 border-0" />
              <h5 className="mb-4 text-md text-slate-950 font-bold tracking-tight">
                {quizData?.questions[currentQuestionIndex].title}
              </h5>
              <div>
                <div className="flex items-start">
                  <h2 className="font-bold text-primary-500">
                    Question {currentQuestionIndex + 1}
                  </h2>
                  <button
                    className="ml-auto"
                    onClick={() => handleNextQuestion(false)}
                  >
                    <FaChevronCircleLeft
                      style={{
                        fontSize: "28px",
                        color: currentQuestionIndex ? "#000000" : "#6E6E6E",
                      }}
                    />
                  </button>
                </div>
                <div className="flex flex-col gap-4 my-5">
                  {quizData?.questions[currentQuestionIndex]?.options && (
                    <Options
                      options={
                        quizData?.questions[currentQuestionIndex].options
                      }
                      selectedAny={isQuizSelected(currentQuestionIndex)}
                      handleQuizSelect={handleQuizSelect}
                      quizId={currentQuestionIndex}
                      scores={scores}
                      handleScores={setScores}
                    />
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-5xl text-bold text-center">Well Done!</h1>
              <div className="mt-20 mb-10">
                <h1 className="text-2xl font-semibold my-4">Your Scores</h1>
                <div className="flex justify-between">
                  <div className="flex items-baseline text-gray-900">
                    <span className="text-7xl font-extrabold tracking-tight">
                      {scores}
                    </span>
                    <span className="ml-1 text-5xl font-bold text-gray-500">
                      /{quizLength}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <ul>
                      <li className="text-[#22C55E] text-2xl font-medium list-outside list-disc ml-6">
                        Correct - {scores}
                      </li>
                      <li className="text-[#EF4444] text-2xl font-medium list-outside list-disc ml-6">
                        Wrong - {selectedQuizzes.length - scores}
                      </li>
                      <li className="text-[#6B7280] text-2xl font-medium list-outside list-disc ml-6">
                        Skippped - {quizLength - selectedQuizzes.length}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
          {currentQuestionIndex < quizLength - 1 && (
            <button
              type="button"
              className="bg-[#000000] focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-4 inline-flex justify-center w-full text-center text-[#ffffff]"
              onClick={() => handleNextQuestion(true)}
            >
              Next
            </button>
          )}

          {currentQuestionIndex === quizLength - 1 && !showResults && (
            <button
              type="button"
              className="bg-[#000000] focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-4 inline-flex justify-center w-full text-center text-[#ffffff]"
              onClick={() => setShowResults(true)}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
