import { collapseSearchForm, updateButtonState } from '../ui.js'
import { blurInput } from './input/inputUtils'
import { clearInput } from './input/input'
import { isLoading, resetInitialInputValue, setLoading } from './input/inputState'
import { clearResults, hideResults } from './resultList.js'

const closeButton = document.getElementById('cas-search-close')

let timeoutId

export function initCloseButton(resultsContainer) {
    function closeSearch(event) {
        if (event) event.preventDefault()

        clearTimeout(timeoutId) // Отменяем запущенный поиск
        setLoading(false) // Разрешаем дальнейшие действия

        blurInput()
        collapseSearchForm()
        clearInput()

        resetInitialInputValue() // 🛠 Теперь `initialInputValue` сбрасывается!

        clearResults(resultsContainer)
        hideResults(resultsContainer)

        updateButtonState('search')
    }

    closeButton.addEventListener('click', closeSearch)

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !isLoading()) {
            closeSearch()
        }
    })
}
