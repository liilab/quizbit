import React, { useState } from "react";
import Input from "../../../Shared/Input";
import NewQuiz from "./NewQuiz";
import axios from "axios";


interface Option {
  value: string;
  isCorrect: boolean;
}

interface Quiz {
  title: string;
  options: Option[];
}


export default function Form() {
  const [showDescription, setShowDescription] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newQuizes, setNewQuizes] = useState<Quiz[]>([
    { title: "", options: [] },
  ]);

  const handleAddQuiz = () => {
    // Create the quiz data object
    const quizData = {
      title: title,
      description: description,
      quizes: newQuizes,
    };
  
    // Make the API request to save the quiz data
    axios
      .post("http://localhost/wordpress/wp-json/quizbit/v1/quiz", quizData)
      .then((response) => {
        // Handle the successful response
        console.log(response.data); // You can customize this based on your needs
        window.location.href = 'http://localhost/wordpress/wp-admin/admin.php?page=quizbit-all-quizzes';
      })
      .catch((error) => {
        // Handle the error response
        console.error(error); // You can customize this based on your needs
      });
  };
  

  const data = {
    title: title,
    description: description,
    quizes: newQuizes,
  };

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <form onSubmit={(e) => formSubmit(e)}>
      <div>
        <div className="mt-10 md:m-10 p-5 bg-[#fff] lg:w-[50%]">
          <div className="flex flex-col gap-5 p-5">
            <div className="flex justify-between">
              <h2 className="font-bold text-[#6E6E6E]">Quiz Setup</h2>
              <button
                onClick={handleAddQuiz}
                className="bg-[#ECECFC] text-primary font-bold border-[1px] border-primary rounded-md p-2 px-10"
                type="submit"
              >
                Save Quiz
              </button>
            </div>
            <div className="flex flex-col gap-2 mb-5">
              <h2 className="font-bold text-[#6E6E6E]">Title</h2>
              <Input
                value={title}
                type="text"
                placeholder="eg: Quantum Mechanics"
                isQuestion={false}
                onChange={(e) => setTitle(e.target.value)}
              />

              {showDescription ? (
                <Input
                  value={description}
                  type="textarea"
                  placeholder="eg: Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles."
                  isQuestion={false}
                  onChange={(e) => setDescription(e.target.value)}
                />
              ) : (
                <button
                  className="ms-auto text-[#AFA5FF]"
                  onClick={() => setShowDescription(true)}
                >
                  + Description
                </button>
              )}
            </div>
            <NewQuiz newQuizes={newQuizes} setNewQuizes={setNewQuizes} />
          </div>
        </div>
      </div>
    </form>
  );
}
