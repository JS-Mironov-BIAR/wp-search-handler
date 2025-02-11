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
        'max-len': ['error', { code: 120 }], // Лимит в 120 символов
        'import/no-unresolved': 'off', // Отключаем для WordPress
        'import/extensions': 'off', // Отключаем расширения в импортах
        'no-unused-vars': 'warn', // Предупреждать о неиспользуемых переменных
        'no-console': 'warn', // Разрешаем console.log с предупреждением
        'no-shadow': 'off', // Разрешаем теневые переменные
        'consistent-return': 'off', // Отключаем принудительное `return`
        'no-param-reassign': 'off', // Разрешаем изменять аргументы функций
        'no-use-before-define': 'off', // Разрешаем использовать функции до объявления
        'prefer-destructuring': 'off', // Разрешаем работу без деструктуризации
        'no-plusplus': 'off', // Разрешаем `i++`
        'prettier/prettier': ['error', {
            'singleQuote': true, // Одинарные кавычки
            'printWidth': 120, // Ограничение на строку
            'tabWidth': 4, // Отступ 4 пробела
            'semi': false, // Без точек с запятой
        }],
    },
}
