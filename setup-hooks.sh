#!/bin/sh

echo "🔧 Setting up Git Hooks and local exclusions..."

# 1️⃣ Add `dist/` to `.git/info/exclude` (local exclusion from commits)
EXCLUDE_PATH=".git/info/exclude"

if ! grep -q "^assets/dist/" "$EXCLUDE_PATH"; then
    echo "Adding assets/dist/ to .git/info/exclude..."
    echo "assets/dist/" >> "$EXCLUDE_PATH"
    echo "✅ dist/ is now ignored locally in Git but remains in the repository!"
else
    echo "✔ assets/dist/ is already in .git/info/exclude"
fi

# 2️⃣ Create a pre-commit hook to rebuild dist before committing
HOOK_PATH=".git/hooks/pre-commit"

cat > "$HOOK_PATH" <<EOL
#!/bin/sh

echo "🔄 Rebuilding dist before commit..."
npm run build
git add assets/dist/

echo "✅ dist/ has been rebuilt and added to the commit!"
EOL

chmod +x "$HOOK_PATH"
echo "✅ Git Hook pre-commit has been installed!"

echo "🎉 Setup complete! Now dist/ won't be pushed manually, but it will be rebuilt before each commit."
