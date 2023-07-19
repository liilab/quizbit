import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { QuizType } from "../../../shared/Types";


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
  quizType : QuizType | null;
  setQuizType: (quizType: QuizType) => void;
  children: React.ReactNode;
}

export default function BasicModal({
  quizType,
  setQuizType,
  children,
}: LayoutProps) {
  const [open, setOpen] = useState(true);
  const handleSetQuiz = (type: QuizType) => {
    setOpen(false);
    setQuizType(type);
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button onClick={() => handleSetQuiz("single_choice")}> Single Choice</Button>
          <Button onClick={() => handleSetQuiz("multiple_choice")}> Multiple Choice</Button>
        </Box>
      </Modal>
      {!open && <div>{children}</div>}
    </div>
  );
}
