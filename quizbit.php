<?php

/**
 * QuizBit - A plugin for creating quizzes in WordPress
 * 
 * @since            1.0.0
 * @package          QuizBit
 *
 * Plugin Name:       QuizBit
 * Description:       A plugin for creating quizzes in WordPress
 * Version:           1.0.0
 * Author:            LII Lab
 * Author URI:        https://liilab.com
 * License:           GPL-2.0+
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       quizbit
 * Domain Path:       /languages
 * Tags:              quiz, quiz maker, quiz builder, quiz creator, quiz plugin, quiz plugin for wordpress, quiz plugin wordpress, quiz plugin wp, quiz plugin for wp, quiz plugin for wordpress free
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
	 * Class constructor
	 */
	private function __construct()
	{
		require_once __DIR__ . '/vendor/autoload.php';

		$this->define_constants();

		register_activation_hook(__FILE__, array($this, 'activate'));
		add_action('admin_init', [$this, 'plugin_redirect']);

		add_action('plugins_loaded', array($this, 'init_plugin'));
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
	 * Plugin redirect
	 *
	 * @return void
	 * @since  1.0.0
	 *
	 */

	public function plugin_redirect()
	{
		if (get_option('quizbit_do_activation_redirect', false)) {
			delete_option('quizbit_do_activation_redirect');
			if (!isset($_GET['activate-multi'])) {
				wp_redirect("admin.php?page=quizbit#/add-new");
			}
		}
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

		add_option('quizbit_do_activation_redirect', true);
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