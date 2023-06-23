import React, { useState } from "react";
import Input from "../../../Shared/Input";
import NewQuiz from "./NewQuiz";
import axios from "axios";
import Button from "../../../shared/Button";


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
  const [newQuzzes, setNewQuzzes] = useState<Quiz[]>([
    { title: "", options: [] },
  ]);

  const handleAddQuiz = () => {
    // Create the quiz data object
    const quizData = {
      title: title,
      description: description,
      quzzes: newQuzzes,
    };

    const home_url = (window as any).userLocalize.home_url;
    const site_url = (window as any).userLocalize.site_url;

  
    // Make the API request to save the quiz data
    axios
      .post(home_url + "/wp-json/quizbit/v1/quiz", quizData)
      .then((response) => {
        window.location.href = site_url + '/wp-admin/admin.php?page=quizbit#/all-quizzes';
      })
      .catch((error) => {
        // Handle the error response
        console.error(error); // You can customize this based on your needs
      });
  };
  

  const data = {
    title: title,
    description: description,
    quzzes: newQuzzes,
  };

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <form onSubmit={(e) => formSubmit(e)}>
      <div>
        <div className="bg-[#fff] lg:w-[70%]">
          <div className="flex flex-col gap-5 p-5">
            <div className="flex justify-between">
              <h2 className="font-bold text-secondary-200">Quiz Setup</h2>
              <Button onClick={handleAddQuiz}>Save Quiz</Button>
            </div>
            <div className="flex flex-col gap-2 mb-5">
              <h2 className="font-bold text-secondary-200">Title</h2>
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
            <NewQuiz newQuzzes={newQuzzes} setNewQuzzes={setNewQuzzes} />
          </div>
        </div>
      </div>
    </form>
  );
}
