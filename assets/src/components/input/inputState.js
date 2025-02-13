let lastStableInputValue = ''
let initialInputValue = ''
let inputCleared = false
let loading = false

export function resetState({
    resetLastStable = true,
    resetInitial = true,
    resetCleared = true
} = {}) {
    if (resetLastStable) lastStableInputValue = ''
    if (resetInitial) initialInputValue = ''
    if (resetCleared) inputCleared = true
}

export function setLoading(state) {
    loading = state
}

export function isLoading() {
    return loading
}

export function getLastStableInputValue() {
    return lastStableInputValue
}

export function setLastStableInputValue(value) {
    lastStableInputValue = value
}

export function wasInputCleared() {
    return inputCleared
}

export function resetInputCleared() {
    inputCleared = false
}

export function setInitialInputValue(value) {
    initialInputValue = value
}

export function resetInitialInputValue() {
    initialInputValue = ''
}

export function resetInputValue(input) {
    input.value = ''
}