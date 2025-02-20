import { showLoader, hideLoader } from '../components/preloader'
import { isLoading, setLoading } from '../components/input/inputState'
import { clearResults, showResults } from '../components/resultList'
import { enableLazyLoading } from './lazyLoad.js'
import { fetchSearchResults } from '../services/searchApi'

let currentPage = 1;
let totalPages = 1;
let lastQuery = '';

export function performSearch(query, resultsContainer, loadMore = false) {
    if (!query.trim() || query.length <= 3) {
        clearResults(resultsContainer);
        return;
    }

    if (isLoading()) return;

    const shouldScrollUp = !loadMore && resultsContainer.scrollTop > 100;

    if (!loadMore) {
        currentPage = 1;
        lastQuery = query;
        totalPages = 1;

        if (shouldScrollUp) {
            resultsContainer.scrollTo({ top: 0, behavior: "smooth" });
        }

        // Удаляем старый `loadMoreButton`, если есть
        const existingLoadMoreButton = document.getElementById('load-more');
        if (existingLoadMoreButton) {
            existingLoadMoreButton.remove();
        }
    }

    setLoading(true);
    showLoader();

    fetchSearchResults(query, currentPage)
        .then(data => {
            setLoading(false);
            hideLoader();

            if (!loadMore) {
                clearResults(resultsContainer);
            }

            if (data.success && data.data.length > 0) {
                totalPages = data.pagination.total_pages;
                resultsContainer.innerHTML += data.data.map(
                    (post) => `<li><a href="${post.relationships.link}">${post.attributes.title}</a><p>${post.attributes.excerpt}</p></li>`
                ).join('');

                showResults(resultsContainer);
                currentPage++;

                // Проверяем, есть ли ещё страницы
                if (data.pagination.has_more) {
                    // Создаём `loadMoreButton` заново
                    let loadMoreButton = document.getElementById('load-more');
                    if (!loadMoreButton) {
                        resultsContainer.insertAdjacentHTML('beforeend', '<li id="load-more">⬇ Загрузить ещё...</li>');
                        loadMoreButton = document.getElementById('load-more'); // Получаем новый элемент
                    } else {
                        loadMoreButton.innerText = "⬇ Загрузить ещё...";
                    }

                    // Важно! Обновляем `lazyLoad`, передавая новый `query`
                    enableLazyLoading(resultsContainer, query);
                } else {
                    const loadMoreButton = document.getElementById('load-more');
                    if (loadMoreButton) {
                        loadMoreButton.remove();
                    }
                }
            } else {
                if (!loadMore) {
                    resultsContainer.innerHTML = '<li>⚠ Нет результатов</li>';
                }
                showResults(resultsContainer);
            }
        })
        .catch(error => {
            setLoading(false);
            hideLoader();
            console.error('Search error:', error);
        });
}
