import performSearch from '../../search/search.js'
import { clearResults, hideResults, showResults } from '../resultList.js'
import {
    isLoading,
    getLastStableInputValue,
    setLastStableInputValue,
    wasInputCleared,
    resetInputCleared,
    setInitialInputValue,
    isBackspaceActive,
    setBackspaceState,
} from './inputState.js'
import { normalizeText } from './inputUtils.js'
import { updateButtonState } from '../../ui'
import { handleEmptyInput, handleShortInput } from './inputProcessing'

const SEARCH_DELAY = 700 // ⏳ Delay before executing the search
let timeoutId // 🕒 Timer for delaying the search

// 📌 Handles text input in the search field
export function onInput(event, input, resultsContainer) {
    // 🛑 If a search is already in progress, prevent further input
    if (isLoading()) {
        event.preventDefault()
        input.value = getLastStableInputValue() // ⏪ Restore the last stable value
        return
    }

    // 🔄 Clear the previous timeout to prevent excessive search triggers
    clearTimeout(timeoutId)

    // ✂️ Trim whitespace from input
    const currentValue = input.value.trim()

    // 🛑 If the input is empty, reset the state
    if (currentValue === '') {
        handleEmptyInput(resultsContainer)
        return
    }

    // ℹ️ If the input length is 3 characters or less, apply short input logic
    if (currentValue.length <= 3) {
        handleShortInput(resultsContainer)
    }

    // 📌 If the input was manually cleared, reset the flag and store the initial value
    if (wasInputCleared()) {
        setInitialInputValue(currentValue)
        resetInputCleared()
    }

    // 🛑 If the input is effectively unchanged (ignoring case and spaces), do not trigger a search
    if (normalizeText(currentValue) === normalizeText(getLastStableInputValue())) {
        return
    }

    // 🔘 Update the button state (🔍 Search or ✖ Clear)
    updateButtonState(currentValue.length > 0 ? 'clear' : 'search')

    // 🔄 Require at least 3 characters to perform a search
    if (currentValue.length < 3) return

    // ⏳ Start the search with a delay (`SEARCH_DELAY`)
    timeoutId = setTimeout(() => {
        // ✅ Ensure no active search is in progress
        if (!isLoading()) {
            if (isBackspaceActive()) return // 🛑 Do not trigger search if `Backspace` is being held
            if (normalizeText(currentValue) === normalizeText(getLastStableInputValue())) return // 🛑 Ensure the value has actually changed

            performSearch(currentValue, resultsContainer) // 🔍 Execute AJAX search
            setLastStableInputValue(currentValue) // 💾 Store the last stable value
        }
    }, SEARCH_DELAY)
}

// 📌 Handles text cutting (`Ctrl+X`)
export function onCut(event, input, resultsContainer) {
    // 🛑 If a search is in progress, prevent `cut`
    if (isLoading()) {
        event.preventDefault()
        return
    }

    // ⏳ After 10ms, check if the input field is now empty
    setTimeout(() => {
        if (input.value.trim() === '') {
            clearResults(resultsContainer) // 🗑 Clear search results
            hideResults(resultsContainer) // 🔽 Hide the results list

            // 🔘 Show the search button
            updateButtonState('search')
        }
    }, 10)
}

// 📌 Handles click inside the input field (displays search results)
export function onClick(resultsContainer) {
    showResults(resultsContainer)
}

// 📌 Handles `Backspace` key press (marks it as held)
export function onKeydown(event) {
    if (event.key === 'Backspace') {
        // 🛑 Mark `Backspace` as held
        setBackspaceState(true)
    }
}

// 📌 Handles `Backspace` key release (allows search)
export function onKeyup(event) {
    if (event.key === 'Backspace') {
        // ✅ Now `Backspace` is no longer held
        setBackspaceState(false)
    }
}
