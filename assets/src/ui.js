const form = document.querySelector('.cas-search-form')

const buttons = {
    search: document.getElementById('cas-search-submit'),
    clear: document.getElementById('cas-search-close'),
    loading: document.getElementById('cas-search-loader'),
}

export function expandSearchForm() {
    form.classList.add('active')
}

export function collapseSearchForm() {
    form.classList.remove('active')
}

export function updateButtonState(state) {
    Object.values(buttons).forEach((button) => {
        if (button) button.style.display = 'none'
    })

    if (buttons[state]) {
        buttons[state].style.display = 'inline-flex'
    } else {
        console.warn(`Неизвестное состояние кнопки: ${state}`)
    }
}
