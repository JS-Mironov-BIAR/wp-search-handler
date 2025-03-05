<?php
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Gets the search query parameters.
 */
function get_search_params($request): array {
    return [
        'query' => sanitize_text_field($request['search']),
        'page' => isset($request['page']) ? absint($request['page']) : 1,
        'per_page' => 10,
        'post_types' => ['post', 'page'],
    ];
}

/**
 * Performs WP_Query with improved search.
 */
function perform_wp_query($params) {
    $args = [
        'post_status' => ['publish'],
        'post_type' => $params['post_types'],
        'posts_per_page' => $params['per_page'],
        'paged' => $params['page'],
        's' => $params['query'],
        'orderby' => 'relevance'
    ];

    // Checking if there are tags matching the query
    $tag = get_term_by('name', $params['query'], 'post_tag');
    if ($tag) {
        $args['tax_query'] = [
            [
                'taxonomy' => 'post_tag',
                'field'    => 'id',
                'terms'    => $tag->term_id
            ]
        ];
    }

    return new WP_Query($args);
}

/**
 * Formats the JSON API response.
 */
function format_search_response($query, $params) {
    $results = [];

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $results[] = [
                'id' => get_the_ID(),
                'attributes' => [
                    'title' => get_the_title(),
                    'excerpt' => get_custom_excerpt(get_the_ID()),
                    'full_content' => apply_filters('the_content', get_the_content()),
                ],
                'relationships' => [
                    'link' => get_permalink(),
                    'tags' => wp_get_post_tags(get_the_ID(), ['fields' => 'names'])
                ],
                'meta' => [
                    'post_type' => get_post_type(),
                    'published_at' => get_the_date('c')
                ]
            ];
        }
        wp_reset_postdata();
    }

    return [
        'success' => true,
        'pagination' => [
            'current_page' => $params['page'],
            'per_page' => $params['per_page'],
            'total_pages' => ceil($query->found_posts / $params['per_page']),
            'has_more' => ($params['page'] * $params['per_page']) < $query->found_posts,
            'total_count' => $query->found_posts
        ],
        'search_info' => [
            'query' => $params['query'],
            'filters' => [
                'post_type' => $params['post_types'],
                'search_in' => ['title', 'content', 'tags'],
                'date_range' => null
            ]
        ],
        'data' => $results
    ];
}

/**
 * The main function of the REST search API.
 */
function cas_rest_search($request) {
    $params = get_search_params($request);
    $query = perform_wp_query($params);


    /*    error_log("🔍 Поиск: " . $params['query']);
    error_log("📌 SQL-запрос WP_Query: " . json_encode($query->query_vars));
    error_log("📌 Найдено записей: " . $query->found_posts); */

    return rest_ensure_response(format_search_response($query, $params));
}

// Registering an API route
add_action('rest_api_init', function () {
    register_rest_route('cas-search/v1', '/query/', [
        'methods' => 'GET',
        'callback' => 'cas_rest_search',
        'permission_callback' => '__return_true'
    ]);
});
