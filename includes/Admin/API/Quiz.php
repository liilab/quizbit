<?php

namespace Quizbit\Admin\API;

use Quizbit\Abstracts\RestController;
use WP_REST_Server;
use Quizbit\Admin\Database\Quiz\Quiz as QuizDB;

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
                    'schema'              => array($this, 'get_item_schema'),
                ),
            )
        );


        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/all-quizes',
            array(
                array(
                    'methods'             => WP_REST_Server::READABLE,
                    'callback'            => array($this, 'get_all_quizzes'),
                    'permission_callback' => array($this, 'get_permissions'),
                    'args'                => array(
                        'id' => array(
                            'description' => __('Unique identifier for the object.'),
                            'type'        => 'integer',
                        ),
                    ),
                    'schema'              => array($this, 'get_item_schema'),
                ),
            )
        );

        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/(?P<id>\d+)',
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
                    'schema'              => array($this, 'get_item_schema'),
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
                    'schema'              => array($this, 'get_item_schema'),
                ),
            )
        );
    }


    public function delete_quiz($request)
    {
        $params = $request->get_params();

        $quiz = $this->quizDB;

        $response = $quiz->delete_quiz($params['id']);

        $data = array(
            'data' => $response,
        );

        return new \WP_REST_Response($data, 200);
    }


    public function get_all_quizzes($request)
    {
        $params = $request->get_params();

        $quiz = $this->quizDB;

        $response = $quiz->get_all_quizzes();

        $data = array(
            'data' => $response,
        );

        return new \WP_REST_Response($data, 200);
    }

    public function get_quiz($request)
    {
        $params = $request->get_params();

        $quiz = $this->quizDB;

        $response = $quiz->get_quiz_data($params['id']);

        $data = array(
            'status' => 'success',
            'message' => 'Quiz fetched successfully.',
            'data' => $response,
        );

        return new \WP_REST_Response($data, 200);
    }


    public function create_quiz($request)
    {
        $params = $request->get_params();


        $quiz = $this->quizDB;

        $response = $quiz->insert_quiz_data($params);

        $data = array(
            'status' => 'success',
            'message' => 'Quiz created successfully.',
            'quiz_id' => $response,
            'data' => $params,
        );

        return new \WP_REST_Response($data, 200);
    }

    public function get_permissions()
    {
        return true;
    }

    /**
     * Get the Quiz schema, conforming to JSON Schema.
     *
     * @return array
     */

    public function get_item_schema()
    {
        return array(
            '$schema'    => 'http://json-schema.org/draft-04/schema#',
            'title'      => 'quiz',
            'type'       => 'object',
            'properties' => array(
                'title' => array(
                    'type'        => 'string',
                    'description' => 'The title of the quiz.',
                    'required'    => true,
                ),
                'description' => array(
                    'type'        => 'string',
                    'description' => 'The description of the quiz.',
                    'required'    => true,
                ),
                'quizes' => array(
                    'type'        => 'array',
                    'description' => 'The list of quiz questions and options.',
                    'items'       => array(
                        'type'       => 'object',
                        'properties' => array(
                            'title' => array(
                                'type'        => 'string',
                                'description' => 'The title of the quiz question.',
                                'required'    => true,
                            ),
                            'options' => array(
                                'type'        => 'array',
                                'description' => 'The list of options for the quiz question.',
                                'items'       => array(
                                    'type'       => 'object',
                                    'properties' => array(
                                        'value' => array(
                                            'type'        => 'string',
                                            'description' => 'The value of the option.',
                                            'required'    => true,
                                        ),
                                        'isCorrect' => array(
                                            'type'        => 'boolean',
                                            'description' => 'Indicates if the option is correct or not.',
                                            'required'    => true,
                                        ),
                                    ),
                                ),
                            ),
                        ),
                    ),
                ),
            ),
        );
    }
}
