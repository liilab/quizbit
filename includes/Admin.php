<?php

namespace Quizbit;
use Quizbit\Traits\Singleton;
use Quizbit\Admin\Menu;

/**
 * The admin class
 */
class Admin {
    
    use Singleton;

    /**
     * Initialize the class
     */
    function __construct() {
        new Menu();
    }
}
