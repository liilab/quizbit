<?php

namespace Quizbit;

use Quizbit\Traits\Singleton;

/**
 * Class Helper
 * @package Quizbit
 * 
 * usuage:
 * 
 * use Quizbit\Helper;
 * Helper::get_current_user_id();
 * 
 */

class Helper
{

    use Singleton;

    /**
     * Current User ID
     * 
     * @return int
     */

    public static function get_current_user_id()
    {
        $current_user = wp_get_current_user();
        return $current_user->ID;
    }

    /**
     * Return Error response
     * 
     * @param string $message
     * 
     * @return void
     */

    public static function return_error_response($message = "Something Error!")
    {
        $response = array(
            "status" => "error",
            "message" => $message,
        );

        echo json_encode($response);
        wp_die();
    }

    /**
     * String Cleaner
     * 
     * @param string $string
     * 
     * @return string
     */

    public static function clean($string)
    {
        $string = str_replace(' ', '-', $string); // Replaces all spaces with hyphens.
        $string = preg_replace('/[^A-Za-z0-9\-]/', '', $string); // Removes special chars.

        return preg_replace('/-+/', '-', $string); // Replaces multiple hyphens with single one.
    }


    /**
     * Ensure absolute link
     *
     * @param string $url
     * @return string
     */

    public static function ensure_absolute_link($url)
    {
        if (!preg_match('~^(?:f|ht)tps?://~i', $url)) {
            $url = get_site_url(null, $url);
        }
        if (substr($url, 0, 2) === '//') {
            $url = 'https:' . $url;
        }
        return $url;
    }
}
