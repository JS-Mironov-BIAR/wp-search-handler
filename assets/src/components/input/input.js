import { initInputHandlers } from './inputHandlers.js'
import { resetState, isLoading, resetInputValue } from './inputState.js'

const input = document.getElementById('cas-search')
let timeoutId

export function initInputEvents(resultsContainer) {
    initInputHandlers(input, resultsContainer)
}

export function clearInput() {
    if (isLoading()) return // Forbidding cleaning during the search

    resetState()
    resetInputValue(input)
    clearTimeout(timeoutId)
}
