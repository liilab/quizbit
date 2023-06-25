import React from "react";
import WpWrapper from "../Components/Layout/WpWrapper";
import Navbar from "../Components/Navbar";
import AllQuestionsContainer from "../Components/AllQuestions";

export default function AllQuestions() {
  const menus = [
    {
      name: "Add New Quiz",
      path: "/add-new",
    },
  ];

  return (
    <WpWrapper>
      <Navbar menus={menus} border_color="purple" />
        <AllQuestionsContainer />
    </WpWrapper>
  );
}
