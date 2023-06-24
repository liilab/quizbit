import React from "react";
import Input from "../../../Shared/Input";
import NewQuiz from "./NewQuiz";
import Button from "../../../shared/Button";
import useQuizForm from "../../hooks/useQuizForm";

export default function Form({ id }) {
  const {
    showDescription,
    setShowDescription,
    title,
    setTitle,
    description,
    setDescription,
    newQuizzes,
    setNewQuizzes,
    handleAddQuiz,
    handleUpdateQuiz,
    formSubmit,
  } = useQuizForm(id);

  return (
    <form onSubmit={(e) => formSubmit(e)}>
      <div>
        <div className="bg-[#fff] lg:w-[70%]">
          <div className="flex flex-col gap-5 p-5">
            <div className="flex justify-between">
              <h2 className="font-bold text-secondary-200">Quiz Setup</h2>
              {id ? (
               <Button onClick={() => handleUpdateQuiz(id)}>Update Quiz</Button>
              ) : (
                <Button onClick={handleAddQuiz}>Save Quiz</Button>
              )}
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
            <NewQuiz newQuizzes={newQuizzes} setNewQuizzes={setNewQuizzes} />
          </div>
        </div>
      </div>
    </form>
  );
}
