<?php

namespace Quizbit;
use Quizbit\Traits\Singleton;
use Quizbit\User\Shortcode;

/**
 * The User class
 */
class User {
    
    use Singleton;

    /**
     * Initialize the class
     */
    function __construct() {
        new Shortcode();
    }
}
