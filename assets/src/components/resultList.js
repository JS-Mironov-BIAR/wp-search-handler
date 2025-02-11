export function clearResults(resultsContainer) {
    resultsContainer.innerHTML = ''
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
