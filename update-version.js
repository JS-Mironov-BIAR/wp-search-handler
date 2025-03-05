const fs = require('fs');
const path = require('path');

const pluginFilePath = path.join(__dirname, 'custom-ajax-search.php');

// 1️⃣ Function for updating the version in `custom-ajax-search.php `
function updatePluginVersion() {
    let pluginFileContent = fs.readFileSync(pluginFilePath, 'utf8');

    // Find the line with the version in `custom-ajax-search.php `
    const versionRegex = /Version:\s*(\d+)\.(\d+)\.(\d+)/;
    const match = pluginFileContent.match(versionRegex);

    if (!match) {
        console.error('❌ Couldn\'t find the current version in custom-ajax-search.php');
        process.exit(1);
    }

    // Increasing the patch version (X.Y.Z → X.Y.(Z+1))
    let [fullMatch, major, minor, patch] = match;
    patch = parseInt(patch, 10) + 1;
    const newVersion = `${major}.${minor}.${patch}`;

    // Updating the file with the new version
    pluginFileContent = pluginFileContent.replace(versionRegex, `Version:     ${newVersion}`);
    fs.writeFileSync(pluginFilePath, pluginFileContent, 'utf8');

    console.log(`✅ The version has been updated to ${newVersion}`);

    return newVersion;
}

// 2️⃣ We are updating the version
const newVersion = updatePluginVersion();

// 3️⃣ Auto-commit a new version to the repository
const { execSync } = require('child_process');

try {
    execSync(`git add custom-ajax-search.php`, { stdio: 'inherit' });
    execSync(`git commit -m "chore: bump version to ${newVersion}"`, { stdio: 'inherit' });
    console.log('✅ The version is fixed in Git.');
} catch (error) {
    console.error('❌ Error when committing a version in Git:', error);
}
