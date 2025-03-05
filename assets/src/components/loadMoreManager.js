export function createLoadMoreIndicator(resultsContainer) {
    removeLoadMoreIndicator()

    const loadMoreIndicator = document.createElement('li')
    loadMoreIndicator.id = 'load-more'
    loadMoreIndicator.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 8.00023L18.3642 5.63609M5.63631 18.364L8.00026 16M17.6566 12H21M3 12H6.34315M12 6.34342L12 3M12 21L12 17.6569M8.00023 8.00023L5.63609 5.63609M18.364 18.364L16 16" stroke="#4A4A4A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    loadMoreIndicator.style.textAlign = 'center'
    loadMoreIndicator.style.padding = '10px'

    resultsContainer.appendChild(loadMoreIndicator)
}

export function removeLoadMoreIndicator() {
    const loadMoreIndicator = document.getElementById('load-more')
    if (loadMoreIndicator) {
        loadMoreIndicator.remove()
    }
}
