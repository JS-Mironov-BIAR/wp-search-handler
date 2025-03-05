/* eslint-disable-next-line import/no-cycle */
import performSearch from './search'
import { hasMorePages } from './pagination'

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
                        loadMoreButton.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 8.00023L18.3642 5.63609M5.63631 18.364L8.00026 16M17.6566 12H21M3 12H6.34315M12 6.34342L12 3M12 21L12 17.6569M8.00023 8.00023L5.63609 5.63609M18.364 18.364L16 16" stroke="#4A4A4A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'

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
