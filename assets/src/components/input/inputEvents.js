import performSearch from '../../search.js'
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

const SEARCH_DELAY = 700 // ⏳ Задержка перед выполнением поиска
let timeoutId // 🕒 Таймер для задержки поиска

// 📌 Обработчик ввода текста в поисковую строку
export function onInput(event, input, resultsContainer) {
    // 🛑 Если уже идёт поиск, блокируем ввод
    if (isLoading()) {
        event.preventDefault()
        input.value = getLastStableInputValue() // ⏪ Возвращаем последнее стабильное значение
        return
    }

    // 🔄 Очищаем предыдущий таймер, чтобы не запускать поиск слишком часто
    clearTimeout(timeoutId)

    // ✂️ Убираем пробелы по краям
    const currentValue = input.value.trim()

    // 🛑 Если поле пустое, сбрасываем состояние
    if (currentValue === '') {
        handleEmptyInput(resultsContainer)
        return
    }

    // ℹ️ Если введено 3 или меньше символов, применяем логику короткого ввода
    if (currentValue.length <= 3) {
        handleShortInput(resultsContainer)
    }

    // 📌 Если поле было очищено вручную, сбрасываем флаг очистки и запоминаем начальное значение
    if (wasInputCleared()) {
        setInitialInputValue(currentValue)
        resetInputCleared()
    }

    // 🛑 Если текст не изменился по смыслу (с учётом регистра и пробелов), не запускаем поиск
    if (normalizeText(currentValue) === normalizeText(getLastStableInputValue())) {
        return
    }

    // 🔘 Обновляем кнопку (🔍 Поиск или ✖ Очистить)
    updateButtonState(currentValue.length > 0 ? 'clear' : 'search')

    // 🔄 Минимум 3 символа для поиска
    if (currentValue.length < 3) return

    // ⏳ Запускаем поиск с задержкой `SEARCH_DELAY`
    timeoutId = setTimeout(() => {
        // ✅ Проверяем, что нет активного поиска
        if (!isLoading()) {
            if (isBackspaceActive()) return // 🛑 Если `Backspace` зажат, не запускаем поиск
            if (normalizeText(currentValue) === normalizeText(getLastStableInputValue())) return // 🛑 Проверяем, что значение действительно изменилось

            performSearch(currentValue, resultsContainer) // 🔍 Запускаем AJAX-поиск
            setLastStableInputValue(currentValue) // 💾 Запоминаем последнее стабильное значение
        }
    }, SEARCH_DELAY)
}

// 📌 Обработчик "вырезания" текста (`Ctrl+X`)
export function onCut(event, input, resultsContainer) {
    // 🛑 Если идёт поиск, блокируем `cut`
    if (isLoading()) {
        event.preventDefault()
        return
    }

    // ⏳ Через 10 мс проверяем, не стало ли поле пустым
    setTimeout(() => {
        if (input.value.trim() === '') {
            clearResults(resultsContainer) // 🗑 Очищаем результаты поиска
            hideResults(resultsContainer) // 🔽 Прячем список результатов

            // 🔘 Показываем кнопку поиска
            updateButtonState('search')
        }
    }, 10)
}

// 📌 Обработчик клика в поле ввода (открывает результаты поиска)
export function onClick(resultsContainer) {
    showResults(resultsContainer)
}

// 📌 Обработчик нажатия `Backspace` (отмечает, что кнопка зажата)
export function onKeydown(event) {
    if (event.key === 'Backspace') {
        // 🛑 Отмечаем, что `Backspace` удерживается
        setBackspaceState(true)
    }
}

// 📌 Обработчик отпускания `Backspace` (разрешает поиск)
export function onKeyup(event) {
    if (event.key === 'Backspace') {
        // ✅ Теперь `Backspace` не удерживается
        setBackspaceState(false)
    }
}
