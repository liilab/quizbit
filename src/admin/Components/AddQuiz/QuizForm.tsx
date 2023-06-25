import React from "react";
import Input from "../../../Shared/Input";
import Question from "./Question";
import Button from "../../../shared/Button";

interface QuizFormProps {
  showDescription: boolean;
  setShowDescription: (showDescription: boolean) => void;
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  newQuestions: any;
  setNewQuestions: (newQuestions: any) => void;
  handleSaveQuiz: () => void;
  handleQuizButtonText: string;
  formSubmit: (e: any) => void;
}

export default function QuizForm(props: QuizFormProps) {
  const {
    showDescription,
    setShowDescription,
    title,
    setTitle,
    description,
    setDescription,
    newQuestions,
    setNewQuestions,
    handleSaveQuiz,
    handleQuizButtonText,
    formSubmit,
  } = props;

  return (
    <form onSubmit={(e) => formSubmit(e)}>
      <div>
        <div className="bg-[#fff] lg:w-[70%]">
          <div className="flex flex-col gap-5 p-5">
            <div className="flex justify-between">
              <h2 className="font-bold text-secondary-200">Quiz Setup</h2>
               <Button onClick={handleSaveQuiz}>{handleQuizButtonText}</Button>
            </div>
            <div className="flex flex-col gap-2 mb-5">
              <h2 className="font-bold text-secondary-200">Title</h2>
              <Input
                value={title}
                type="text"
                placeholder="eg: Quantum Mechanics"
                isQuestion={false}
                onChange={(e) => setTitle(e.target.value)}
              />

              {showDescription ? (
                <Input
                  value={description}
                  type="textarea"
                  placeholder="eg: Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles."
                  isQuestion={false}
                  onChange={(e) => setDescription(e.target.value)}
                />
              ) : (
                <button
                  className="ms-auto text-[#AFA5FF]"
                  onClick={() => setShowDescription(true)}
                >
                  + Description
                </button>
              )}
            </div>
            <Question newQuestions={newQuestions} setNewQuestions={setNewQuestions} />
          </div>
        </div>
      </div>
    </form>
  );
}
