const fs = require('fs');
const path = require('path');

const pluginFilePath = path.join(__dirname, 'custom-ajax-search.php');

// 1️⃣ Функция для обновления версии в `custom-ajax-search.php`
function updatePluginVersion() {
    let pluginFileContent = fs.readFileSync(pluginFilePath, 'utf8');

    // Найдем строку с версией в `custom-ajax-search.php`
    const versionRegex = /Version:\s*(\d+)\.(\d+)\.(\d+)/;
    const match = pluginFileContent.match(versionRegex);

    if (!match) {
        console.error('❌ Не удалось найти текущую версию в custom-ajax-search.php');
        process.exit(1);
    }

    // Увеличиваем patch-версию (X.Y.Z → X.Y.(Z+1))
    let [fullMatch, major, minor, patch] = match;
    patch = parseInt(patch, 10) + 1;
    const newVersion = `${major}.${minor}.${patch}`;

    // Обновляем файл с новой версией
    pluginFileContent = pluginFileContent.replace(versionRegex, `Version:     ${newVersion}`);
    fs.writeFileSync(pluginFilePath, pluginFileContent, 'utf8');

    console.log(`✅ Версия обновлена до ${newVersion}`);

    return newVersion;
}

// 2️⃣ Выполняем обновление версии
const newVersion = updatePluginVersion();

// 3️⃣ Авто-коммит новой версии в репозиторий
const { execSync } = require('child_process');

try {
    execSync(`git add custom-ajax-search.php`, { stdio: 'inherit' });
    execSync(`git commit -m "chore: bump version to ${newVersion}"`, { stdio: 'inherit' });
    console.log('✅ Версия зафиксирована в Git.');
} catch (error) {
    console.error('❌ Ошибка при коммите версии в Git:', error);
}
