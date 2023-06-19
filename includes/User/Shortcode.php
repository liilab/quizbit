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
        add_shortcode('quizbit_current_user_info', [$this, 'quizbit_current_user_info_callback']);
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
        );
        wp_localize_script('quizbit-user', 'userLocalize', $data);
    }


    /**
     * Current user info shortcode callback
     *
     * @return void
     */


    public function quizbit_current_user_info_callback($atts)
    {
        $atts = shortcode_atts(array(
            'id' => '0',
        ), $atts, 'quizbit_current_user_info');

        $atts = htmlspecialchars(json_encode($atts));

        return '<div id="quizbit_current_user_info" quizbit_current_user_info="' . $atts . '"></div>';
    }
}
