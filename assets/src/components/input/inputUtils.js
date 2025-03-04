const search = document.getElementById('cas-search')
export function normalizeText(text) {
    return text.replace(/\s+/g, '').toLowerCase()
}

export function blurInput() {
    search.blur()
}
