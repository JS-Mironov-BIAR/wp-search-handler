import { onInput, onCut, onClick, onKeydown, onKeyup, onMobileFocus } from './inputEvents.js'

export function initInputHandlers(input, resultsContainer) {
    input.addEventListener('input', (event) => onInput(event, input, resultsContainer))
    input.addEventListener('cut', (event) => onCut(event, input, resultsContainer))
    input.addEventListener('click', () => onClick(resultsContainer))
    input.addEventListener('click', (event) => onMobileFocus(event))
    input.addEventListener('keydown', (event) => onKeydown(event))
    input.addEventListener('keyup', (event) => onKeyup(event))
}
