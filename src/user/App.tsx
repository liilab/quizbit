import React from "react";
import QuizCardWrapper from "./Components/QuizCardWrapper";

export default function App(props: any) {
  const { id } = props;

  return (
    <>
      <QuizCardWrapper id={id} />
    </>
  );
}
