#!/bin/sh

echo "🔧 Setting up Git Hooks and local exclusions..."

# 1️⃣ Добавляем `dist/` в `.git/info/exclude` (чтобы Git не отслеживал локально)
EXCLUDE_PATH=".git/info/exclude"

if ! grep -q "^assets/dist/" "$EXCLUDE_PATH"; then
    echo "Adding assets/dist/ to .git/info/exclude..."
    echo "assets/dist/" >> "$EXCLUDE_PATH"
    echo "✅ dist/ is now ignored LOCALLY in Git but remains untracked!"
else
    echo "✔ assets/dist/ is already in .git/info/exclude"
fi

# 2️⃣ Создаем `post-checkout` хук для сборки после `git checkout` (при смене ветки или создании новой)
HOOK_PATH=".git/hooks/post-checkout"

cat > "$HOOK_PATH" <<EOL
#!/bin/sh

BRANCH=\$(git rev-parse --abbrev-ref HEAD)

if [[ "\$BRANCH" == "develop" || "\$BRANCH" == feature/* || "\$BRANCH" == hotfix/* ]]; then
    echo "🔄 Auto-building project for branch '\$BRANCH'..."
    npm run build
    echo "✅ Build complete for '\$BRANCH'"
fi
EOL

chmod +x "$HOOK_PATH"
echo "✅ Git Hook post-checkout has been installed!"

# 3️⃣ Создаем `post-merge` хук для сборки после `git pull`
HOOK_PATH=".git/hooks/post-merge"

cat > "$HOOK_PATH" <<EOL
#!/bin/sh

BRANCH=\$(git rev-parse --abbrev-ref HEAD)

if [[ "\$BRANCH" == "develop" || "\$BRANCH" == feature/* || "\$BRANCH" == hotfix/* ]]; then
    echo "🔄 Auto-building project after merge on '\$BRANCH'..."
    npm run build
    echo "✅ Build complete after merge on '\$BRANCH'"
fi
EOL

chmod +x "$HOOK_PATH"
echo "✅ Git Hook post-merge has been installed!"

echo "🎉 Setup complete! Now the project will auto-build after git pull or switching to a development branch."
