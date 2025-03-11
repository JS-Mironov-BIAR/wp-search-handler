<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function cas_enqueue_assets() {
    wp_enqueue_style( 'cas-style', plugins_url( '../assets/search.css', __FILE__ ) );
    wp_enqueue_script( 'cas-script', plugins_url( '../assets/dist/search.js', __FILE__ ), [], null, true );

    wp_localize_script( 'cas-script', 'cas_ajax', [
        'ajaxurl' => admin_url( 'admin-ajax.php' ),
        'nonce'   => wp_create_nonce( 'cas_search_nonce' )
    ] );

    $translations = array(
        'search'         => __( 'Поиск', 'custom-ajax-search' ),
        'loading'        => __( 'Загрузка', 'custom-ajax-search' ),
        'load_more'      => __( 'Загрузить еще', 'custom-ajax-search' ),
        'no_results'     => __( 'Поиск не дал результатов', 'custom-ajax-search' ),
        'search_results'     => __( 'Результаты поиска', 'custom-ajax-search' ),
        'unknown_btn'    => __( 'Неизвестное состояние кнопки', 'custom-ajax-search' ),
        'cached_data'    => __( '⚡ Данные загружены из кэша:', 'custom-ajax-search' ),
        'server_request' => __( '🌐 Выполняем запрос на сервер:', 'custom-ajax-search' ),
        'search_error'   => __( 'Ошибка поиска:', 'custom-ajax-search' ),
        'request_error'  => __( 'Ошибка при выполнении запроса:', 'custom-ajax-search' )
    );

    wp_localize_script( 'cas-script', 'customAjaxSearchL10n', $translations );
}
add_action( 'wp_enqueue_scripts', 'cas_enqueue_assets' );
