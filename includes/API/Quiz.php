<?php

namespace Quizbit\API;

use Quizbit\Abstracts\RestController;
use WP_REST_Server;
use Quizbit\Database\Quiz\Quiz as QuizDB;

/**
 * The UserInfo API class
 */

class Quiz extends RestController
{

    /**
     * Endpoint namespace.
     *
     * @var string
     */
    protected $namespace = 'quizbit/v1';

    /**
     * Route base.
     *
     * @var string
     */
    protected $rest_base = 'quiz';

    /**
     * QuizDB instance
     *
     * @var QuizDB
     */

    protected $quizDB;

    /**
     * Initialize the class
     */
    public function __construct()
    {
        $this->quizDB = new QuizDB();
    }

    /**
     * Register the routes for products.
     */
    public function register_routes()
    {
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base,
            array(
                array(
                    'methods'             => WP_REST_Server::CREATABLE,
                    'callback'            => array($this, 'create_quiz'),
                    'permission_callback' => array($this, 'get_permissions'),
                ),
            )
        );


        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base  . '/update/(?P<id>\d+)',
            array(
                array(
                    'methods'             => WP_REST_Server::EDITABLE,
                    'callback'            => array($this, 'update_quiz'),
                    'permission_callback' => array($this, 'get_permissions'),
                ),
            )
        );


        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/all-quizzes',
            array(
                array(
                    'methods'             => WP_REST_Server::READABLE,
                    'callback'            => array($this, 'get_all_quizzes'),
                    'permission_callback' => array($this, 'get_permissions'),
                ),
            )
        );


        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/(?P<source>[01])/id/(?P<id>\d+)',
            array(
                array(
                    'methods'             => WP_REST_Server::READABLE,
                    'callback'            => array($this, 'get_quiz'),
                    'permission_callback' => array($this, 'get_permissions'),
                    'args'                => array(
                        'id' => array(
                            'description' => __('Unique identifier for the object.'),
                            'type'        => 'integer',
                        ),
                    ),
                ),
            )
        );

        //delete quiz by id

        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/delete/(?P<id>\d+)',
            array(
                array(
                    'methods'             => WP_REST_Server::DELETABLE,
                    'callback'            => array($this, 'delete_quiz'),
                    'permission_callback' => array($this, 'get_permissions'),
                    'args'                => array(
                        'id' => array(
                            'description' => __('Unique identifier for the object.'),
                            'type'        => 'integer',
                        ),
                    ),
                ),
            )
        );

        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/updatestatus/(?P<id>\d+)',
            array(
                'methods'             => WP_REST_Server::EDITABLE,
                'callback'            => array($this, 'setstatus_quiz'),
                'permission_callback' => array($this, 'get_permissions'),
                'args'                => array(
                    'id' => array(
                        'description' => __('Unique identifier for the object.'),
                        'type'        => 'integer',
                    ),
                ),
                'schema'              => array($this, 'get_item_schema'),
            )
        );

        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/getstatus/(?P<id>\d+)',
            array(
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => array($this, 'checkstatus_quiz'),
                'permission_callback' => array($this, 'get_permissions'),
                'args'                => array(
                    'id' => array(
                        'description' => __('Unique identifier for the object.'),
                        'type'        => 'integer',
                    ),
                ),
                'schema'              => array($this, 'get_item_schema'),
            )
        );
    }

    public function checkstatus_quiz($request)
    {
        if (!wp_verify_nonce($request->get_header('X-WP-Nonce'), 'wp_rest')) {
            return new \WP_Error(
                'unauthorized',
                __('Unauthorized request.'),
                array('status' => 401)
            );
        }

        global $wpdb;
        $params = $request->get_params();

        $id = sanitize_text_field($params['id']);

        $isActive = $wpdb->get_var(
            $wpdb->prepare(
                "SELECT isactive FROM {$wpdb->prefix}quizbit_quizzes WHERE id = %d",
                $id
            )
        );

        if ($isActive === null) {
            return new \WP_Error(
                'not_found',
                __('Quiz not found.'),
                array('status' => 404)
            );
        }

        $data = array(
            'status'  => 'success',
            'message' => __('Quiz status retrieved successfully.'),

            'isactive' => $isActive,

        );

        return new \WP_REST_Response($data, 200);
    }


    public function setstatus_quiz($request)
    {
        if (!wp_verify_nonce($request->get_header('X-WP-Nonce'), 'wp_rest')) {
            return new \WP_Error(
                'unauthorized',
                __('Unauthorized request.'),
                array('status' => 401)
            );
        }

        global $wpdb;
        $params = $request->get_params();

        $id = sanitize_text_field($params['id']);
        $isactive = sanitize_text_field($params['isactive']);

        if (!isset($isactive)) {
            return new \WP_Error(
                'missing_data',
                __('Missing isactive field in the request body.'),
                array('status' => 400)
            );
        }

        // Update the isactive status in the database
        $result = $wpdb->update(
            "{$wpdb->prefix}quizbit_quizzes",
            array('isactive' => $isactive),
            array('id' => $id)
        );

        if ($result === false) {
            return new \WP_Error(
                'update_failed',
                __('Failed to update the quiz status.'),
                array('status' => 500)
            );
        }

        $data = array(
            'status'  => 'success',
            'message' => 'Quiz status updated successfully.',
            'response'   => $result,
        );

        return new \WP_REST_Response($data, 200);
    }

    public function delete_quiz($request)
    {
        if (!wp_verify_nonce($request->get_header('X-WP-Nonce'), 'wp_rest')) {
            return new \WP_Error(
                'unauthorized',
                __('Unauthorized request.'),
                array('status' => 401)
            );
        }

        $params = $request->get_params();
        $id = sanitize_text_field($params['id']);

        $quiz = $this->quizDB;
        $response = $quiz->delete_quiz($id);

        $data = array(
            'status'  => 'success',
            'message' => 'Quiz deleted successfully.',
            'response'   => $response,
        );

        return new \WP_REST_Response($data, 200);
    }

    public function update_quiz($request)
    {
        if (!wp_verify_nonce($request->get_header('X-WP-Nonce'), 'wp_rest')) {
            return new \WP_Error(
                'unauthorized',
                __('Unauthorized request.'),
                array('status' => 401)
            );
        }

        $params = $request->get_params();
        $quizId = sanitize_text_field($params['id']);
        $sanitized_params = $this->sanitize_data($params);

        $quiz = $this->quizDB;
        $response = $quiz->update_quiz_data($quizId, $sanitized_params);

        $data = array(
            'status'  => 'success',
            'message' => 'Quiz updated successfully.',
            'response'   => $response,
        );

        return new \WP_REST_Response($data, 200);
    }


    public function get_all_quizzes($request)
    {
        if (!wp_verify_nonce($request->get_header('X-WP-Nonce'), 'wp_rest')) {
            return new \WP_Error(
                'unauthorized',
                __('Unauthorized request.'),
                array('status' => 401)
            );
        }

        $quiz = $this->quizDB;

        $response = $quiz->get_all_quizzes();

        $data = array(
            'status'  => 'success',
            'message' => 'Quiz fetched successfully.',
            'data'   => $response,
        );

        return new \WP_REST_Response($data, 200);
    }

    public function get_quiz($request)
    {
        if (!wp_verify_nonce($request->get_header('X-WP-Nonce'), 'wp_rest')) {
            return new \WP_Error(
                'unauthorized',
                __('Unauthorized request.'),
                array('status' => 401)
            );
        }

        $quiz = $this->quizDB;
        $params = $request->get_params();

        $id = sanitize_text_field($params['id']);
        $source = sanitize_text_field($params['source']);

        $response = $quiz->get_quiz_data($id, $source);

        $data = array(
            'status' => 'success',
            'message' => 'Quiz fetched successfully.',
            'data' => $response,
        );

        return new \WP_REST_Response($data, 200);
    }

    public function create_quiz($request)
    {
        if (!wp_verify_nonce($request->get_header('X-WP-Nonce'), 'wp_rest')) {
            return new \WP_Error(
                'unauthorized',
                __('Unauthorized request.'),
                array('status' => 401)
            );
        }

        $params = $request->get_params();
        $sanitized_params = $this->sanitize_data($params);

        $quiz = $this->quizDB;
        $response = $quiz->insert_quiz_data($sanitized_params);

        $data = array(
            'status'  => 'success',
            'message' => 'Quiz created successfully.',
            'response'   => $response,
        );

        return new \WP_REST_Response($data, 200);
    }

    public function sanitize_data($params)
    {
        // Sanitize and validate user input
        $sanitized_params = array(
            'title'       => sanitize_text_field($params['title']),
            'description' => sanitize_text_field($params['description']),
            'questions'   => array(),
        );

        foreach ($params['questions'] as $question) {
            $sanitized_quiz = array(
                'title'   => sanitize_text_field($question['title']),
                'options' => array(),
            );

            foreach ($question['options'] as $option) {
                $sanitized_option = array(
                    'value'     => sanitize_text_field($option['value']),
                    'isCorrect' => isset($option['isCorrect']) ? (bool) $option['isCorrect'] : false,
                );
                $sanitized_quiz['options'][] = $sanitized_option;
            }

            $sanitized_params['questions'][] = $sanitized_quiz;
        }

        return $sanitized_params;
    }


    public function get_permissions()
    {
        return array(
            'edit_posts',
        );
    }
}
