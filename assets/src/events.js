import { initInputEvents, blurInput } from './components/input.js'
import { initCloseButton } from './components/buttonClose.js'
import { initSearchButton } from './components/buttonSearch.js'
import { hideResults } from './components/resultList.js'

export default function initSearchEvents() {
    const form = document.querySelector('.cas-search-form')
    const resultsContainer = document.getElementById('cas-search-results')

    initInputEvents(resultsContainer)
    initSearchButton(form, resultsContainer)
    initCloseButton(form, resultsContainer)

    document.addEventListener('click', (event) => {
        if (!form.contains(event.target) && !resultsContainer.contains(event.target)) {
            blurInput()
            hideResults(resultsContainer)
        }
    })
}
