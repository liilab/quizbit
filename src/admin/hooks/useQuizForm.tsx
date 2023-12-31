import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

interface Option {
  value: string;
  isCorrect: boolean;
}

interface Question {
  title: string;
  options: Option[];
}

export default function useQuestionsForm(id = "") {
  const home_url = (window as any).userLocalize.home_url;
  const site_url = (window as any).userLocalize.site_url;

  const [showDescription, setShowDescription] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newQuestions, setNewQuestions] = useState<Question[]>([]);

  if (id) {
    useEffect(() => {
      axios.interceptors.request.use(

        function (config) {
          config.headers["X-WP-Nonce"] = (window as any).userLocalize.nonce;
          return config;
        },
        function (error) {
          return Promise.reject(error);
        }
      );

      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${home_url}/wp-json/quizbit/v1/quiz/1/id/${id}`
          );
          const quiz = response.data.data;
          setTitle(quiz.title);
          setDescription(quiz.description);
          setNewQuestions(quiz.questions);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }, [id]);
  } else {
    useEffect(() => {
      setTitle("");
      setDescription("");
      setNewQuestions([
        {
          title: "",
          options: [
            { value: "", isCorrect: false },
            { value: "", isCorrect: false },
          ],
        },
      ]);
    }, [id]);
  }

  const handleSaveQuiz = () => {
    const quizData = {
      title: title,
      description: description,
      questions: newQuestions,
    };

    if (id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      }).then((result) => {
        if (result.isConfirmed) {
          
          axios.interceptors.request.use(
            function (config) {
              config.headers["X-WP-Nonce"] = (window as any).userLocalize.nonce;
              return config;
            },
            function (error) {
              return Promise.reject(error);
            }
          );

          axios
            .put(home_url + `/wp-json/quizbit/v1/quiz/update/${id}`, quizData)
            .then(() => {
              window.location.href =
                site_url + "/wp-admin/admin.php?page=quizbit#/all-quizzes";
            })
            .catch((error) => {
              console.error(error);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
            })
            .finally(() => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Quiz has been updated",
                showConfirmButton: false,
                timer: 2500,
              });
            });
        }
      });
    } else {

      axios.interceptors.request.use(
        function (config) {
          config.headers["X-WP-Nonce"] = (window as any).userLocalize.nonce;
          return config;
        },
        function (error) {
          return Promise.reject(error);
        }
      );
      
      axios
        .post(home_url + "/wp-json/quizbit/v1/quiz", quizData)
        .then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Quiz has been saved",
            showConfirmButton: false,
            timer: 2500,
          });
          window.location.href =
            site_url + "/wp-admin/admin.php?page=quizbit#/all-quizzes";
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
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
    newQuestions,
    handleSaveQuiz,
    setNewQuestions,
    formSubmit,
  };
}
