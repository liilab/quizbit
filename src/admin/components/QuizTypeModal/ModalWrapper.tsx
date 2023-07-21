import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { QuizType } from "../../../shared/Types";
import { useSelector, useDispatch } from "react-redux"; 

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface LayoutProps {
  children: React.ReactNode;
}

const setQuizType = (quizType) => ({
  type: "SET_QUIZ_TYPE",
  payload: quizType,
});

export default function BasicModal({ children }: LayoutProps) {
  const [open, setOpen] = useState(true);

  const quizType = useSelector((state: any) => state.quizType);
  const dispatch = useDispatch();

  const handleSetQuiz = ( type: string) => {
    setOpen(false);
    dispatch(setQuizType(type));
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p>Quiz Type: {quizType}</p>

          <Button onClick={() => handleSetQuiz("single_choice")}>
            {" "}
            Single Choice
          </Button>
          <Button onClick={() => handleSetQuiz("multiple_choice")}>
            {" "}
            Multiple Choice
          </Button>
        </Box>
      </Modal>
      {!open && <div>{children}</div>}
    </div>
  );
}
