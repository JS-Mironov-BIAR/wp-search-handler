const fs = require('fs');
const path = require('path');

const pluginFilePath = path.join(__dirname, 'custom-ajax-search.php');

// Функция для обновления версии в файле
function updatePluginVersion() {
    let pluginFileContent = fs.readFileSync(pluginFilePath, 'utf8');

    // Найдем строку с версией
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

// Выполняем обновление версии
const newVersion = updatePluginVersion();
