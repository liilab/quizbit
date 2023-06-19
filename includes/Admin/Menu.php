<?php

namespace  Quizbit\Admin;

use Quizbit\Traits\Singleton;
use Kucrut\Vite;

/**
 * The Menu handler class
 */
class Menu
{
    use Singleton;

    /**
     * Initialize the class
     */
    function __construct()
    {
        add_action('admin_menu', [$this, 'admin_menu']);
        add_action('admin_enqueue_scripts', [$this, 'admin_enqueue_scripts']);
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
        if ($handle === 'quizbit-admin') {
            $tag = '<script type="module" id="quizbit-admin" src="' . esc_url($src) . '"></script>';
        }
        return $tag;
    }

    /**
     * Enqueue scripts and styles.
     *
     * @return void
     */
    public function admin_enqueue_scripts()
    {
        if (defined('Quizbit_DEVELOPMENT') && Quizbit_DEVELOPMENT === 'yes') {
            Vite\enqueue_asset(Quizbit_PATH . '/dist', 'src/admin/admin.tsx', ['handle' => 'quizbit-admin', 'in-footer' => true]);
        } else {

            wp_enqueue_style('quizbit-admin', Quizbit_URL . '/dist/css/admin.css', [], Quizbit_VERSION);
            wp_enqueue_script(
                'quizbit-admin',
                Quizbit_URL . '/dist/js/admin.js',
                array('wp-element'),
                Quizbit_VERSION,
                true
            );
        }
        //Localize the script with new data
        $data = array(
            'home_url' => home_url(),
        );
        wp_localize_script('quizbit-admin', 'userLocalize', $data);
    }

    /**
     * Register admin menu
     *
     * @return void
     */
    public function admin_menu()
    {
        $parent_slug = 'quizbit';
        $capability = 'manage_options';

        add_menu_page(__('Quizbit', 'quizbit'), __('Quizbit', 'quizbit'), $capability, $parent_slug,  [$this, 'quizbit'], 'dashicons-admin-post', '2.1');
        global $submenu;

        $submenu[$parent_slug]['all-quizzes'] = array(
            'All Quizzes',
            'manage_options',
            'admin.php?page=quizbit#/all-quizzes',
        );

        $submenu[$parent_slug]['add-new'] = array(
            'Add New',
            'manage_options',
            'admin.php?page=quizbit#/add-new',
        );
    }

    /**
     * Render the main
     *
     * @return void
     */
    public function quizbit()
    {
        echo '<div id="quizbit"></div>';
    }
}
