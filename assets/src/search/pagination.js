let currentPage = 1
let totalPages = 1
let lastQuery = ''

export function setupPagination(query) {
    if (lastQuery !== query) {
        currentPage = 1
        lastQuery = query
        totalPages = 1
    }
}

export function getCurrentPage() {
    return currentPage
}

export function incrementPage() {
    currentPage++
}

export function setTotalPages(pages) {
    totalPages = pages
}

export function hasMorePages() {
    return currentPage < totalPages
}
