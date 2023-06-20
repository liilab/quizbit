<?php

namespace Quizbit;

use Quizbit\Traits\Singleton;


/**
 * Class API
 * @package Quizbit
 */

class API
{
    use Singleton;

    public $routes = array();

    public function __construct()
    {
        add_action('rest_api_init', [$this, 'register_api']);

        $this->routes = ['Quiz'];
    }

    public function register_api()
    {
        foreach ($this->routes as $route) {
            $class = __NAMESPACE__ . '\\API\\' . $route;
            $instance = new $class();
            $instance->register_routes();
        }
    }
}