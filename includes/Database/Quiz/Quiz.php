<?php

namespace Quizbit\Database\Quiz;

class Quiz
{

    public function insert_quiz_data($data)
    {
        global $wpdb;
        $wpdb->insert(
            $wpdb->prefix . 'quizbit_quizzes',
            array(
                'title' => $data['title'],
                'description' => $data['description'],
            )
        );
        $quizId = $wpdb->insert_id;
        foreach ($data['questions'] as $quiz) {
            $wpdb->insert(
                $wpdb->prefix . 'quizbit_questions',
                array(
                    'quiz_id' => $quizId,
                    'title' => $quiz['title'],
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
                        'value' => $option['value'],
                        'isCorrect' => $option['isCorrect'] ? 1 : 0,
                    )
                );
            }
        }

        return $quizId;
    }

    public function update_quiz_data($data)
    {
        global $wpdb;

        // Update the quiz data in the `quizbit_quizzes` table
        $wpdb->update(
            $wpdb->prefix . 'quizbit_quizzes',
            array(
                'title' => $data['title'],
                'description' => $data['description'],
            ),
            array('id' => $data['id'])
        );

        // Delete the existing options associated with the questions
        $wpdb->query($wpdb->prepare(
            'DELETE FROM ' . $wpdb->prefix . 'quizbit_options WHERE question_id IN (SELECT id FROM ' . $wpdb->prefix . 'quizbit_questions WHERE quiz_id = %d)',
            $data['id']
        ));

        // Delete the existing questions associated with the quiz
        $wpdb->delete(
            $wpdb->prefix . 'quizbit_questions',
            array('quiz_id' => $data['id'])
        );

        // Insert the updated questions and options
        foreach ($data['questions'] as $quiz) {
            $wpdb->insert(
                $wpdb->prefix . 'quizbit_questions',
                array(
                    'quiz_id' => $data['id'],
                    'title' => $quiz['title'],
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
                        'value' => $option['value'],
                        'isCorrect' => $option['isCorrect'] ? 1 : 0,
                    )
                );
            }
        }

        return $data['id'];
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

        // Check if the quiz is active
        $isActive = $wpdb->get_var(
            $wpdb->prepare(
                "SELECT isActive FROM {$wpdb->prefix}quizbit_quizzes WHERE id = %d",
                $quizId
            )
        );

        $isActive = ($isActive == 1) ? true : false;


        // Fetch quiz data only if it is active
        if ($isActive) {
            // Get the quiz data from the `quizbit_quizzes` table without the 'id' column
            $quiz = $wpdb->get_row(
                $wpdb->prepare(
                    "SELECT title, description FROM {$wpdb->prefix}quizbit_quizzes WHERE id = %d",
                    $quizId
                )
            );

            // Get the quiz questions from the `quizbit_questions` table without the 'id' and 'quiz_id' columns
            $questions = $wpdb->get_results(
                $wpdb->prepare(
                    "SELECT title, id FROM {$wpdb->prefix}quizbit_questions WHERE quiz_id = %d",
                    $quizId
                )
            );

            // Get the quiz options from the `quizbit_options` table without the 'id' and 'question_id' columns
            foreach ($questions as $question) {
                $question->options = $wpdb->get_results(
                    $wpdb->prepare(
                        "SELECT value, isCorrect FROM {$wpdb->prefix}quizbit_options WHERE question_id = %d",
                        $question->id
                    )
                );
                unset($question->id); // Remove the 'id' property from the question object
            }

            // Add the questions to the quiz object
            $quiz->questions = $questions;

            return $quiz;
        } else {
            // Quiz is not active, return null or an appropriate response
            return null;
        }
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
