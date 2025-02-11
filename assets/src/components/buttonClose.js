import { collapseSearchForm, toggleButtons } from '../ui.js'
import { clearInput, blurInput, setLoading, resetInitialInputValue } from './input.js'
import { clearResults, hideResults } from './resultList.js'

const closeButton = document.getElementById('cas-search-close')

let timeoutId

export function initCloseButton(form, resultsContainer) {
    function closeSearch(event) {
        if (event) event.preventDefault()

        clearTimeout(timeoutId) // Отменяем запущенный поиск
        setLoading(false) // Разрешаем дальнейшие действия

        blurInput()
        collapseSearchForm(form)
        clearInput()
        resetInitialInputValue() // 🛠 Теперь `initialInputValue` сбрасывается!
        clearResults(resultsContainer)
        hideResults(resultsContainer)
        toggleButtons(false)
    }

    closeButton.addEventListener('click', closeSearch)

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeSearch()
        }
    })
}

export function showCloseButton() {
    closeButton.style.display = 'inline-block'
}

export function hideCloseButton() {
    closeButton.style.display = 'none'
}
