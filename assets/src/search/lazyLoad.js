import { performSearch } from './searchPagination'

let observer = null
let lazyLoadTimeout = null;

export function enableLazyLoading(resultsContainer, query) {
    if (!query) {
        return
    }

    if (observer) {
        observer.disconnect()
    }

    observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const loadMoreButton = document.getElementById('load-more')

                    if (loadMoreButton && !lazyLoadTimeout) {
                        // Показываем индикатор загрузки
                        loadMoreButton.innerText = '🔄 Загрузка...'

                        console.log('📌 Запускаем performSearch для подгрузки с query:', query)

                        // Вызываем performSearch, но без `.then()`, потому что он не возвращает Promise
                        lazyLoadTimeout = setTimeout(() => {
                            performSearch(query, resultsContainer, true);
                            lazyLoadTimeout = null; // Сбрасываем таймер
                        }, 500);
                    }
                }
            })
        },
        {
            root: resultsContainer,
            rootMargin: '0px',
            threshold: 1.0,
        },
    )

    const loadMoreButton = document.getElementById('load-more')
    if (loadMoreButton) {
        observer.observe(loadMoreButton)
    }
}
