import { isLoading } from './components/input/inputState'

const form = document.querySelector('.cas-search-form')

const buttons = {
    search: document.getElementById('cas-search-submit'),
    clear: document.getElementById('cas-search-close'),
    loading: document.getElementById('cas-search-loader'),
    closeFormButton: document.getElementById('cas-form-close')
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
        console.warn(`${customAjaxSearchL10n.unknown_btn}: ${state}`)
    }
}

export function disableCloseButton() {
    if (window.innerWidth <= 767 && buttons['closeFormButton']) {
        if (isLoading()) {
            buttons['closeFormButton'].disabled = true
            buttons['closeFormButton'].style.opacity = "0.5"
            buttons['closeFormButton'].style.pointerEvents = "none"
        }
    }
}

export function enableCloseButton() {
    if (buttons['closeFormButton']) {
            buttons['closeFormButton'].disabled = false
            buttons['closeFormButton'].style.opacity = "1"
            buttons['closeFormButton'].style.pointerEvents = "auto"
    }
}