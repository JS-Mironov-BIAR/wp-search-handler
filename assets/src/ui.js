export function expandSearchForm(form) {
    form.classList.add('active')
}

export function collapseSearchForm(form) {
    form.classList.remove('active')
}

export function toggleButtons(showClose) {
    const searchButton = document.getElementById('cas-search-submit')
    const closeButton = document.getElementById('cas-search-close')
    const input = document.getElementById('cas-search')

    const isInputEmpty = input.value.trim().length === 0

    if (showClose && !isInputEmpty) {
        searchButton.style.display = 'none'
        closeButton.style.display = 'inline-block'
    } else {
        searchButton.style.display = 'inline-block'
        closeButton.style.display = 'none'
    }
}
