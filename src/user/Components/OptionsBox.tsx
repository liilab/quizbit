import React from "react";

interface Option {
  id: number;
  question_id: number;
  value: string;
  isCorrect: string;
}

interface OptionsBoxProps {
  optionId: number;
  option: Option;
  selected: boolean;
  onSelect: (optionId: number) => void;
  selectedAny: boolean;
  handleQuizSelect: (quizId: number) => void;
  quizId: number;
  scores: number;
  handleScores: (scores: number) => void;
}

export default function OptionsBox({
  optionId,
  option,
  selected,
  onSelect,
  selectedAny,
  quizId,
  handleQuizSelect,
  scores,
  handleScores,
}: OptionsBoxProps) {
  const handleSelect = () => {
    if (!selected) {
      onSelect(optionId);
      if (option.isCorrect === "1") {
        handleScores(scores + 1);
      }
    }
    if (!selectedAny) {
      handleQuizSelect(quizId);
    }
  };

if (selectedAny && option.isCorrect === "1") {
  var borderColor = "green";
} else if (selected && option.isCorrect === "0"){
  var borderColor = "red";
}
else{
  var borderColor = "gray";
}


  return (
    <>
      {selectedAny ? (
        <input
          type="checkbox"
          className={`rounded-lg h-8 w-8 border-2 border-gray-300 cursor-pointer`}
          checked={selected}
          onChange={handleSelect}
          disabled
        />
      ) : (
        <input
          type="checkbox"
          className={`rounded-lg h-8 w-8 border-2 border-gray-300 cursor-pointer`}
          checked={selected}
          onChange={handleSelect}
        />
      )}

      <p
        className="border-2 w-full p-2 rounded-md text-slate-950 text-sm"
        style={{
          borderColor: borderColor,
        }}
      >
        {option.value}
      </p>
    </>
  );
}
