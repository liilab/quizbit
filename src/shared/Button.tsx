import React from "react";

export interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  classes?: string;
}

export default function Button({ children, onClick, classes }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-primary-200 text-primary-500 font-bold border-[1px] border-primary-500 rounded-md p-2 px-8 ${classes}`}
    >
      {children}
    </button>
  );
}
