import React from "react";
import AddQuiz from "./AddQuiz";

interface AddQuizWrapperProps {
    id? : string;
}

export default function AddQuizWrapper({id = ""}: AddQuizWrapperProps) {

  return (
    <>
      <AddQuiz id = {id} />
    </>
  );
}
