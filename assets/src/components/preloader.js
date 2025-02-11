const form = document.querySelector('.cas-search-form')
const loader = document.getElementById('cas-search-loader')
const searchButton = document.getElementById('cas-search-submit')
const closeButton = document.getElementById('cas-search-close')

let lastVisibleButton = 'search'

export function showLoader() {
    lastVisibleButton = closeButton.style.display === 'inline-block' ? 'close' : 'search'
    loader.style.display = 'inline-block'
    searchButton.style.display = 'none'
    closeButton.style.display = 'none'

    isLoadingForm(true)
}

export function hideLoader() {
    loader.style.display = 'none'

    lastVisibleButton === 'close'
        ? closeButton.style.display = 'inline-block'
        : searchButton.style.display = 'inline-block'

    isLoadingForm(false)
}

function isLoadingForm(isLoading) {
    isLoading
        ? form.classList.add('loading')
        : form.classList.remove('loading')
}