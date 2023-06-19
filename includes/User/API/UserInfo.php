<?php

namespace Quizbit\User\API;

use Quizbit\Abstracts\RestController;

/**
 * The UserInfo API class
 */

class UserInfo extends RestController
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
    protected $rest_base = 'user-info';


    /**
     * Register the routes for the objects of the controller.
     */

    public function register_routes()
    {
        register_rest_route($this->namespace, '/' . $this->rest_base .  '/(?P<id>\d+)', [
            [
                'methods' => \WP_REST_Server::READABLE,
                'callback' => [$this, 'get_item'],
                'permission_callback' => [$this, 'get_item_permissions_check'],
                'args' => $this->get_collection_params()
            ],
            [
                'methods' => \WP_REST_Server::EDITABLE,
                'callback' => [$this, 'update_item'],
                'permission_callback' => [$this, 'update_item_permissions_check'],
                'args' => $this->get_endpoint_args_for_item_schema(\WP_REST_Server::EDITABLE)
            ],
        ]);
    }

    /**
     * Get the UserInfo
     *
     * @param \WP_REST_Request $request
     * @return \WP_REST_Response
     */

    public function get_item($request)
    {
        $params = $request->get_params();
        $user_id = $params['id'];
        $user_info = [];

        if ($user_id == 1) {
            $user_info = [
                'id' => 1,
                'name' => "Sabbir Ahmed Talukdar",
                'email' => "satsabbir11@gmail.com",
                'occupation' => 'Software Engineer',
                'avatar' => 'https://media.licdn.com/dms/image/D5603AQH7R4yNbGurRA/profile-displayphoto-shrink_200_200/0/1679336553057?e=1692230400&v=beta&t=6QU_NjwL1ZcECOgQ8kb87O-mORbpeW0ZKch3MZ-qOR0',
            ];
        }
        else{
            $user_info = [
                'id' => 2,
                'name' => "John Doe",
                'email' => "john@gmail.com",
                'occupation' => 'Wordpress Engineer',
                'avatar' => 'https://media.licdn.com/dms/image/D5603AQEOjP3ON2knRg/profile-displayphoto-shrink_800_800/0/1677507598430?e=1692230400&v=beta&t=gm475tVtNyY_i_6djH2DS7vVTcdBE5kJj0kf88-3Tcc',
            ];
        }

        return rest_ensure_response($user_info);
    }

    /**
     * Check if a given request has access to get item
     *
     * @param \WP_REST_Request $request
     * @return \WP_Error|bool
     */

    public function get_item_permissions_check($request)
    {
        return true;
    }
}
