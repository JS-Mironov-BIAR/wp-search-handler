<?php
/**
 * Plugin Name: Custom AJAX Search
 * Plugin URI:  https://yourwebsite.com
 * Description: AJAX-поиск для WordPress с поддержкой шорткодов и мультиязычности.
 * Version:     1.0.0
 * Author:      Egor Mironov
 * Author URI:  https://yourwebsite.com
 * License:     GPL2
 * Text Domain: custom-ajax-search
 * Domain Path: /languages
 */

if (!defined('ABSPATH')) {
	exit; // Защита от прямого доступа
}

// Подключение файлов
require_once plugin_dir_path(__FILE__) . 'includes/init.php';
