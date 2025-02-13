import { updateButtonState } from '../ui'

const closeButton = document.getElementById('cas-search-close')
let lastVisibleButton = 'search'

export function showLoader() {
    lastVisibleButton = closeButton.style.display === 'inline-block' ? 'clear' : 'search'
    // lastVisibleButton = lastVisibleButton === 'clear' ? 'clear' : 'search'

    updateButtonState('loading')
}

export function hideLoader() {
    updateButtonState(lastVisibleButton)
}
