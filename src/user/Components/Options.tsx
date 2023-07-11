import React, { useState, useEffect } from "react";
import OptionsBox from "./OptionsBox";

interface Option {
  id: number;
  question_id: number;
  value: string;
  isCorrect: string;
}

interface OptionsProps {
  options: Option[];
  selectedAny: boolean;
  handleQuizSelect: (quizId: number) => void;
  quizId: number;
  scores: number;
  handleScores: (scores: number) => void;
}

export default function Options({
  options,
  selectedAny,
  handleQuizSelect,
  quizId,
  handleScores,
  scores,
}: OptionsProps) {
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: number[] }>({});

  const handleSelect = (optionId: number) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [quizId]: [...(prevSelectedOptions[quizId] || []), optionId],
    }));
  };
  
  const isOptionSelected = (optionId: number) => {
    return selectedOptions[quizId]?.includes(optionId) || false;
  };
  


  return (
    <>
      {options.map((option, index) => (
        <div className="flex items-center gap-3" key={index}>
          <OptionsBox
            optionId={index}
            option={option}
            selected={isOptionSelected(index)}
            onSelect={handleSelect}
            selectedAny={selectedAny}
            handleQuizSelect={handleQuizSelect}
            quizId={quizId}
            scores={scores}
            handleScores={handleScores}
          />
        </div>
      ))}
    </>
  );
}
