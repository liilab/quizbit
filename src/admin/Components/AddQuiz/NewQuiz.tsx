import React, { useState } from "react";
import Input from "../../../Shared/Input";
import Options from "./Options";
import CloseIcon from "@mui/icons-material/Close";


interface Option {
  value: string;
  isCorrect: boolean;
}

interface Quiz {
  title: string;
  options: Option[];
}



interface Props {
  newQuzzes: Quiz[];
  setNewQuzzes: (newQuzzes: Quiz[]) => void;
}

export default function NewQuiz(props: Props) {
  const [allQuzzes, setAllQuzzes] = useState<Quiz[]>([
    { title: "", options: [] },
  ]);

  const handleAddQuiz = () => {
    setAllQuzzes([...allQuzzes, { title: "", options: [] }]);
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedAllQuzzes = [...allQuzzes];
    updatedAllQuzzes[index] = { ...updatedAllQuzzes[index], [field]: value };
    setAllQuzzes(updatedAllQuzzes);
  };

  const handleDeleteInput = (index: number) => {
    const updatedAllQuzzes = [...allQuzzes];
    updatedAllQuzzes.splice(index, 1);
    setAllQuzzes(updatedAllQuzzes);
  };

  const handleUpdateOptions = (index: number, options: Option[]) => {
    const updatedAllQuzzes = [...allQuzzes];
    updatedAllQuzzes[index].options = options;
    setAllQuzzes(updatedAllQuzzes);
  };

  props.setNewQuzzes(allQuzzes);

  return (
    <>
      {allQuzzes.map((quiz, index) => (
        <div key={index} className="gap-2 mb-5">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h2 className="font-bold text-[#6E6E6E]">Question {index + 1}</h2>
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
        <button
          onClick={handleAddQuiz}
          className="bg-[#ECECFC] text-primary font-bold border-[1px] border-primary rounded-md p-2 px-8"
        >
          Add New Question
        </button>
      </div>
    </>
  );
}
