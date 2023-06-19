<?php

namespace Quizbit\User\API;

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
                ),
            )
        );
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

    public function get_permissions()
    {
        return true;
    }
}
