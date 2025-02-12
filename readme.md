# Custom AJAX Search for WordPress

## 📌 Описание | Description
**Custom AJAX Search** — это мощный и легкий плагин для WordPress, добавляющий AJAX-поиск, позволяя пользователям находить контент без перезагрузки страницы.

**Custom AJAX Search** is a powerful and lightweight WordPress plugin that enables AJAX search, allowing users to find content without reloading the page.

---

## 🚀 Функциональность | Features
- 🔎 **Мгновенный AJAX-поиск** | Instant AJAX search
- 📝 **Поддержка поиска по заголовкам и содержимому** | Search by titles and content
- 🎨 **Гибкая настройка стилей и логики поиска** | Flexible customization of styles and search logic
- 🛠 **Совместимость с последними версиями WordPress** | Compatibility with the latest WordPress versions
- 🌍 **Поддержка мультиязычности (WPML, Polylang)** | Multilingual support (WPML, Polylang)
- 🏎 **Высокая производительность** | High performance

---

## 🔧 Установка | Installation

### 📥 1. Установка вручную | Manual installation
1. **Скачайте и загрузите** папку `custom-ajax-search` в каталог `/wp-content/plugins/`.
2. **Активируйте плагин** через меню **Плагины** в админ-панели WordPress.
3. **Добавьте шорткод** `[custom_ajax_search]` в нужное место на сайте.

### 🌍 2. Установка через WordPress (рекомендуется) | Installation via WordPress (recommended)
1. Перейдите в **Плагины → Добавить новый**.
2. Введите `Custom AJAX Search` в строке поиска.
3. Установите и активируйте плагин.
4. Вставьте шорткод `[custom_ajax_search]` в пост, страницу или файл темы.

---

## 🎯 Использование | Usage
### 📌 Шорткод | Shortcode
После установки добавьте следующий шорткод в ваш контент или файлы шаблонов:

```html
[custom_ajax_search]
```

### 🎨 Использование внутри темы | Usage inside theme
```php
<?php echo do_shortcode('[custom_ajax_search]'); ?>
```

---

## 🏗 Файловая структура плагина | Plugin File Structure
```plaintext
/wp-content/plugins/custom-ajax-search/
│── custom-ajax-search.php        # Основной файл плагина | Main plugin file
│── /includes/
│   ├── init.php                  # Инициализация плагина | Plugin initialization
│   ├── search-handler.php        # Обработчик AJAX-запросов | AJAX request handler
│   ├── shortcode.php             # Регистрация шорткода | Shortcode registration
│   ├── assets.php                # Подключение CSS и JS | Enqueueing assets
│   ├── helpers.php               # Вспомогательные функции | Helper functions
│── /assets/
│   ├── search.js                 # Логика поиска на клиенте | Frontend search logic
│   ├── search.css                # Стили | Styles
│── /languages/
│   ├── custom-ajax-search-ru_RU.mo
│   ├── custom-ajax-search-ru_RU.po
│   ├── custom-ajax-search-en_US.mo
│   ├── custom-ajax-search-en_US.po
│── webpack.config.js             # Webpack для сборки фронтенда | Webpack configuration
│── readme.txt                    # Документация WordPress | WordPress readme
│── LICENSE                       # Лицензия GPL | GPL license
```

## ⚙ Разработка | Development

### 📦 1. Установка зависимостей | Install dependencies
```sh
npm install
```

### 🔨 2. Сборка проекта | Build project
```sh
npm run build
```

### 🔄 3. Запуск режима разработки | Start development mode
```sh
npm run watch
```

### 🛠 Технологии | Technologies
1. *Webpack 5* (модульная сборка) | *Modular bundling with Webpack 5*
2. *ESLint* + *Prettier* (линтинг и форматирование) | *Linting and formatting*
3. *Babel* (транспиляция ES6+ кода) | *ES6+ transpilation*
4. *AJAX* (fetch API) для обновления результатов поиска без перезагрузки | *AJAX search updates without reloading*
5. CSS-модули для стилизации | CSS Modules for styling
6. *WordPress AJAX API* для обработки запросов | *WordPress AJAX API for request handling*
7. *PHP 8+* (поддержка последних версий PHP) | *PHP 8+ compatibility*

### ✅ Совместимость | Compatibility
1. WordPress **5.8+** (рекомендуемая версия 6.0+)
2. PHP **8.0+**
3. Совместимость с **Gutenberg** & **Classic Editor**
4. Поддержка кэширования результатов поиска

### 🔗 Поддержка и обратная связь | Support & Feedback
Если у вас есть вопросы или предложения, создайте *issue* в репозитории [GitHub](https://github.com/JS-Mironov-BIAR/wp-search-handler).

### 📜 Лицензия | License
Этот плагин распространяется по лицензии **GPL-2.0.** | This plugin is licensed under the **GPL-2.0.**