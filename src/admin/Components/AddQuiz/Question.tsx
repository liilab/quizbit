import React, { useState } from "react";
import Input from "../../../Shared/Input";
import Option from "./Option";
import CloseIcon from "@mui/icons-material/Close";
import Button from "../../../shared/Button";
import useQuestionSetting  from "../../hooks/useQuestionsSetting";

interface Option {
  value: string;
  isCorrect: boolean;
}

interface Question{
  title: string;
  options: Option[];
}

interface NewQuestionProps {
  newQuestions: Question[];
  setNewQuestions: (newQuestions: Question[]) => void;
}

export default function Question({ newQuestions, setNewQuestions }: NewQuestionProps) {

 const {
    handleAddQuiz,
    handleInputChange,
    handleDeleteInput,
    handleUpdateOptions,
  } = useQuestionSetting({ newQuestions, setNewQuestions });

  return (
    <>
      {newQuestions.map((quiz, index) => (
        <div key={index} className="gap-2 mb-5">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h2 className="font-bold text-secondary-200">
                Question {index + 1}
              </h2>
              <CloseIcon
                className="cursor-pointer"
                sx={{ color: "#6E6E6E" }}
                onClick={() => handleDeleteInput(index)}
              />
            </div>
            <Input
              value={quiz.title}
              type="text"
              placeholder="eg: What is quantum mechanics in simple terms?"
              onChange={(e) =>
                handleInputChange(index, "title", e.target.value)
              }
            />
          </div>
          <Option
            options={quiz.options}
            setOptions={(options: Option[]) =>
              handleUpdateOptions(index, options)
            }
          />
        </div>
      ))}
      <div className="lg:ms-auto">
        <Button onClick={handleAddQuiz}> Add New Question</Button>
      </div>
    </>
  );
}
