import React from "react";
import WpWrapper from "../Components/Layout/WpWrapper";
import Navbar from "../Components/Navbar";
import AllQuizzesContainer from "../Components/AllQuizzes";

export default function AllQuizzes() {
  const menus = [
    {
      name: "Add New Quiz",
      path: "/add-new",
    },
  ];

  return (
    <WpWrapper>
      <Navbar menus={menus} border_color="purple" />
        <AllQuizzesContainer />
    </WpWrapper>
  );
}
