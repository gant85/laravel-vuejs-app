#!/usr/bin/env bash

set -euo pipefail

APP_NAME="${1:-}"
FORCE="${2:-}"

if [[ -z "$APP_NAME" ]]; then
  echo "Usage: ./scripts/create-app-from-showcase.sh <app-name> [--force]"
  echo "Example: ./scripts/create-app-from-showcase.sh clinic-portal --force"
  exit 1
fi

if [[ ! "$APP_NAME" =~ ^[a-z][a-z0-9-]*$ ]]; then
  echo "Invalid app name '$APP_NAME'. Use lowercase letters, numbers, and dashes."
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SOURCE_APP_DIR="$REPO_ROOT/apps/showcase"
TARGET_APP_DIR="$REPO_ROOT/apps/$APP_NAME"

if [[ ! -d "$SOURCE_APP_DIR" ]]; then
  echo "Template app not found: $SOURCE_APP_DIR"
  exit 1
fi

if [[ -d "$TARGET_APP_DIR" && "$FORCE" != "--force" ]]; then
  echo "Target app already exists: $TARGET_APP_DIR"
  echo "Use --force to replace it."
  exit 1
fi

if [[ -d "$TARGET_APP_DIR" ]]; then
  echo "Removing existing app directory: $TARGET_APP_DIR"
  rm -rf "$TARGET_APP_DIR"
fi

echo "Creating app '$APP_NAME' from template 'showcase'..."

mkdir -p "$TARGET_APP_DIR"
rsync -a \
  --exclude 'node_modules' \
  --exclude 'vendor' \
  --exclude '.git' \
  --exclude 'public/build' \
  --exclude 'storage/logs' \
  --exclude 'storage/framework/cache/data' \
  --exclude 'storage/framework/sessions' \
  --exclude 'storage/framework/views' \
  "$SOURCE_APP_DIR/" "$TARGET_APP_DIR/"

# Ensure environment file is recreated from template.
if [[ -f "$TARGET_APP_DIR/.env" ]]; then
  rm -f "$TARGET_APP_DIR/.env"
fi

if [[ -f "$TARGET_APP_DIR/.env.example" ]]; then
  cp "$TARGET_APP_DIR/.env.example" "$TARGET_APP_DIR/.env"
fi

# Update package.json and composer.json metadata and inject workspace libs.
REPO_ROOT="$REPO_ROOT" APP_NAME="$APP_NAME" node <<'NODE'
const fs = require('fs');
const path = require('path');

const repoRoot = process.env.REPO_ROOT;
const appName = process.env.APP_NAME;
const targetAppDir = path.join(repoRoot, 'apps', appName);

const packageJsonPath = path.join(targetAppDir, 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  throw new Error(`Missing package.json in generated app: ${packageJsonPath}`);
}

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
packageJson.name = `@reference-app-laravel-vue/${appName}`;
packageJson.dependencies = packageJson.dependencies || {};

const libsDir = path.join(repoRoot, 'libs');
for (const entry of fs.readdirSync(libsDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const libPackagePath = path.join(libsDir, entry.name, 'package.json');
  if (!fs.existsSync(libPackagePath)) continue;
  const libPkg = JSON.parse(fs.readFileSync(libPackagePath, 'utf8'));
  if (libPkg.name) {
    packageJson.dependencies[libPkg.name] = 'workspace:*';
  }
}

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf8');

const composerJsonPath = path.join(targetAppDir, 'composer.json');
if (fs.existsSync(composerJsonPath)) {
  const composerJson = JSON.parse(fs.readFileSync(composerJsonPath, 'utf8'));
  composerJson.name = `reference-app-laravel-vue/${appName}`;
  composerJson.description = `${appName} application generated from showcase template`;
  fs.writeFileSync(composerJsonPath, JSON.stringify(composerJson, null, 2) + '\n', 'utf8');
}
NODE

echo
echo "Done. App created at: apps/$APP_NAME"
echo
echo "Next steps:"
echo "  1. Install workspace dependencies:"
echo "     pnpm install"
echo "  2. (Optional) Install PHP dependencies in Docker for the new app:"
echo "     docker exec reference-app-laravel-vue-php composer install --working-dir=/var/www/apps/$APP_NAME"
echo "  3. Start dev server for the new app:"
echo "     pnpm --filter @reference-app-laravel-vue/$APP_NAME dev"
