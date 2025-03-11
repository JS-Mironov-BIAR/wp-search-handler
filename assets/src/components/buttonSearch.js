import { expandSearchForm, updateButtonState } from '../ui.js'
import performSearch from '../search/search.js'
import { onMobileFocus } from './input/inputEvents'

const searchButton = document.getElementById('cas-search-submit')

export function initSearchButton(resultsContainer) {
    searchButton.addEventListener('click', (event) => {
        event.preventDefault()

        onMobileFocus(event)

        expandSearchForm()
        updateButtonState('clear')

        document.getElementById('cas-search').focus()

        if (document.getElementById('cas-search').value.trim() !== '') {
            performSearch(document.getElementById('cas-search').value, resultsContainer)
        }
    })
}
