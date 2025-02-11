<?php
if (!defined('ABSPATH')) {
	exit;
}

function cas_ajax_search() {
	if (!isset($_POST['search'])) {
		wp_send_json_error(['message' => __('Invalid search request.', 'custom-ajax-search')]);
		return;
	}

	$search_query = sanitize_text_field($_POST['search']);
	$args = [
		's' => $search_query,
		'post_status' => 'publish',
		'post_type' => ['post', 'page'],
		'posts_per_page' => 10,
	];

	$query = new WP_Query($args);

	if ($query->have_posts()) {
		$results = [];
		while ($query->have_posts()) {
			$query->the_post();
			$results[] = [
				'title' => get_the_title(),
				'link' => get_permalink(),
				'excerpt' => get_the_excerpt(),
			];
		}
		wp_reset_postdata();
		wp_send_json_success($results);
	} else {
		wp_send_json_error(['message' => __('No results found.', 'custom-ajax-search')]);
	}
}

add_action('wp_ajax_cas_ajax_search', 'cas_ajax_search');
add_action('wp_ajax_nopriv_cas_ajax_search', 'cas_ajax_search');
