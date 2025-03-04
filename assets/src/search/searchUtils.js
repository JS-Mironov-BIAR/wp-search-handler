// Удаляем старый `loadMoreButton`, если есть
const existingLoadMoreButton = document.getElementById('load-more')
if (existingLoadMoreButton) {
    existingLoadMoreButton.remove()
}

export function highlightQuery(text, query) {
    if (!query.trim()) return text

    // Splitting the query into words by removing characters that are too short (for example, "m")
    const words = query
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 1)

    if (words.length === 0) return text

    // Creating a regular expression with punctuation in mind
    const regex = new RegExp(`\\b(${words.join('|')})\\b|(${words.join('|')})`, 'gi')

    return text.replace(regex, '<mark>$&</mark>')
}
