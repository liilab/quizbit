import React, { useState } from "react";

interface InputProps {
  type: "text" | "textarea";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  borderActive?: boolean;
  isQuestion?: boolean;
}

export default function Input(props: InputProps) {
  const borderColor = props.borderActive ? "#864DB6" : "#DCDCDE";
  const isQuestion = props.isQuestion ?? "flex grow";

  if (props.type === "textarea") {
    return (
      <textarea
        value={props.value}
        onChange={props.onChange}
        style={{ padding: "12px", borderColor: borderColor , height: "100px" }}
        className={`${borderColor} ${isQuestion} border-[1px] rounded-md p-3 placeholder-[#333333] placeholder-opacity-30`}
        placeholder={props.placeholder}
      />
    );
  }

  return (
    <input
      type="text"
      value={props.value}
      onChange={props.onChange}
      style={{ padding: "12px", borderColor: borderColor }}
      className={`${borderColor} ${isQuestion} border-[1px] rounded-md p-3 placeholder-[#333333] placeholder-opacity-30`}
      placeholder={props.placeholder}
    />
  );
}
