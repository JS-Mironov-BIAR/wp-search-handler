import performSearch from '../../search.js'
import { clearResults, hideResults, showResults } from '../resultList.js'
import {
    setLoading,
    isLoading,
    getLastStableInputValue,
    setLastStableInputValue,
    wasInputCleared,
    resetInputCleared,
    resetState,
    setInitialInputValue,
    isBackspaceActive,
    setBackspaceState,
} from './inputState.js'
import { normalizeText } from './inputUtils.js'
import { updateButtonState } from '../../ui'

const SEARCH_DELAY = 700
let timeoutId

export function onInput(event, input, resultsContainer) {
    //if (isBackspaceActive() && !isLoading()) return

    if (isLoading()) {
        event.preventDefault()
        input.value = getLastStableInputValue()
        return
    }

    clearTimeout(timeoutId)

    const currentValue = input.value.trim()

    if (currentValue === '') {
        resetState({ resetInitial: false })

        clearResults(resultsContainer)
        hideResults(resultsContainer)

        updateButtonState('search')

        return
    }

    if (currentValue.length <= 3) {
        resetState()
    }

    if (currentValue.length <= 3 && resultsContainer.querySelectorAll('li').length !== 0) {
        setLoading(false)
        clearResults(resultsContainer)
        hideResults(resultsContainer)
    }

    if (wasInputCleared()) {
        setInitialInputValue(currentValue)
        resetInputCleared()
    }

    if (normalizeText(currentValue) === normalizeText(getLastStableInputValue())) {
        return
    }

    updateButtonState(currentValue.length > 0 ? 'clear' : 'search')

    if (currentValue.length < 3) return

    timeoutId = setTimeout(() => {
        if (!isLoading()) {
            if (isBackspaceActive()) return
            if (normalizeText(currentValue) === normalizeText(getLastStableInputValue())) return

            performSearch(currentValue, resultsContainer)
            setLastStableInputValue(currentValue)
        }
    }, SEARCH_DELAY)
}

export function onCut(event, input, resultsContainer) {
    if (isLoading()) {
        event.preventDefault()
        return
    }

    setTimeout(() => {
        if (input.value.trim() === '') {
            clearResults(resultsContainer)
            hideResults(resultsContainer)

            updateButtonState('search')
        }
    }, 10)
}

export function onClick(resultsContainer) {
    showResults(resultsContainer)
}

export function onKeydown(event) {
    if (event.key === 'Backspace') {
        setBackspaceState(true)
    }
}

export function onKeyup(event) {
    if (event.key === 'Backspace') {
        setBackspaceState(false)
    }
}