/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/src/components/buttonClose.js":
/*!**********************************************!*\
  !*** ./assets/src/components/buttonClose.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initCloseButton: function() { return /* binding */ initCloseButton; }
/* harmony export */ });
/* harmony import */ var _ui_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ui.js */ "./assets/src/ui.js");
/* harmony import */ var _input_inputUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./input/inputUtils */ "./assets/src/components/input/inputUtils.js");
/* harmony import */ var _input_input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./input/input */ "./assets/src/components/input/input.js");
/* harmony import */ var _input_inputState__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./input/inputState */ "./assets/src/components/input/inputState.js");
/* harmony import */ var _resultList_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./resultList.js */ "./assets/src/components/resultList.js");





const closeButton = document.getElementById('cas-search-close');
let timeoutId;
function initCloseButton(resultsContainer) {
  function closeSearch(event) {
    if (event) event.preventDefault();
    clearTimeout(timeoutId); // Отменяем запущенный поиск
    (0,_input_inputState__WEBPACK_IMPORTED_MODULE_3__.setLoading)(false); // Разрешаем дальнейшие действия

    (0,_input_inputUtils__WEBPACK_IMPORTED_MODULE_1__.blurInput)();
    (0,_ui_js__WEBPACK_IMPORTED_MODULE_0__.collapseSearchForm)();
    (0,_input_input__WEBPACK_IMPORTED_MODULE_2__.clearInput)();
    (0,_input_inputState__WEBPACK_IMPORTED_MODULE_3__.resetInitialInputValue)(); // 🛠 Теперь `initialInputValue` сбрасывается!

    (0,_resultList_js__WEBPACK_IMPORTED_MODULE_4__.clearResults)(resultsContainer);
    (0,_resultList_js__WEBPACK_IMPORTED_MODULE_4__.hideResults)(resultsContainer);
    (0,_ui_js__WEBPACK_IMPORTED_MODULE_0__.updateButtonState)('search');
  }
  closeButton.addEventListener('click', closeSearch);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !(0,_input_inputState__WEBPACK_IMPORTED_MODULE_3__.isLoading)()) {
      closeSearch();
    }
  });
}

/***/ }),

/***/ "./assets/src/components/buttonSearch.js":
/*!***********************************************!*\
  !*** ./assets/src/components/buttonSearch.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initSearchButton: function() { return /* binding */ initSearchButton; }
/* harmony export */ });
/* harmony import */ var _ui_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ui.js */ "./assets/src/ui.js");
/* harmony import */ var _search_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../search.js */ "./assets/src/search.js");


const searchButton = document.getElementById('cas-search-submit');
function initSearchButton(resultsContainer) {
  searchButton.addEventListener('click', event => {
    event.preventDefault();
    (0,_ui_js__WEBPACK_IMPORTED_MODULE_0__.expandSearchForm)();
    (0,_ui_js__WEBPACK_IMPORTED_MODULE_0__.updateButtonState)('clear');
    document.getElementById('cas-search').focus();
    if (document.getElementById('cas-search').value.trim() !== '') {
      (0,_search_js__WEBPACK_IMPORTED_MODULE_1__["default"])(document.getElementById('cas-search').value, resultsContainer);
    }
  });
}

/***/ }),

/***/ "./assets/src/components/input/input.js":
/*!**********************************************!*\
  !*** ./assets/src/components/input/input.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearInput: function() { return /* binding */ clearInput; },
/* harmony export */   initInputEvents: function() { return /* binding */ initInputEvents; }
/* harmony export */ });
/* harmony import */ var _inputHandlers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inputHandlers.js */ "./assets/src/components/input/inputHandlers.js");
/* harmony import */ var _inputState_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inputState.js */ "./assets/src/components/input/inputState.js");


const input = document.getElementById('cas-search');
let timeoutId;
function initInputEvents(resultsContainer) {
  (0,_inputHandlers_js__WEBPACK_IMPORTED_MODULE_0__.initInputHandlers)(input, resultsContainer);
}

// 🛠 Очистка поля ввода
function clearInput() {
  if ((0,_inputState_js__WEBPACK_IMPORTED_MODULE_1__.isLoading)()) return; // Запрещаем очистку во время поиска

  (0,_inputState_js__WEBPACK_IMPORTED_MODULE_1__.resetState)();
  (0,_inputState_js__WEBPACK_IMPORTED_MODULE_1__.resetInputValue)(input);
  clearTimeout(timeoutId);
}

/***/ }),

/***/ "./assets/src/components/input/inputEvents.js":
/*!****************************************************!*\
  !*** ./assets/src/components/input/inputEvents.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   onClick: function() { return /* binding */ onClick; },
/* harmony export */   onCut: function() { return /* binding */ onCut; },
/* harmony export */   onInput: function() { return /* binding */ onInput; },
/* harmony export */   onKeydown: function() { return /* binding */ onKeydown; },
/* harmony export */   onKeyup: function() { return /* binding */ onKeyup; }
/* harmony export */ });
/* harmony import */ var _search_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../search.js */ "./assets/src/search.js");
/* harmony import */ var _resultList_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../resultList.js */ "./assets/src/components/resultList.js");
/* harmony import */ var _inputState_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./inputState.js */ "./assets/src/components/input/inputState.js");
/* harmony import */ var _inputUtils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./inputUtils.js */ "./assets/src/components/input/inputUtils.js");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../ui */ "./assets/src/ui.js");





const SEARCH_DELAY = 700;
let timeoutId;
function onInput(event, input, resultsContainer) {
  //if (isBackspaceActive() && !isLoading()) return

  if ((0,_inputState_js__WEBPACK_IMPORTED_MODULE_2__.isLoading)()) {
    event.preventDefault();
    input.value = (0,_inputState_js__WEBPACK_IMPORTED_MODULE_2__.getLastStableInputValue)();
    return;
  }
  clearTimeout(timeoutId);
  const currentValue = input.value.trim();
  if (currentValue === '') {
    (0,_inputState_js__WEBPACK_IMPORTED_MODULE_2__.resetState)({
      resetInitial: false
    });
    (0,_resultList_js__WEBPACK_IMPORTED_MODULE_1__.clearResults)(resultsContainer);
    (0,_resultList_js__WEBPACK_IMPORTED_MODULE_1__.hideResults)(resultsContainer);
    (0,_ui__WEBPACK_IMPORTED_MODULE_4__.updateButtonState)('search');
    return;
  }
  if (currentValue.length <= 3) {
    (0,_inputState_js__WEBPACK_IMPORTED_MODULE_2__.resetState)();
  }
  if (currentValue.length <= 3 && resultsContainer.querySelectorAll('li').length !== 0) {
    (0,_inputState_js__WEBPACK_IMPORTED_MODULE_2__.setLoading)(false);
    (0,_resultList_js__WEBPACK_IMPORTED_MODULE_1__.clearResults)(resultsContainer);
    (0,_resultList_js__WEBPACK_IMPORTED_MODULE_1__.hideResults)(resultsContainer);
  }
  if ((0,_inputState_js__WEBPACK_IMPORTED_MODULE_2__.wasInputCleared)()) {
    (0,_inputState_js__WEBPACK_IMPORTED_MODULE_2__.setInitialInputValue)(currentValue);
    (0,_inputState_js__WEBPACK_IMPORTED_MODULE_2__.resetInputCleared)();
  }
  if ((0,_inputUtils_js__WEBPACK_IMPORTED_MODULE_3__.normalizeText)(currentValue) === (0,_inputUtils_js__WEBPACK_IMPORTED_MODULE_3__.normalizeText)((0,_inputState_js__WEBPACK_IMPORTED_MODULE_2__.getLastStableInputValue)())) {
    return;
  }
  (0,_ui__WEBPACK_IMPORTED_MODULE_4__.updateButtonState)(currentValue.length > 0 ? 'clear' : 'search');
  if (currentValue.length < 3) return;
  timeoutId = setTimeout(() => {
    if (!(0,_inputState_js__WEBPACK_IMPORTED_MODULE_2__.isLoading)()) {
      if ((0,_inputState_js__WEBPACK_IMPORTED_MODULE_2__.isBackspaceActive)()) return;
      if ((0,_inputUtils_js__WEBPACK_IMPORTED_MODULE_3__.normalizeText)(currentValue) === (0,_inputUtils_js__WEBPACK_IMPORTED_MODULE_3__.normalizeText)((0,_inputState_js__WEBPACK_IMPORTED_MODULE_2__.getLastStableInputValue)())) return;
      (0,_search_js__WEBPACK_IMPORTED_MODULE_0__["default"])(currentValue, resultsContainer);
      (0,_inputState_js__WEBPACK_IMPORTED_MODULE_2__.setLastStableInputValue)(currentValue);
    }
  }, SEARCH_DELAY);
}
function onCut(event, input, resultsContainer) {
  if ((0,_inputState_js__WEBPACK_IMPORTED_MODULE_2__.isLoading)()) {
    event.preventDefault();
    return;
  }
  setTimeout(() => {
    if (input.value.trim() === '') {
      (0,_resultList_js__WEBPACK_IMPORTED_MODULE_1__.clearResults)(resultsContainer);
      (0,_resultList_js__WEBPACK_IMPORTED_MODULE_1__.hideResults)(resultsContainer);
      (0,_ui__WEBPACK_IMPORTED_MODULE_4__.updateButtonState)('search');
    }
  }, 10);
}
function onClick(resultsContainer) {
  (0,_resultList_js__WEBPACK_IMPORTED_MODULE_1__.showResults)(resultsContainer);
}
function onKeydown(event) {
  if (event.key === 'Backspace') {
    (0,_inputState_js__WEBPACK_IMPORTED_MODULE_2__.setBackspaceState)(true);
  }
}
function onKeyup(event) {
  if (event.key === 'Backspace') {
    (0,_inputState_js__WEBPACK_IMPORTED_MODULE_2__.setBackspaceState)(false);
  }
}

/***/ }),

/***/ "./assets/src/components/input/inputHandlers.js":
/*!******************************************************!*\
  !*** ./assets/src/components/input/inputHandlers.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initInputHandlers: function() { return /* binding */ initInputHandlers; }
/* harmony export */ });
/* harmony import */ var _inputEvents_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inputEvents.js */ "./assets/src/components/input/inputEvents.js");

function initInputHandlers(input, resultsContainer) {
  input.addEventListener('input', event => (0,_inputEvents_js__WEBPACK_IMPORTED_MODULE_0__.onInput)(event, input, resultsContainer));
  input.addEventListener('cut', event => (0,_inputEvents_js__WEBPACK_IMPORTED_MODULE_0__.onCut)(event, input, resultsContainer));
  input.addEventListener('click', () => (0,_inputEvents_js__WEBPACK_IMPORTED_MODULE_0__.onClick)(resultsContainer));
  input.addEventListener('keydown', event => (0,_inputEvents_js__WEBPACK_IMPORTED_MODULE_0__.onKeydown)(event));
  input.addEventListener('keyup', event => (0,_inputEvents_js__WEBPACK_IMPORTED_MODULE_0__.onKeyup)(event));
}

/***/ }),

/***/ "./assets/src/components/input/inputState.js":
/*!***************************************************!*\
  !*** ./assets/src/components/input/inputState.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getLastStableInputValue: function() { return /* binding */ getLastStableInputValue; },
/* harmony export */   isBackspaceActive: function() { return /* binding */ isBackspaceActive; },
/* harmony export */   isLoading: function() { return /* binding */ isLoading; },
/* harmony export */   resetInitialInputValue: function() { return /* binding */ resetInitialInputValue; },
/* harmony export */   resetInputCleared: function() { return /* binding */ resetInputCleared; },
/* harmony export */   resetInputValue: function() { return /* binding */ resetInputValue; },
/* harmony export */   resetState: function() { return /* binding */ resetState; },
/* harmony export */   setBackspaceState: function() { return /* binding */ setBackspaceState; },
/* harmony export */   setInitialInputValue: function() { return /* binding */ setInitialInputValue; },
/* harmony export */   setLastStableInputValue: function() { return /* binding */ setLastStableInputValue; },
/* harmony export */   setLoading: function() { return /* binding */ setLoading; },
/* harmony export */   wasInputCleared: function() { return /* binding */ wasInputCleared; }
/* harmony export */ });
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

/***/ }),

/***/ "./assets/src/components/input/inputUtils.js":
/*!***************************************************!*\
  !*** ./assets/src/components/input/inputUtils.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   blurInput: function() { return /* binding */ blurInput; },
/* harmony export */   normalizeText: function() { return /* binding */ normalizeText; }
/* harmony export */ });
const search = document.getElementById('cas-search');
function normalizeText(text) {
  return text.replace(/\s+/g, '').toLowerCase();
}
function blurInput() {
  search.blur();
}

/***/ }),

/***/ "./assets/src/components/preloader.js":
/*!********************************************!*\
  !*** ./assets/src/components/preloader.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hideLoader: function() { return /* binding */ hideLoader; },
/* harmony export */   showLoader: function() { return /* binding */ showLoader; }
/* harmony export */ });
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ui */ "./assets/src/ui.js");

const closeButton = document.getElementById('cas-search-close');
let lastVisibleButton = 'search';
function showLoader() {
  lastVisibleButton = closeButton.style.display === 'inline-block' ? 'clear' : 'search';
  // lastVisibleButton = lastVisibleButton === 'clear' ? 'clear' : 'search'

  (0,_ui__WEBPACK_IMPORTED_MODULE_0__.updateButtonState)('loading');
}
function hideLoader() {
  (0,_ui__WEBPACK_IMPORTED_MODULE_0__.updateButtonState)(lastVisibleButton);
}

/***/ }),

/***/ "./assets/src/components/resultList.js":
/*!*********************************************!*\
  !*** ./assets/src/components/resultList.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearResults: function() { return /* binding */ clearResults; },
/* harmony export */   hideResults: function() { return /* binding */ hideResults; },
/* harmony export */   showResults: function() { return /* binding */ showResults; }
/* harmony export */ });
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

/***/ }),

/***/ "./assets/src/events.js":
/*!******************************!*\
  !*** ./assets/src/events.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ initSearchEvents; }
/* harmony export */ });
/* harmony import */ var _components_input_input_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/input/input.js */ "./assets/src/components/input/input.js");
/* harmony import */ var _components_input_inputUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/input/inputUtils */ "./assets/src/components/input/inputUtils.js");
/* harmony import */ var _components_buttonClose_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/buttonClose.js */ "./assets/src/components/buttonClose.js");
/* harmony import */ var _components_buttonSearch_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/buttonSearch.js */ "./assets/src/components/buttonSearch.js");
/* harmony import */ var _components_resultList_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/resultList.js */ "./assets/src/components/resultList.js");





function initSearchEvents() {
  const form = document.querySelector('.cas-search-form');
  const resultsContainer = document.getElementById('cas-search-results');
  (0,_components_input_input_js__WEBPACK_IMPORTED_MODULE_0__.initInputEvents)(resultsContainer);
  (0,_components_buttonSearch_js__WEBPACK_IMPORTED_MODULE_3__.initSearchButton)(resultsContainer);
  (0,_components_buttonClose_js__WEBPACK_IMPORTED_MODULE_2__.initCloseButton)(resultsContainer);
  document.addEventListener('click', event => {
    if (!form.contains(event.target) && !resultsContainer.contains(event.target)) {
      (0,_components_input_inputUtils__WEBPACK_IMPORTED_MODULE_1__.blurInput)();
      (0,_components_resultList_js__WEBPACK_IMPORTED_MODULE_4__.hideResults)(resultsContainer);
    }
  });
}

/***/ }),

/***/ "./assets/src/search.js":
/*!******************************!*\
  !*** ./assets/src/search.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ performSearch; }
/* harmony export */ });
/* harmony import */ var _components_preloader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/preloader */ "./assets/src/components/preloader.js");
/* harmony import */ var _components_input_inputState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/input/inputState */ "./assets/src/components/input/inputState.js");
/* harmony import */ var _components_resultList_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/resultList.js */ "./assets/src/components/resultList.js");
/* global cas_ajax */




function performSearch(query, resultsContainer) {
  if (!query.trim() || query.length <= 3) {
    (0,_components_resultList_js__WEBPACK_IMPORTED_MODULE_2__.clearResults)(resultsContainer);
    return;
  }
  console.log('Search load 1');
  if ((0,_components_input_inputState__WEBPACK_IMPORTED_MODULE_1__.isLoading)()) return;
  (0,_components_input_inputState__WEBPACK_IMPORTED_MODULE_1__.setLoading)(true);
  (0,_components_preloader__WEBPACK_IMPORTED_MODULE_0__.showLoader)();
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
    (0,_components_input_inputState__WEBPACK_IMPORTED_MODULE_1__.setLoading)(false);
    (0,_components_preloader__WEBPACK_IMPORTED_MODULE_0__.hideLoader)();
    (0,_components_resultList_js__WEBPACK_IMPORTED_MODULE_2__.clearResults)(resultsContainer);
    if (data.success && data.data.length > 0) {
      resultsContainer.innerHTML = data.data.map(post => `<li><a href="${post.link}">${post.title}</a><p>${post.excerpt}</p></li>`).join('');

      // Показываем результаты после их обновления
      (0,_components_resultList_js__WEBPACK_IMPORTED_MODULE_2__.showResults)(resultsContainer);
    } else {
      resultsContainer.innerHTML = '<li>Нет результатов</li>';
      (0,_components_resultList_js__WEBPACK_IMPORTED_MODULE_2__.showResults)(resultsContainer);
    }
  }).catch(error => {
    (0,_components_input_inputState__WEBPACK_IMPORTED_MODULE_1__.setLoading)(false);
    (0,_components_preloader__WEBPACK_IMPORTED_MODULE_0__.hideLoader)();
    console.error('Search error:', error);
  });
}

/***/ }),

/***/ "./assets/src/ui.js":
/*!**************************!*\
  !*** ./assets/src/ui.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   collapseSearchForm: function() { return /* binding */ collapseSearchForm; },
/* harmony export */   expandSearchForm: function() { return /* binding */ expandSearchForm; },
/* harmony export */   updateButtonState: function() { return /* binding */ updateButtonState; }
/* harmony export */ });
const form = document.querySelector('.cas-search-form');
const buttons = {
  search: document.getElementById('cas-search-submit'),
  clear: document.getElementById('cas-search-close'),
  loading: document.getElementById('cas-search-loader')
};
function expandSearchForm() {
  form.classList.add('active');
}
function collapseSearchForm() {
  form.classList.remove('active');
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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
!function() {
/*!*****************************!*\
  !*** ./assets/src/index.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _events_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events.js */ "./assets/src/events.js");

document.addEventListener('DOMContentLoaded', () => {
  (0,_events_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
});
}();
/******/ })()
;
//# sourceMappingURL=search.js.map