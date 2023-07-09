import React from "react";
import QuizCard from "./Components/QuizCard";

export default function App(props: any) {
  const { id } = props;

  return (
    <>
      <QuizCard id={id} />
    </>
  );
}
