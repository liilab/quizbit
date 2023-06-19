import React from "react";
import Layout from "../Components/Layout";
import Navbar from "../Components/Navbar";
import AllQuizzesComponent from "../Components/AllQuizzesComponents";

export default function AllQuizzes() {
  return (
    <Layout>
      <Navbar />
      <div className="p-1 mt-5">
        <AllQuizzesComponent />
      </div>
    </Layout>
  );
}
