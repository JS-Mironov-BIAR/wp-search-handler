import { collapseSearchForm, updateButtonState } from '../ui.js'
import { blurInput } from './input/inputUtils'
import { clearInput } from './input/input'
import { isLoading, resetInitialInputValue, setLoading } from './input/inputState'
import { clearResults, hideResults } from './resultList.js'

const closeButton = document.getElementById('cas-search-close')
const closeFormButton = document.getElementById('cas-form-close')
const form = document.querySelector('.cas-search-form')

let timeoutId

export function initCloseButton(resultsContainer) {
    function closeSearch(event) {
        if (event) event.preventDefault()

        if (isLoading()) return

        openMobileSearch(event)

        clearTimeout(timeoutId) // Canceling the running search
        setLoading(false) // Allow further actions

        blurInput()
        collapseSearchForm()
        clearInput()

        resetInitialInputValue()

        clearResults(resultsContainer)
        hideResults(resultsContainer)

        updateButtonState('search')
    }

    closeButton.addEventListener('click', closeSearch)
    closeFormButton.addEventListener('click', closeSearch)

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !isLoading()) {
            closeSearch()
        }
    })
}

function openMobileSearch(event) {
    event.preventDefault()

    if (window.innerWidth <= 767) {
        const clickedButton = event.target.closest('#cas-form-close')

        if (clickedButton) {
            form.classList.remove('form-mobile-active')
        }
    }
}