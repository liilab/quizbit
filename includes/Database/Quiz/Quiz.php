<?php

namespace Quizbit\Database\Quiz;

class Quiz
{

    public function insert_quiz_data($data)
    {
        global $wpdb;

        // Insert the quiz into the `quizbit_quizzes` table
        $wpdb->insert(
            $wpdb->prefix . 'quizbit_quizzes',
            array(
                'title' => $data['title'],
                'description' => $data['description'],
                'author' => 'admin',
            )
        );

        // Get the ID of the inserted quiz
        $quizId = $wpdb->insert_id;

        // Insert the quiz questions and options into the respective tables
        foreach ($data['quzzes'] as $quiz) {
            // Insert the question into the `quizbit_questions` table
            $wpdb->insert(
                $wpdb->prefix . 'quizbit_questions',
                array(
                    'quiz_id' => $quizId,
                    'question_text' => $quiz['title'],
                )
            );

            // Get the ID of the inserted question
            $questionId = $wpdb->insert_id;

            // Insert the options into the `quizbit_options` table
            foreach ($quiz['options'] as $option) {
                $wpdb->insert(
                    $wpdb->prefix . 'quizbit_options',
                    array(
                        'question_id' => $questionId,
                        'option_text' => $option['value'],
                        'is_correct' => $option['isCorrect'] ? 1 : 0,
                    )
                );
            }
        }

        return $quizId;
    }

    public function get_all_quizzes()
    {
        global $wpdb;
        $quizzes = $wpdb->get_results(
            "SELECT * FROM {$wpdb->prefix}quizbit_quizzes"
        );
        return $quizzes;
    }

    public function get_quiz_data($quizId)
    {
        global $wpdb;

        // Get the quiz data from the `quizbit_quizzes` table
        $quiz = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM {$wpdb->prefix}quizbit_quizzes WHERE id = %d",
                $quizId
            )
        );

        // Get the quiz questions from the `quizbit_questions` table
        $questions = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT * FROM {$wpdb->prefix}quizbit_questions WHERE quiz_id = %d",
                $quizId
            )
        );

        // Get the quiz options from the `quizbit_options` table
        foreach ($questions as $question) {
            $question->options = $wpdb->get_results(
                $wpdb->prepare(
                    "SELECT * FROM {$wpdb->prefix}quizbit_options WHERE question_id = %d",
                    $question->id
                )
            );
        }

        // Add the questions to the quiz object
        $quiz->questions = $questions;

        return $quiz;
    }


    public function delete_quiz($quizId)
    {
        global $wpdb;

        // Find question IDs associated with the quiz
        $questionIds = $wpdb->get_col(
            $wpdb->prepare(
                "SELECT id FROM {$wpdb->prefix}quizbit_questions WHERE quiz_id = %d",
                $quizId
            )
        );

        if (!empty($questionIds)) {
            // Find option IDs associated with the questions
            $optionIds = $wpdb->get_col(
                "SELECT id FROM {$wpdb->prefix}quizbit_options WHERE question_id IN (" . implode(',', $questionIds) . ")"
            );

            if (!empty($optionIds)) {
                // Delete the options associated with the questions
                $wpdb->query(
                    $wpdb->prepare(
                        "DELETE FROM {$wpdb->prefix}quizbit_options WHERE id IN (" . implode(',', $optionIds) . ")"
                    )
                );
            }

            // Delete the questions associated with the quiz
            $wpdb->delete(
                $wpdb->prefix . 'quizbit_questions',
                array(
                    'quiz_id' => $quizId,
                )
            );
        }

        // Delete the quiz from the `quizbit_quizzes` table
        $wpdb->delete(
            $wpdb->prefix . 'quizbit_quizzes',
            array(
                'id' => $quizId,
            )
        );

        return true;
    }
}
