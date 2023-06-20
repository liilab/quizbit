<?php

/**
 * Plugin Name:       Quizbit
 * Description:       A quiz making plugin for WordPress
 * Requires at least: 6.2
 * Requires PHP:      7.0
 * Version:           1.0
 * Author:            LII Lab
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       quizbit
 */


if (!defined('ABSPATH')) {
    exit;
}

define('Quizbit_DEVELOPMENT', 'yes');

/**
 * The main plugin class
 */
final class Quizbit
{

    /**
     * Plugin version
     *
     * @var string
     */
    const version = '1.0';

    /**
     * Class construcotr
     */
    private function __construct()
    {
        require_once __DIR__ . '/vendor/autoload.php';

        $this->define_constants();

        register_activation_hook(__FILE__, [$this, 'activate']);

        add_action('plugins_loaded', [$this, 'init_plugin']);
        add_filter('script_loader_tag', array($this, 'addModuleToScript'), 10, 3);
    }

    public function addModuleToScript($tag, $handle, $src)
    {
        if ($handle === 'quizbit-admin-js') {
            $tag = '<script type="module" id="quizbit-admin-js" src="' . esc_url($src) . '"></script>';
        }
        return $tag;
    }


    /**
     * Initializes a singleton instance
     *
     * @return \Quizbit
     */
    public static function init()
    {
        static $instance = false;

        if (!$instance) {
            $instance = new self();
        }

        return $instance;
    }

    /**
     * Define the required plugin constants
     *
     * @return void
     */
    public function define_constants()
    {
        define('Quizbit_VERSION', self::version);
        define('Quizbit_FILE', __FILE__);
        define('Quizbit_PATH', __DIR__);
        define('Quizbit_URL', plugins_url('', Quizbit_FILE));
        define('Quizbit_ASSETS', Quizbit_URL . '/assets');
    }

    /**
     * Initialize the plugin
     *
     * @return void
     */
    public function init_plugin()
    {

        if (is_admin()) {
            new Quizbit\Admin();
        }

        new Quizbit\User();
        new Quizbit\API();
    }

    /**
     * Do stuff upon plugin activation
     *
     * @return void
     */
    public function activate()
    {
        $installer = new Quizbit\Installer();
        $installer->run();
    }
}

/**
 * Initializes the main plugin
 *
 * @return \Quizbit
 */
function Quizbit()
{
    return Quizbit::init();
}

// kick-off the plugin
Quizbit();
