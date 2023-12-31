import React, { useState, useEffect } from "react";
import axios from "axios";
import Options from "./Options";
import { FaChevronCircleLeft } from "react-icons/fa";

interface Option {
  id: number;
  question_id: number;
  value: string;
  isCorrect: string;
}

interface Questions {
  id: number;
  quiz_id: number;
  title: string;
  options: Option[];
}

interface Quiz {
  title: string;
  description: string;
  questions: Questions[];
}

export default function QuizCard(id: any) {
  const [quizData, setQuizData] = useState<Quiz>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedQuizes, setSelectedQuizes] = useState<number[]>([]);
  const [scores, setScores] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const quizId = id.id;
  const home_url = (window as any).userLocalize.home_url;

  const handleQuizSelect = (quizId: number) => {
    setSelectedQuizes((prevSelectedQuizes) => [...prevSelectedQuizes, quizId]);
  };

  const isQuizSelected = (quizId: number) => {
    return selectedQuizes.includes(quizId);
  };


  useEffect(() => {

    axios.interceptors.request.use(
      function (config) {
        config.headers["X-WP-Nonce"] = (window as any).userLocalize.nonce;
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    
    axios
      .get(home_url + `/wp-json/quizbit/v1/quiz/0/id/${quizId}`)
      .then((response) => {
        setQuizData(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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

  const greetingsWords = [
    "Very Bad!",
    "Bad!",
    "Good!",
    "Very Good!",
    "Excellent!",
  ];

  const getGreetings = (score: number) => {
    score = Math.round((score * 100) / quizLength);
    if (score <= 20) {
      return greetingsWords[0];
    } else if (score > 20 && score <= 40) {
      return greetingsWords[1];
    } else if (score > 40 && score <= 60) {
      return greetingsWords[2];
    } else if (score > 60 && score <= 80) {
      return greetingsWords[3];
    } else if (score > 80 && score <= 100) {
      return greetingsWords[4];
    }
  };

  if (quizData) {
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
                    <h2 className="font-bold text-[#6E6E6E]">
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
                <h1 className="text-5xl text-bold text-center">
                  {getGreetings(scores)}
                </h1>
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
                          Wrong - {selectedQuizes.length - scores}
                        </li>
                        <li className="text-[#6B7280] text-2xl font-medium list-outside list-disc ml-6">
                          Skippped - {quizLength - selectedQuizes.length}
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
  } else {
    return <></>;
  }
}
