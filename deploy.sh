#!/bin/bash
# deploy.sh - Auto-updates cache version and pushes to GitHub

# Generate timestamp version (YYYYMMDDHHmmss)
VERSION=$(date +%Y%m%d%H%M%S)

echo "📦 Deploying with version: $VERSION"

# Update version numbers in index.html (only in ?v= patterns)
sed -i '' "s/?v=[0-9]*/?v=$VERSION/g" index.html

# Update the APP_VERSION variable
sed -i '' "s/APP_VERSION = '[0-9]*'/APP_VERSION = '$VERSION'/g" index.html

# Stage and commit
git add .
git commit -m "Deploy: $VERSION"

# Push
git push origin main

echo "✅ Deployed! Version $VERSION is now live."
echo "🌐 Site: https://niraulaniragh.github.io/cs-master-pro/"
