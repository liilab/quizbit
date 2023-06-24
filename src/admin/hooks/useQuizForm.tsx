import axios from "axios";
import { useState, useEffect } from "react";

interface Option {
  value: string;
  isCorrect: boolean;
}

interface Quiz {
  title: string;
  options: Option[];
}

export default function useQuizForm(id?: string) {
  const home_url = (window as any).userLocalize.home_url;
  const site_url = (window as any).userLocalize.site_url;

  const [showDescription, setShowDescription] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newQuizzes, setNewQuizzes] = useState<Quiz[]>([
    { title: "", options: [] },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${home_url}/wp-json/quizbit/v1/quiz/${id}`
        );
        const quiz = response.data.data;
        setTitle(quiz.title);
        setDescription(quiz.description);
        setNewQuizzes(quiz.questions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handleAddQuiz = () => {
    const quizData = {
      title: title,
      description: description,
      quizzes: newQuizzes,
    };

    axios
      .post(home_url + "/wp-json/quizbit/v1/quiz", quizData)
      .then(() => {
        window.location.href =
          site_url + "/wp-admin/admin.php?page=quizbit#/all-quizzes";
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdateQuiz = (id: string) => {
    const quizData = {
      title: title,
      description: description,
      quizzes: newQuizzes,
    };

    axios
      .put(home_url + `/wp-json/quizbit/v1/quiz/update/${id}`, quizData)
      .then(() => {
        window.location.href =
          site_url + "/wp-admin/admin.php?page=quizbit#/all-quizzes";
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const data = {
    title: title,
    description: description,
    quizzes: newQuizzes,
  };

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(data);
  };

  return {
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
  };
}
