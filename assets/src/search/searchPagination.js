import { showLoader, hideLoader } from '../components/preloader'
import { isLoading, setLoading } from '../components/input/inputState'
import { clearResults, hasResults, showResults } from '../components/resultList'
import { enableLazyLoading } from './lazyLoad.js'
import { fetchSearchResults } from '../services/searchApi'
import { createLoadMoreIndicator, removeLoadMoreIndicator } from '../components/loadMoreManager'

let currentPage = 1
let totalPages = 1
let lastQuery = ''

export function performSearch(query, resultsContainer, loadMore = false) {
    if (!query.trim() || query.length <= 3) {
        clearResults(resultsContainer)
        return
    }

    if (isLoading()) return
    hasResults(resultsContainer)
    const shouldScrollUp = !loadMore && resultsContainer.scrollTop > 100

    if (!loadMore) {
        currentPage = 1
        lastQuery = query
        totalPages = 1

        if (shouldScrollUp) {
            resultsContainer.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    setLoading(true)
    showLoader()

    fetchSearchResults(query, currentPage)
        .then((data) => {
            setLoading(false)
            hideLoader()

            if (hasResults(resultsContainer)) {
                removeLoadMoreIndicator()
            }

            if (!loadMore) {
                clearResults(resultsContainer)
            }

            if (data.success && data.data.length > 0) {
                totalPages = data.pagination.total_pages
                resultsContainer.innerHTML += data.data
                    .map(
                        (post) =>
                            `<li><a href="${post.relationships.link}">${post.attributes.title}</a><p>${post.attributes.excerpt}</p></li>`,
                    )
                    .join('')

                showResults(resultsContainer)
                currentPage++

                // Проверяем, есть ли ещё страницы
                if (data.pagination.has_more) {
                    // Создаём `loadMoreButton` заново
                    createLoadMoreIndicator(resultsContainer)

                    // Важно! Обновляем `lazyLoad`, передавая новый `query`
                    enableLazyLoading(resultsContainer, query)
                } else {
                    removeLoadMoreIndicator()
                }
            } else {
                if (!loadMore) {
                    resultsContainer.innerHTML = '<li>⚠ Нет результатов</li>'
                }
                showResults(resultsContainer)
            }
        })
        .catch((error) => {
            setLoading(false)
            hideLoader()
            console.error('Search error:', error)
        })
}
