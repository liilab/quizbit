import React, { useState } from "react";
import Input from "../../../Shared/Input";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckBox from "../../../Shared/CheckBox";
import Button from "../../../shared/Button";

interface Option {
  value: string;
  isCorrect: boolean;
}

interface OptionsProps {
  options: Option[];
  setOptions: (options: Option[]) => void;
}

export default function Options(props: OptionsProps) {
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
    props.setOptions(updatedInputAreas);
  };

  const handleCheckboxChange = (index: number) => {
    const updatedInputAreas = [...inputAreas];
    updatedInputAreas[index].isCorrect = !updatedInputAreas[index].isCorrect;
    setInputAreas(updatedInputAreas);
    props.setOptions(updatedInputAreas);
  };

  const handleDeleteInput = (index: number) => {
    const updatedInputAreas = [...inputAreas];
    updatedInputAreas.splice(index, 1);
    setInputAreas(updatedInputAreas);
    props.setOptions(updatedInputAreas);
  };

  return (
    <div>
      {inputAreas.map((input, index) => (
        <div className="flex mt-5" key={index}>
          <Input
            type="text"
            borderActive={input.isCorrect}
            placeholder={`eg: Option ${index + 1}`}
            value={input.value}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
          <div className="flex gap-1 w-1/12 items-center">
            <CheckBox
              checked={input.isCorrect}
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
