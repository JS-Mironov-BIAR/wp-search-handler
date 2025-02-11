import { expandSearchForm, toggleButtons } from '../ui.js'
import performSearch from '../search.js'

const searchButton = document.getElementById('cas-search-submit')

export function initSearchButton(form, resultsContainer) {
    searchButton.addEventListener('click', (event) => {
        event.preventDefault()
        expandSearchForm(form)
        toggleButtons(true)
        document.getElementById('cas-search').focus()

        if (document.getElementById('cas-search').value.trim() !== '') {
            performSearch(document.getElementById('cas-search').value, resultsContainer)
        }
    })
}

export function showSearchButton() {
    searchButton.style.display = 'inline-block'
}

export function hideSearchButton() {
    searchButton.style.display = 'none'
}
