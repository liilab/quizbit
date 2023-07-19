import { useEffect, useState } from "react";

interface Option {
  value: string;
  isCorrect: boolean;
}

interface OptionsProps {
  options: Option[];
  setOptions: (options: Option[]) => void;
}

export default function useOptionSetting({
  options,
  setOptions,
}: OptionsProps) {
  const [inputAreas, setInputAreas] = useState<Option[]>([]);

  useEffect(() => {
    setInputAreas([...options]);
  }, [options]);

  const handleAddInput = () => {
    setInputAreas([...inputAreas, { value: "", isCorrect: false }]);
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedInputAreas = [...inputAreas];
    updatedInputAreas[index].value = value;
    setInputAreas(updatedInputAreas);
    setOptions(updatedInputAreas);
  };

  const handleCheckboxChange = (
    index: number,
    quizType: string = "single_choice"
  ) => {
    if (quizType === "single_choice") {
      const updatedInputAreas = inputAreas.map((inputArea, i) => ({
        ...inputArea,
        isCorrect: i === index,
      }));
      setInputAreas(updatedInputAreas);
      setOptions(updatedInputAreas);
    } else {
      const updatedInputAreas = inputAreas.map((inputArea, i) => {
        if (i === index) {
          return {
            ...inputArea,
            isCorrect: !inputArea.isCorrect,
          };
        }
        return inputArea;
      });
      setInputAreas(updatedInputAreas);
      setOptions(updatedInputAreas);
    }
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
