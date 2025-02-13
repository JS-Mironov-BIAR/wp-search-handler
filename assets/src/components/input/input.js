import { initInputHandlers } from './inputHandlers.js'
import { resetState, isLoading, resetInputValue } from './inputState.js'

const input = document.getElementById('cas-search')
let timeoutId

export function initInputEvents(resultsContainer) {
    initInputHandlers(input, resultsContainer)
}

// 🛠 Очистка поля ввода
export function clearInput() {
    if (isLoading()) return // Запрещаем очистку во время поиска

    resetState()
    resetInputValue(input)
    clearTimeout(timeoutId)
}
