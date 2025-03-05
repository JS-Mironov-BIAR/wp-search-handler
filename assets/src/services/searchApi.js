const searchCache = new Map()

/**
 * Executes an AJAX request to a custom search using the REST API.
 * @param {string} query - The search string.
 * @param {number} page - The page number (default is 1).
 * @returns {Promise<object>} - The object with the search results.
 */
export async function fetchSearchResults(query, page = 1) {
    if (!query.trim() || query.length <= 3) {
        return { success: false, data: [], total_count: 0 }
    }

    const cacheKey = `${query}-${page}`

    if (searchCache.has(cacheKey)) {
        console.log('⚡ Данные загружены из кэша:', cacheKey)
        return searchCache.get(cacheKey)
    }

    try {
        console.log('🌐 Выполняем запрос на сервер:', cacheKey)
        console.log('Загруженный перевод для "loading":', customAjaxSearchL10n.loading);
        const response = await fetch(
            `/social-defender/wp-json/cas-search/v1/query/?search=${encodeURIComponent(query)}&page=${page}`,
        )
        const data = await response.json()

        if (!data.success) {
            console.error('Ошибка поиска:', data)
            return { success: false, data: [], total_count: 0 }
        }

        searchCache.set(cacheKey, data)
        return data
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error)
        return { success: false, data: [], total_count: 0 }
    }
}
