<?php

namespace Quizbit;

use Quizbit\Traits\Singleton;

/**
 * Installer class
 */
class Installer
{
    use Singleton;

    /**
     * Run the installer
     *
     * @return void
     */
    public function run()
    {
        $this->add_version();
        $this->create_tables();
    }

    /**
     * Add time and version on DB
     */
    public function add_version()
    {
        $installed = get_option('quizbit_installed');

        if (!$installed) {
            update_option('quizbit_installed', time());
        }

        update_option('quizbit_version', Quizbit_VERSION);
    }

    /**
     * Create necessary database tables
     *
     * @return void
     */
    public function create_tables()
    {
        global $wpdb;

        $charset_collate = $wpdb->get_charset_collate();
        if (!function_exists('dbDelta')) {
            require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        }

        $schema = "CREATE TABLE IF NOT EXISTS `{$wpdb->prefix}quizbit_quizzes` (
          `id` INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          `title` VARCHAR(255) NOT NULL,
          `description` TEXT,
          `author` VARCHAR(255),
          `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) $charset_collate";

        dbDelta($schema);

        $schema = "CREATE TABLE IF NOT EXISTS `{$wpdb->prefix}quizbit_questions` (
            `id` INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            `quiz_id` INT(11) UNSIGNED NOT NULL,
            `question_text` TEXT,
            FOREIGN KEY (`quiz_id`) REFERENCES {$wpdb->prefix}quizbit_quizzes(id)
          ) $charset_collate";

        dbDelta($schema);

        $schema = "CREATE TABLE IF NOT EXISTS  `{$wpdb->prefix}quizbit_options` (
            `id` INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            `question_id` INT(11) UNSIGNED NOT NULL,
            `option_text` TEXT,
            `is_correct` TINYINT(1) DEFAULT 0,
            FOREIGN KEY (`question_id`) REFERENCES {$wpdb->prefix}quizbit_questions(id)
          ) $charset_collate";

        dbDelta($schema);
    }
}
