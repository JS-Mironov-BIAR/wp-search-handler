<?php
if (!defined('ABSPATH')) {
	exit;
}
require_once plugin_dir_path(__FILE__) . 'search-form.php';

/**
 * A shortcode for displaying a custom search form
 * Usage: [custom_ajax_search]
 */

function cas_search_shortcode($atts) {
	return cas_get_search_form();
}
add_shortcode('custom_ajax_search', 'cas_search_shortcode');
