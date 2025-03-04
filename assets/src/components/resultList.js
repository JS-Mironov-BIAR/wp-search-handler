export function clearResults(resultsContainer) {
    resultsContainer.innerHTML = ''
}

export function hasResults(resultsContainer) {
    return resultsContainer && resultsContainer.querySelectorAll('li:not(#load-more)').length > 0
}

export function showResults(resultsContainer) {
    if (resultsContainer.innerHTML.trim() !== '') {
        resultsContainer.style.display = 'block'
    }
}

export function hideResults(resultsContainer) {
    setTimeout(() => {
        resultsContainer.style.display = 'none'
    }, 300)
}
