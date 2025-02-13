/* global cas_ajax */

import { showLoader, hideLoader } from './components/preloader'
import { isLoading, setLoading } from './components/input/inputState'
import { clearResults, showResults } from './components/resultList.js'

export default function performSearch(query, resultsContainer) {
    if (!query.trim() || query.length <= 3) {
        clearResults(resultsContainer)
        return
    }

    console.log('Search load 1')

    if (isLoading()) return

    setLoading(true)
    showLoader()

    fetch(cas_ajax.ajaxurl, {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        body: new URLSearchParams({
            action: 'cas_ajax_search',
            search: query,
            nonce: cas_ajax.nonce,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            setLoading(false)
            hideLoader()
            clearResults(resultsContainer)

            if (data.success && data.data.length > 0) {
                resultsContainer.innerHTML = data.data.map(
                    (post) => `<li><a href="${post.link}">${post.title}</a><p>${post.excerpt}</p></li>`
                ).join('')

                // Показываем результаты после их обновления
                showResults(resultsContainer)
            } else {
                resultsContainer.innerHTML = '<li>Нет результатов</li>'
                showResults(resultsContainer)
            }
        })
        .catch((error) => {
            setLoading(false)
            hideLoader()
            console.error('Search error:', error)
        })
}
