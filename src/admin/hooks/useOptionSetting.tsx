import React from "react";
import { useState, useEffect } from "react";

interface Option {
  value: string;
  isCorrect: boolean;
}

interface OptionsProps {
  options: Option[];
  setOptions: (options: Option[]) => void;
}

export default function useOptionSetting({ setOptions }: OptionsProps) {
  const [inputAreas, setInputAreas] = useState<Option[]>([
    { value: "", isCorrect: false },
    { value: "", isCorrect: false },
  ]);

  const handleAddInput = () => {
    setInputAreas([...inputAreas, { value: "", isCorrect: false }]);
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedInputAreas = [...inputAreas];
    updatedInputAreas[index].value = value;
    setInputAreas(updatedInputAreas);
    setOptions(updatedInputAreas);
  };

  const handleCheckboxChange = (index: number) => {
    const updatedInputAreas = [...inputAreas];
    updatedInputAreas[index].isCorrect = !updatedInputAreas[index].isCorrect;
    setInputAreas(updatedInputAreas);
    setOptions(updatedInputAreas);
  };

  const handleDeleteInput = (index: number) => {
    const updatedInputAreas = [...inputAreas];
    updatedInputAreas.splice(index, 1);
    setInputAreas(updatedInputAreas);
    setOptions(updatedInputAreas);
  };

  return {
    inputAreas,
    handleAddInput,
    handleInputChange,
    handleCheckboxChange,
    handleDeleteInput,
  };
}
