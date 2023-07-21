import React from "react";
import WpWrapper from "../components/Layout/WpWrapper";
import Navbar from "../components/Navbar";
import AllQuestionsContainer from "../components/AllQuestions";

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
