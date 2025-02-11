Файловая структура плагина

/wp-content/plugins/custom-ajax-search/
│── custom-ajax-search.php        # Основной файл плагина
│── /includes/
│   ├── init.php                  # Инициализация плагина
│   ├── search-handler.php        # Обработчик AJAX-запросов
│   ├── shortcode.php             # Регистрация шорткода
│   ├── assets.php                # Подключение CSS и JS
│   ├── helpers.php               # Вспомогательные функции
│── /assets/
│   ├── search.js                 # Логика поиска на клиенте
│   ├── search.css                # Стили
│── /languages/
│   ├── custom-ajax-search-ru_RU.mo
│   ├── custom-ajax-search-ru_RU.po
│   ├── custom-ajax-search-en_US.mo
│   ├── custom-ajax-search-en_US.po
│── webpack.config.js             # Webpack для сборки фронтенда
│── readme.txt                    # Документация WordPress
│── LICENSE                       # Лицензия GPL
