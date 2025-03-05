<?php

/**
 * Улучшенная функция для получения обрезанного excerpt
 */
function get_custom_excerpt($post_id, $length = 140) {
    // Получаем данные поста
    $post = get_post($post_id);

    // Проверяем, существует ли пост
    if (!$post) {
        return '';
    }

    // Если есть excerpt, используем его
    if (!empty($post->post_excerpt)) {
        $excerpt = $post->post_excerpt;
    } else {
        // Если excerpt отсутствует, очищаем контент от HTML и фильтруем его
        $excerpt = apply_filters('the_content', $post->post_content);
        $excerpt = wp_strip_all_tags($excerpt);
    }

    // Обрезаем текст до 120 символов
    if (mb_strlen($excerpt) > $length) {
        $excerpt = mb_substr($excerpt, 0, $length) . '...';
    }

    return $excerpt;
}
