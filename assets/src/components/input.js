import { showCloseButton, hideCloseButton } from './buttonClose.js'
import { showSearchButton, hideSearchButton } from './buttonSearch.js'
import { showLoader } from './preloader.js'
import performSearch from '../search.js'
import { clearResults, hideResults, showResults } from './resultList'

const input = document.getElementById('cas-search')
const resultsContainer = document.getElementById('cas-search-results')

let isLoading = false // Флаг загрузки
let timeoutId // Таймер для отложенного поиска
const SEARCH_DELAY = 1500


let lastStableInputValue = '' // Запоминаем последнее "значимое" изменение
let initialInputValue = '' // Фиксируем первое значение перед изменением
let inputCleared = false // 🛠 Флаг, сигнализирующий, что input был очищен

export function initInputEvents(resultsContainer) {
    input.addEventListener('input', () => {
        if (isLoading) {
            event.preventDefault() // Запрещаем изменения во время поиска
            input.value = lastStableInputValue // Восстанавливаем предыдущее значение
            return
        }

        clearTimeout(timeoutId)

        const currentValue = input.value.trim()

        // 🛠 Если `input` был полностью очищен, сбрасываем `lastStableInputValue`
        if (currentValue === '') {
            lastStableInputValue = ''
            inputCleared = true // Устанавливаем флаг очистки
            clearResults(resultsContainer) // 🛠 Удаляем список результатов сразу
            hideResults(resultsContainer) // 🛠 Скрываем контейнер результатов
            hideCloseButton() // 🛠 Возвращаем кнопку поиска
            showSearchButton()
            return // Выходим, так как строка пустая
        }

        if (currentValue.length <= 3) {
            initialInputValue = ''
            lastStableInputValue = ''
            inputCleared = true // Устанавливаем флаг очистки
        }


        // 🛠 Если `input` был очищен, запоминаем первое значение
        if (inputCleared) {
            initialInputValue = currentValue
            inputCleared =  false // Сбрасываем флаг очистки
        }

        // 🛠 Если значение фактически не изменилось, не запускаем поиск
        if (normalizeText(currentValue) === normalizeText(lastStableInputValue)) {
            return
        }

        if (currentValue.length > 0) {
            showCloseButton()
            hideSearchButton()
        } else {
            hideCloseButton()
            showSearchButton()
        }

        if (currentValue.length <= 3 && resultsContainer.querySelectorAll('li').length !== 0) {
            setLoading(false)
            clearResults(resultsContainer)
            hideResults(resultsContainer)
        }

        if (currentValue.length < 3 || isLoading) return // Блокируем поиск

        timeoutId = setTimeout(() => {
            if (!isLoading) {
                // Проверяем ещё раз перед отправкой запроса
                if (normalizeText(currentValue) === normalizeText(lastStableInputValue)) {
                    return // Прерываем выполнение, если смысл текста не изменился
                }

                performSearch(currentValue, resultsContainer)
                lastStableInputValue = currentValue // Обновляем значение после успешного поиска
            }
        }, SEARCH_DELAY)
    })

    // 🛠 Добавляем обработчик "cut" (вырезание через Ctrl+X)
    input.addEventListener('cut', (event) => {
        if (isLoading) {
            event.preventDefault() // Запрещаем удаление текста через `Ctrl+X` во время поиска
            return
        }

        setTimeout(() => {
            if (input.value.trim() === '') {
                clearResults(resultsContainer) // 🛠 Удаляем список результатов сразу
                hideResults(resultsContainer) // 🛠 Скрываем контейнер результатов
                hideCloseButton() // 🛠 Возвращаем кнопку поиска
                showSearchButton()
            }
        }, 10) // Даем браузеру время обработать удаление
    })

    input.addEventListener('click', () => {
        showResults(resultsContainer)
    })
}

// 🛠 Нормализация текста: Убираем пробелы, приводим к нижнему регистру
function normalizeText(text) {
    return text.replace(/\s+/g, '').toLowerCase()
}

// 🛠 Новый метод для сброса `initialInputValue`
export function resetInitialInputValue() {
    initialInputValue = ''
}

export function clearInput() {
    if (isLoading) return // Запрещаем очистку поля во время поиска

    input.value = ''
    initialInputValue = ''
    lastStableInputValue = '' // 🛠 Теперь сбрасываем `lastStableInputValue`
    inputCleared = true // 🛠 Устанавливаем флаг, что input был очищен
    hideCloseButton()
    showSearchButton()
    clearResults(resultsContainer) // 🛠 Удаляем список результатов сразу
    hideResults(resultsContainer) // 🛠 Скрываем контейнер результатов
    clearTimeout(timeoutId)
}

export function blurInput() {
    input.blur()
}

export function setLoading(state) {
    isLoading = state
}
