import React, { useState } from "react";
import Input from "../../../Shared/Input";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckBox from "../../../Shared/CheckBox";
import Button from "../../../shared/Button";
import useOptionSetting from "../../hooks/useOptionSetting";

interface Option {
  value: string;
  isCorrect: boolean;
}

interface OptionsProps {
  options: Option[];
  setOptions: (options: Option[]) => void;
}

function isCorrect(value: string | boolean): boolean {
  return value === "1" || value === true;
}

export default function Options({ options, setOptions }: OptionsProps) {
  const {
    inputAreas,
    handleAddInput,
    handleInputChange,
    handleCheckboxChange,
    handleDeleteInput,
  } = useOptionSetting({ options, setOptions });

  return (
    <div>
      {inputAreas.map((input, index) => (
        <div className="flex mt-5" key={index}>
          <Input
            type="text"
            borderActive={isCorrect(input.isCorrect)}
            placeholder={`eg: Option ${index + 1}`}
            value={input.value}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
          <div className="flex gap-1 w-1/12 items-center">
            <CheckBox
              checked={isCorrect(input.isCorrect)}
              onChange={() => handleCheckboxChange(index)}
            />
            <CancelIcon
              className="cursor-pointer"
              color="error"
              onClick={() => handleDeleteInput(index)}
            />
          </div>
        </div>
      ))}
      <div className="mt-10">
        <Button onClick={handleAddInput} classes="border-dashed">
          + Add Options
        </Button>
      </div>
    </div>
  );
}
