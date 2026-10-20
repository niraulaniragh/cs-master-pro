#!/bin/bash
# deploy.sh - Auto-updates cache version and pushes to GitHub

# Generate timestamp version (YYYYMMDDHHmmss)
VERSION=$(date +%Y%m%d%H%M%S)

echo "📦 Deploying with version: $VERSION"

# Update all version numbers in index.html
sed -i '' "s/v=[0-9]*/v=$VERSION/g" index.html

# Update the APP_VERSION variable
sed -i '' "s/APP_VERSION = '[0-9]*'/APP_VERSION = '$VERSION'/g" index.html

# Update the comment timestamp
TIMESTAMP=$(date +%Y-%m-%dT%H:%M)
sed -i '' "s/Updated: [0-9T:-]*/Updated: $TIMESTAMP/g" index.html

# Stage and commit
git add .
git commit -m "Deploy: $VERSION

Auto-generated version for cache busting"

# Push
git push origin main

echo "✅ Deployed! Version $VERSION is now live."
echo "🌐 Site: https://niraulaniragh.github.io/cs-master-pro/"
