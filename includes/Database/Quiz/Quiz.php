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

        // Insert the updated questions and options
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

        return array(
            'id' => $quizId,
            'data' => $this->get_quiz_data($quizId, 1),
        );
    }

    public function update_quiz_data($quizId, $data)
    {
        global $wpdb;

        // Update the quiz data in the `quizbit_quizzes` table
        $wpdb->update(
            $wpdb->prefix . 'quizbit_quizzes',
            array(
                'title' => $data['title'],
                'description' => $data['description'],
            ),
            array('id' =>  $quizId)
        );

        // Delete the existing options associated with the questions
        $wpdb->query($wpdb->prepare(
            'DELETE FROM ' . $wpdb->prefix . 'quizbit_options WHERE question_id IN (SELECT id FROM ' . $wpdb->prefix . 'quizbit_questions WHERE quiz_id = %d)',
            $quizId
        ));

        // Delete the existing questions associated with the quiz
        $wpdb->delete(
            $wpdb->prefix . 'quizbit_questions',
            array('quiz_id' => $quizId)
        );

        // Insert the updated questions and options
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

        return array(
            'id' => $quizId,
            'data' => $this->get_quiz_data($quizId, 1),
        );
    }

    public function get_all_quizzes()
    {
        global $wpdb;
        $quizzes = $wpdb->get_results(
            "SELECT * FROM {$wpdb->prefix}quizbit_quizzes"
        );
        return $quizzes;
    }

    public function get_quiz_data($quizId, $source = '0')
    {
        global $wpdb;

        $isActive = $wpdb->get_var(
            $wpdb->prepare(
                "SELECT isActive FROM {$wpdb->prefix}quizbit_quizzes WHERE id = %d",
                $quizId
            )
        );

        $isActive = ($isActive == 1) ? true : false;

        if ($source == '1') {
            $isActive = true;
        }

        if ($isActive) {
            $quiz = $wpdb->get_row(
                $wpdb->prepare(
                    "SELECT title, description FROM {$wpdb->prefix}quizbit_quizzes WHERE id = %d",
                    $quizId
                )
            );

            $questions = $wpdb->get_results(
                $wpdb->prepare(
                    "SELECT title, id FROM {$wpdb->prefix}quizbit_questions WHERE quiz_id = %d",
                    $quizId
                )
            );

            foreach ($questions as $question) {
                $question->options = $wpdb->get_results(
                    $wpdb->prepare(
                        "SELECT value, isCorrect FROM {$wpdb->prefix}quizbit_options WHERE question_id = %d",
                        $question->id
                    )
                );
                unset($question->id);
            }

            $quiz->questions = $questions;

            return $quiz;
        } else {
            return null;
        }
    }

    public function delete_quiz($quizId)
    {
        global $wpdb;

        $questionIds = $wpdb->get_col(
            $wpdb->prepare(
                "SELECT id FROM {$wpdb->prefix}quizbit_questions WHERE quiz_id = %d",
                $quizId
            )
        );

        if (!empty($questionIds)) {
            $optionIds = $wpdb->get_col(
                "SELECT id FROM {$wpdb->prefix}quizbit_options WHERE question_id IN (" . implode(',', $questionIds) . ")"
            );

            if (!empty($optionIds)) {
                $wpdb->query(
                    $wpdb->prepare(
                        "DELETE FROM {$wpdb->prefix}quizbit_options WHERE id IN (" . implode(',', $optionIds) . ")"
                    )
                );
            }

            $wpdb->delete(
                $wpdb->prefix . 'quizbit_questions',
                array(
                    'quiz_id' => $quizId,
                )
            );
        }

        $wpdb->delete(
            $wpdb->prefix . 'quizbit_quizzes',
            array(
                'id' => $quizId,
            )
        );

        return true;
    }
}
