import { resetState, setLoading } from './inputState.js'
import { clearResults, hideResults } from '../resultList.js'
import { enableCloseButton, updateButtonState } from '../../ui'

export function handleEmptyInput(resultsContainer) {
    resetState({ resetInitial: false })
    clearResults(resultsContainer)
    hideResults(resultsContainer)
    updateButtonState('search')
}

export function handleShortInput(resultsContainer) {
    resetState()
    if (resultsContainer.querySelectorAll('li').length !== 0) {
        setLoading(false)
        clearResults(resultsContainer)
        hideResults(resultsContainer)
    }
}
