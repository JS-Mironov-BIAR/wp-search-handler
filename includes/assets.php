<?php
if (!defined('ABSPATH')) {
	exit;
}

function cas_enqueue_assets() {
	wp_enqueue_style('cas-style', plugins_url('../assets/search.css', __FILE__));
	wp_enqueue_script('cas-script', plugins_url('../assets/dist/search.js', __FILE__), [], null, true);

	wp_localize_script('cas-script', 'cas_ajax', [
		'ajaxurl' => admin_url('admin-ajax.php'),
		'nonce' => wp_create_nonce('cas_search_nonce')
	]);
}
add_action('wp_enqueue_scripts', 'cas_enqueue_assets');
