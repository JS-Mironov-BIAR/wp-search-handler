import { performSearch } from './searchPagination';

let observer = null;

export function enableLazyLoading(resultsContainer, query) {
    if (!query) {
        console.error("❌ Ошибка: query в enableLazyLoading не определён!");
        return;
    }

    if (observer) {
        observer.disconnect();
    }

    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const loadMoreButton = document.getElementById('load-more');

                if (loadMoreButton) {
                    // Показываем индикатор загрузки
                    loadMoreButton.innerText = "🔄 Загрузка...";

                    console.log("📌 Запускаем performSearch для подгрузки с query:", query);

                    // Вызываем performSearch, но без `.then()`, потому что он не возвращает Promise
                    performSearch(query, resultsContainer, true);

                    // Удаляем кнопку после загрузки данных
                    setTimeout(() => {
                        const newLoadMoreButton = document.getElementById('load-more');
                        if (newLoadMoreButton) {
                            newLoadMoreButton.remove();
                        }
                    }, 1000); // Добавляем небольшую задержку перед удалением
                }
            }
        });
    }, {
        root: resultsContainer,
        rootMargin: '0px',
        threshold: 1.0
    });

    const loadMoreButton = document.getElementById('load-more');
    if (loadMoreButton) {
        observer.observe(loadMoreButton);
    }
}
