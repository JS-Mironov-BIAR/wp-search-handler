/* eslint-disable-next-line import/no-cycle */
import performSearch from './search'
import { hasMorePages } from './searchPagination'

let observer = null
let lazyLoadTimeout = null

export function enableLazyLoading(resultsContainer, query) {
    if (!query) return

    if (observer) observer.disconnect()

    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && hasMorePages()) {
                    const loadMoreButton = document.getElementById('load-more')

                    if (loadMoreButton && !lazyLoadTimeout) {
                        loadMoreButton.innerText = '🔄 Загрузка...'

                        lazyLoadTimeout = setTimeout(() => {
                            performSearch(query, resultsContainer, true)
                            lazyLoadTimeout = null
                        }, 500)
                    }
                }
            })
        },
        {
            root: resultsContainer,
            rootMargin: '0px',
            threshold: 1.0,
        },
    )

    const loadMoreButton = document.getElementById('load-more')
    if (loadMoreButton) observer.observe(loadMoreButton)
}
