import React from "react";
import Layout from "../Components/Layout";
import Navbar from "../Components/Navbar";
import AddQuiz from "../Components/AddQuiz/AddQuiz";

export default function AddNewQuiz() {
  return (
    <Layout>
      <Navbar />
      <AddQuiz />
    </Layout>
  );
}