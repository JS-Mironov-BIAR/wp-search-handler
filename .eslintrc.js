module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'airbnb-base',
        'plugin:prettier/recommended' // Подключает Prettier
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        indent: ['error', 4], // 4 пробела
        semi: ['error', 'never'], // Без точек с запятой
        camelcase: 'off', // Разрешаем snake_case (как в PHP)
        'max-len': ['error', { code: 140 }], // Лимит в 140 символов
        'import/no-unresolved': 'off', // Отключаем для WordPress
        'import/extensions': 'off', // Отключаем расширения в импортах
        'import/no-cycle': 'error', // Запрещаем циклические зависимости
        'no-unused-vars': 'warn', // Предупреждать о неиспользуемых переменных
        'no-console': 'off', // Разрешаем console.log с предупреждением
        'no-shadow': 'off', // Разрешаем теневые переменные
        'consistent-return': 'off', // Отключаем принудительное `return`
        'no-param-reassign': 'off', // Разрешаем изменять аргументы функций
        'no-use-before-define': 'off', // Разрешаем использовать функции до объявления
        'prefer-destructuring': 'off', // Разрешаем работу без деструктуризации
        'no-plusplus': 'off', // Разрешаем `i++`
        'import/prefer-default-export': 'off', // Разрешает использование в файле только 1 экспорта
        'prettier/prettier': ['error', {
            'singleQuote': true, // Одинарные кавычки
            'printWidth': 120, // Ограничение на строку
            'tabWidth': 4, // Отступ 4 пробела
            'semi': false, // Без точек с запятой
        }],
    },
}
