import React, { useState } from "react";
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

  // useEffect(() => {
  //   const storedState = localStorage.getItem("optionsState");
  //   if (storedState) {
  //     const parsedState = JSON.parse(storedState);
  //     setSelectedOptions(parsedState.selectedOptions || []);
  //   }
  // }, []);

  // useEffect(() => {
  //   const stateToStore = {
  //     selectedOptions,
  //   };
  //   localStorage.setItem("optionsState", JSON.stringify(stateToStore));
  // }, [selectedOptions]);

  // useEffect(() => {
  //   const expirationTimer = setTimeout(() => {
  //     localStorage.removeItem("optionsState");
  //   }, 100); // 5 minutes in milliseconds

  //   return () => {
  //     clearTimeout(expirationTimer);
  //   };
  // }, []);

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
