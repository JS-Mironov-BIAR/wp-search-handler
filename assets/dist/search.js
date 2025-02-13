/******/ (function() { // webpackBootstrap
/******/ 	"use strict";

;// ./assets/src/ui.js
const ui_form = document.querySelector('.cas-search-form');
const buttons = {
  search: document.getElementById('cas-search-submit'),
  clear: document.getElementById('cas-search-close'),
  loading: document.getElementById('cas-search-loader')
};
function expandSearchForm() {
  ui_form.classList.add('active');
}
function collapseSearchForm() {
  ui_form.classList.remove('active');
}
function updateButtonState(state) {
  // Скрываем все кнопки
  Object.values(buttons).forEach(button => {
    if (button) button.style.display = 'none';
  });

  // Показываем нужную кнопку
  if (buttons[state]) {
    buttons[state].style.display = 'inline-block';
  } else {
    console.warn(`Неизвестное состояние кнопки: ${state}`);
  }
}
;// ./assets/src/components/preloader.js

const closeButton = document.getElementById('cas-search-close');
let lastVisibleButton = 'search';
function showLoader() {
  lastVisibleButton = closeButton.style.display === 'inline-block' ? 'clear' : 'search';
  // lastVisibleButton = lastVisibleButton === 'clear' ? 'clear' : 'search'

  updateButtonState('loading');
}
function hideLoader() {
  updateButtonState(lastVisibleButton);
}
;// ./assets/src/components/input/inputState.js
let lastStableInputValue = '';
let initialInputValue = '';
let inputCleared = false;
let loading = false;
let isBackspaceHeld = false;
function resetState() {
  let {
    resetLastStable = true,
    resetInitial = true,
    resetCleared = true
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (resetLastStable) lastStableInputValue = '';
  if (resetInitial) initialInputValue = '';
  if (resetCleared) inputCleared = true;
}
function setLoading(state) {
  loading = state;
}
function isLoading() {
  return loading;
}
function getLastStableInputValue() {
  return lastStableInputValue;
}
function setLastStableInputValue(value) {
  lastStableInputValue = value;
}
function wasInputCleared() {
  return inputCleared;
}
function resetInputCleared() {
  inputCleared = false;
}
function setInitialInputValue(value) {
  initialInputValue = value;
}
function resetInitialInputValue() {
  initialInputValue = '';
}
function resetInputValue(input) {
  input.value = '';
}
function setBackspaceState(state) {
  isBackspaceHeld = state;
}
function isBackspaceActive() {
  return isBackspaceHeld;
}
;// ./assets/src/components/resultList.js
function clearResults(resultsContainer) {
  resultsContainer.innerHTML = '';
}
function showResults(resultsContainer) {
  if (resultsContainer.innerHTML.trim() !== '') {
    resultsContainer.style.display = 'block';
  }
}
function hideResults(resultsContainer) {
  setTimeout(() => {
    resultsContainer.style.display = 'none';
  }, 300);
}
;// ./assets/src/search.js
/* global cas_ajax */




function performSearch(query, resultsContainer) {
  if (!query.trim() || query.length <= 3) {
    clearResults(resultsContainer);
    return;
  }
  console.log('Search load 1');
  console.log('Current NODE_ENV:', "development");
  if (isLoading()) return;
  setLoading(true);
  showLoader();
  fetch(cas_ajax.ajaxurl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: new URLSearchParams({
      action: 'cas_ajax_search',
      search: query,
      nonce: cas_ajax.nonce
    })
  }).then(response => response.json()).then(data => {
    setLoading(false);
    hideLoader();
    clearResults(resultsContainer);
    if (data.success && data.data.length > 0) {
      resultsContainer.innerHTML = data.data.map(post => `<li><a href="${post.link}">${post.title}</a><p>${post.excerpt}</p></li>`).join('');

      // Показываем результаты после их обновления
      showResults(resultsContainer);
    } else {
      resultsContainer.innerHTML = '<li>Нет результатов</li>';
      showResults(resultsContainer);
    }
  }).catch(error => {
    setLoading(false);
    hideLoader();
    console.error('Search error:', error);
  });
}
;// ./assets/src/components/input/inputUtils.js
const search = document.getElementById('cas-search');
function normalizeText(text) {
  return text.replace(/\s+/g, '').toLowerCase();
}
function blurInput() {
  search.blur();
}
;// ./assets/src/components/input/inputEvents.js





const SEARCH_DELAY = 700;
let timeoutId;
function onInput(event, input, resultsContainer) {
  //if (isBackspaceActive() && !isLoading()) return

  if (isLoading()) {
    event.preventDefault();
    input.value = getLastStableInputValue();
    return;
  }
  clearTimeout(timeoutId);
  const currentValue = input.value.trim();
  if (currentValue === '') {
    resetState({
      resetInitial: false
    });
    clearResults(resultsContainer);
    hideResults(resultsContainer);
    updateButtonState('search');
    return;
  }
  if (currentValue.length <= 3) {
    resetState();
  }
  if (currentValue.length <= 3 && resultsContainer.querySelectorAll('li').length !== 0) {
    setLoading(false);
    clearResults(resultsContainer);
    hideResults(resultsContainer);
  }
  if (wasInputCleared()) {
    setInitialInputValue(currentValue);
    resetInputCleared();
  }
  if (normalizeText(currentValue) === normalizeText(getLastStableInputValue())) {
    return;
  }
  updateButtonState(currentValue.length > 0 ? 'clear' : 'search');
  if (currentValue.length < 3) return;
  timeoutId = setTimeout(() => {
    if (!isLoading()) {
      if (isBackspaceActive()) return;
      if (normalizeText(currentValue) === normalizeText(getLastStableInputValue())) return;
      performSearch(currentValue, resultsContainer);
      setLastStableInputValue(currentValue);
    }
  }, SEARCH_DELAY);
}
function onCut(event, input, resultsContainer) {
  if (isLoading()) {
    event.preventDefault();
    return;
  }
  setTimeout(() => {
    if (input.value.trim() === '') {
      clearResults(resultsContainer);
      hideResults(resultsContainer);
      updateButtonState('search');
    }
  }, 10);
}
function onClick(resultsContainer) {
  showResults(resultsContainer);
}
function onKeydown(event) {
  if (event.key === 'Backspace') {
    setBackspaceState(true);
  }
}
function onKeyup(event) {
  if (event.key === 'Backspace') {
    setBackspaceState(false);
  }
}
;// ./assets/src/components/input/inputHandlers.js

function initInputHandlers(input, resultsContainer) {
  input.addEventListener('input', event => onInput(event, input, resultsContainer));
  input.addEventListener('cut', event => onCut(event, input, resultsContainer));
  input.addEventListener('click', () => onClick(resultsContainer));
  input.addEventListener('keydown', event => onKeydown(event));
  input.addEventListener('keyup', event => onKeyup(event));
}
;// ./assets/src/components/input/input.js


const input = document.getElementById('cas-search');
let input_timeoutId;
function initInputEvents(resultsContainer) {
  initInputHandlers(input, resultsContainer);
}

// 🛠 Очистка поля ввода
function clearInput() {
  if (isLoading()) return; // Запрещаем очистку во время поиска

  resetState();
  resetInputValue(input);
  clearTimeout(input_timeoutId);
}
;// ./assets/src/components/buttonClose.js





const buttonClose_closeButton = document.getElementById('cas-search-close');
let buttonClose_timeoutId;
function initCloseButton(resultsContainer) {
  function closeSearch(event) {
    if (event) event.preventDefault();
    clearTimeout(buttonClose_timeoutId); // Отменяем запущенный поиск
    setLoading(false); // Разрешаем дальнейшие действия

    blurInput();
    collapseSearchForm();
    clearInput();
    resetInitialInputValue(); // 🛠 Теперь `initialInputValue` сбрасывается!

    clearResults(resultsContainer);
    hideResults(resultsContainer);
    updateButtonState('search');
  }
  buttonClose_closeButton.addEventListener('click', closeSearch);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !isLoading()) {
      closeSearch();
    }
  });
}
;// ./assets/src/components/buttonSearch.js


const searchButton = document.getElementById('cas-search-submit');
function initSearchButton(resultsContainer) {
  searchButton.addEventListener('click', event => {
    event.preventDefault();
    expandSearchForm();
    updateButtonState('clear');
    document.getElementById('cas-search').focus();
    if (document.getElementById('cas-search').value.trim() !== '') {
      performSearch(document.getElementById('cas-search').value, resultsContainer);
    }
  });
}
;// ./assets/src/events.js





function initSearchEvents() {
  const form = document.querySelector('.cas-search-form');
  const resultsContainer = document.getElementById('cas-search-results');
  initInputEvents(resultsContainer);
  initSearchButton(resultsContainer);
  initCloseButton(resultsContainer);
  document.addEventListener('click', event => {
    if (!form.contains(event.target) && !resultsContainer.contains(event.target)) {
      blurInput();
      hideResults(resultsContainer);
    }
  });
}
;// ./assets/src/index.js

document.addEventListener('DOMContentLoaded', () => {
  initSearchEvents();
});
/******/ })()
;
//# sourceMappingURL=search.js.map