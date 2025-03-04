export function createLoadMoreIndicator(resultsContainer) {
    removeLoadMoreIndicator()

    const loadMoreIndicator = document.createElement('li')
    loadMoreIndicator.id = 'load-more'
    loadMoreIndicator.innerHTML = '🔄 Загружаем...'
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
