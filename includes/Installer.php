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
    }
}
