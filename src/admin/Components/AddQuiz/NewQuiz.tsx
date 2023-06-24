import React, { useState } from "react";
import Input from "../../../Shared/Input";
import Options from "./Options";
import CloseIcon from "@mui/icons-material/Close";
import Button from "../../../shared/Button";
import useQuizSetting  from "../../hooks/useQuizSetting";

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

export default function NewQuiz({ newQuizzes, setNewQuizzes }: NewQuizProps) {

 const {
    allQuizzes,
    handleAddQuiz,
    handleInputChange,
    handleDeleteInput,
    handleUpdateOptions,
  } = useQuizSetting({ newQuizzes, setNewQuizzes });

  return (
    <>
      {allQuizzes.map((quiz, index) => (
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
          <Options
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
