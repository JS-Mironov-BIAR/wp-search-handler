<?php
if (!defined('ABSPATH')) {
	exit;
}

// Локализация
function cas_load_textdomain() {
	load_plugin_textdomain('custom-ajax-search', false, dirname(plugin_basename(__FILE__)) . '/languages');
}
add_action('init', 'cas_load_textdomain');

// Подключение остальных файлов
require_once plugin_dir_path(__FILE__) . 'search-handler.php';
require_once plugin_dir_path(__FILE__) . 'shortcode.php';
require_once plugin_dir_path(__FILE__) . 'assets.php';
