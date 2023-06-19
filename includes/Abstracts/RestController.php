<?php

namespace Quizbit\Abstracts;
use WP_REST_Controller;

/**
 * Class RestController
 * @package Quizbit\Abstract
 */

abstract class RestController extends WP_REST_Controller
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
    protected $rest_base = '';

}