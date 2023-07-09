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

export default function Options({ options, selectedAny, handleQuizSelect, quizId, handleScores, scores }: OptionsProps) {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const handleSelect = (optionId: number) => {
    setSelectedOptions((prevSelectedOptions) => [...prevSelectedOptions, optionId]);
  };

  const isOptionSelected = (optionId: number) => {
    return selectedOptions.includes(optionId);
  };

  return (
    <>
      {options.map((option) => (
        <div className="flex items-center gap-3" key={option.id}>
          <OptionsBox
            option={option}
            selected={isOptionSelected(option.id)}
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
