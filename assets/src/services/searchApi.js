/* global cas_ajax */

/**
 * Выполняет AJAX-запрос к кастомному поиску по REST API.
 * @param {string} query - Строка поиска.
 * @param {number} page - Номер страницы (по умолчанию 1).
 * @returns {Promise<object>} - Объект с результатами поиска.
 */
export async function fetchSearchResults(query, page = 1) {
    if (!query.trim() || query.length <= 3) {
        return { success: false, data: [], total_count: 0 };
    }

    try {
        const response = await fetch(`/social-defender/wp-json/cas-search/v1/query/?search=${encodeURIComponent(query)}&page=${page}`);
        const data = await response.json();

        if (!data.success) {
            console.error('Ошибка поиска:', data);
            return { success: false, data: [], total_count: 0 };
        }

        return data;
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        return { success: false, data: [], total_count: 0 };
    }
}
