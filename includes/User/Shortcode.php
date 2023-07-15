<?php

namespace Quizbit\User;

use Quizbit\Traits\Singleton;
use Kucrut\Vite;

/**
 * Shortcode class
 */

class Shortcode
{

    use Singleton;

    /**
     * Initialize the class
     */
    function __construct()
    {
        add_shortcode('quizbit', [$this, 'quiz_shortcode']);
        add_action('wp_enqueue_scripts', [$this, 'enqueue_scripts']);
        add_filter('script_loader_tag', array($this, 'add_module_to_script'), 10, 3);
    }

    /**
     * Add module to script
     *
     * @param string $tag
     * @param string $handle
     * @param string $src
     * @return string
     */

    public function add_module_to_script($tag, $handle, $src)
    {
        if ($handle === 'quizbit-user') {
            $tag = '<script type="module" id="quizbit-user" src="' . esc_url($src) . '"></script>';
        }
        return $tag;
    }


    /**
     * Enqueue scripts and styles.
     *
     * @return void
     */
    public function enqueue_scripts()
    {
        if (defined('Quizbit_DEVELOPMENT') && Quizbit_DEVELOPMENT === 'yes') {
            Vite\enqueue_asset(Quizbit_PATH . '/dist', 'src/user/user.tsx', ['handle' => 'quizbit-user', 'in-footer' => true]);
        } else {

            wp_enqueue_style('quizbit-user', Quizbit_URL . '/dist/css/user.css', [], Quizbit_VERSION);
            wp_enqueue_script('quizbit-user', Quizbit_URL . '/dist/js/user.js', ['jquery'], Quizbit_VERSION, true);
        }

        //Localize the script with new data
        $data = array(
            'home_url' => home_url(),
            'nonce' => wp_create_nonce('wp_rest'),
        );
        wp_localize_script('quizbit-user', 'userLocalize', $data);
    }


    /**
     * Quiz Card shortcode callback
     *
     * @return void
     */


    public function quiz_shortcode($atts)
    {
        $atts = htmlspecialchars(json_encode($atts));
        return '<div id="quizbit-quiz-card" quizbit-quiz-card="' . $atts . '"></div>';
    }
}
