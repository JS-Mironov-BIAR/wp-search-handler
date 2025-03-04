import { showLoader, hideLoader } from '../components/preloader'
import { isLoading, setLoading } from '../components/input/inputState'
import { clearResults, hasResults, showResults } from '../components/resultList'
import { fetchSearchResults } from '../services/searchApi'
import { createLoadMoreIndicator, removeLoadMoreIndicator } from '../components/loadMoreManager'
import { highlightQuery } from './searchUtils'
import { setupPagination, getCurrentPage, incrementPage, setTotalPages, hasMorePages } from './searchPagination'
/* eslint-disable-next-line import/no-cycle */
import { enableLazyLoading } from './lazyLoad'

export default function performSearch(query, resultsContainer, loadMore = false) {
    if (!query.trim() || query.length <= 3) {
        clearResults(resultsContainer)
        return
    }

    if (isLoading()) return
    hasResults(resultsContainer)

    if (!loadMore) {
        setupPagination(query)
        if (resultsContainer.scrollTop > 100) {
            resultsContainer.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    setLoading(true)
    showLoader()

    fetchSearchResults(query, getCurrentPage())
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
                setTotalPages(data.pagination.total_pages) // ✅ Теперь totalPages корректно обновляется

                resultsContainer.innerHTML += data.data
                    .map(
                        (post) =>
                            `<li>
                                <a href="${post.relationships.link}">
                                    ${highlightQuery(post.attributes.title, query)}
                                </a>
                                <p>${highlightQuery(post.attributes.excerpt, query)}</p>
                            </li>`,
                    )
                    .join('')

                showResults(resultsContainer)
                incrementPage()

                if (hasMorePages()) {
                    createLoadMoreIndicator(resultsContainer)
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
