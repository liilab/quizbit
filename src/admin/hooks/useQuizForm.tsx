import axios from "axios";
import { useState, useEffect } from "react";
import useQuizSetting from "./useQuizSetting";
import useOptionSetting from "./useOptionSetting";

interface Option {
  value: string;
  isCorrect: boolean;
}

interface Quiz {
  title: string;
  options: Option[];
}

export default function useQuizForm(id = "") {
  const home_url = (window as any).userLocalize.home_url;
  const site_url = (window as any).userLocalize.site_url;

  const [showDescription, setShowDescription] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newQuizzes, setNewQuizzes] = useState<Quiz[]>([
    { title: "", options: [] },
  ]);

  if (id) {
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
          useQuizSetting({ newQuizzes, setNewQuizzes });
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }, [id]);
  }

  const handleSaveQuiz = () => {
    const quizData = {
      title: title,
      description: description,
      questions: newQuizzes,
    };

    console.log(quizData);

    if (id == "") {
      console.log(quizData);
      axios
        .post(home_url + "/wp-json/quizbit/v1/quiz", quizData)
        .then(() => {
          window.location.href =
            site_url + "/wp-admin/admin.php?page=quizbit#/all-quizzes";
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .put(home_url + `/wp-json/quizbit/v1/quiz/update/${id}`, quizData)
        .then(() => {
          window.location.href =
            site_url + "/wp-admin/admin.php?page=quizbit#/all-quizzes";
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return {
    showDescription,
    setShowDescription,
    title,
    setTitle,
    description,
    setDescription,
    newQuizzes,
    handleSaveQuiz,
    setNewQuizzes,
    formSubmit,
  };
}
