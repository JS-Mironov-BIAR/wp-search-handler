/* global cas_ajax */

import { showLoader, hideLoader } from './components/preloader'
import { setLoading } from './components/input.js'
import { showResults } from './components/resultList.js'

export default function performSearch(query, resultsContainer) {
    if (!query.trim() || query.length <= 3) {
        resultsContainer.innerHTML = ''
        return
    }

    if (setLoading(true)) return
console.log('start search')
    setLoading(true)
    showLoader()

    fetch(cas_ajax.ajaxurl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
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
            resultsContainer.innerHTML = ''

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
