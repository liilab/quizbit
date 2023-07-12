import React from "react";
import Checkbox from "@mui/material/Checkbox";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";

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

  let borderColor = "gray",
    checkboxColor = "";
  if (selectedAny && option.isCorrect === "1") {
    borderColor = "green";
    checkboxColor = "success";
  } else if (selected && option.isCorrect === "0") {
    borderColor = "red";
    checkboxColor = "error";
  }

  return (
    <>
      {selectedAny ? (
        checkboxColor === "error" ? (
          <Checkbox
            color="error"
            checkedIcon={<DisabledByDefaultIcon />}
            checked={selected}
            style={{
              transform: "scale(1.4)",
            }}
          />
        ) : (
          <Checkbox
            color="success"
            checked={selected}
            style={{
              transform: "scale(1.4)",
            }}
          />
        )
      ) : checkboxColor === "error" ? (
        <Checkbox
          color="error"
          checkedIcon={<DisabledByDefaultIcon />}
          checked={selected}
          onChange={handleSelect}
          style={{
            transform: "scale(1.4)",
          }}
        />
      ) : (
        <Checkbox
          color="success"
          checked={selected}
          onChange={handleSelect}
          style={{
            transform: "scale(1.4)",
          }}
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
