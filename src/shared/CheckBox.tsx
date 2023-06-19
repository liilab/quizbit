import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";

interface CheckBoxProps {
  checked: boolean;
  onChange: () => void;
}

export default function CheckBox(props: CheckBoxProps) {
  const { checked, onChange } = props;

  const handleClick = () => {
    onChange();
  };

  return (
    <Checkbox
      color="success"
      checked={checked}
      onClick={handleClick}
    />
  );
}
