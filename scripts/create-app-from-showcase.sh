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
PARENT_DIR="$(cd "$REPO_ROOT/.." && pwd)"
SOURCE_APP_DIR="$REPO_ROOT/apps/showcase"
TARGET_APP_DIR="$PARENT_DIR/$APP_NAME"

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

echo "Creating app '$APP_NAME' from template 'showcase' in '$TARGET_APP_DIR'..."

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
  cat "$TARGET_APP_DIR/.env.example" | sed -e "s|showcase|$APP_NAME|g" > "$TARGET_APP_DIR/.env.example.tmp"
  mv "$TARGET_APP_DIR/.env.example.tmp" "$TARGET_APP_DIR/.env.example"
  cp "$TARGET_APP_DIR/.env.example" "$TARGET_APP_DIR/.env"
fi

# Update package.json and composer.json metadata and inject workspace libs.
REPO_ROOT="$REPO_ROOT" PARENT_DIR="$PARENT_DIR" APP_NAME="$APP_NAME" node <<'NODE'
const fs = require('fs');
const path = require('path');

const repoRoot = process.env.REPO_ROOT;
const parentDir = process.env.PARENT_DIR;
const appName = process.env.APP_NAME;
const targetAppDir = path.join(parentDir, appName);

const packageJsonPath = path.join(targetAppDir, 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  throw new Error(`Missing package.json in generated app: ${packageJsonPath}`);
}

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
packageJson.name = appName;
packageJson.dependencies = packageJson.dependencies || {};

const libsDir = path.join(repoRoot, 'libs');
if (fs.existsSync(libsDir)) {
  for (const entry of fs.readdirSync(libsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const libPackagePath = path.join(libsDir, entry.name, 'package.json');
    if (!fs.existsSync(libPackagePath)) continue;
    const libPkg = JSON.parse(fs.readFileSync(libPackagePath, 'utf8'));
    if (libPkg.name) {
      packageJson.dependencies[libPkg.name] = 'latest';
    }
  }
}

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf8');

const composerJsonPath = path.join(targetAppDir, 'composer.json');
if (fs.existsSync(composerJsonPath)) {
  const composerJson = JSON.parse(fs.readFileSync(composerJsonPath, 'utf8'));
  composerJson.name = `new-project/${appName}`;
  composerJson.description = `${appName} application generated from showcase template`;
  fs.writeFileSync(composerJsonPath, JSON.stringify(composerJson, null, 2) + '\n', 'utf8');
}
NODE

# --- Copy Environment Configurations & Tools ---
if [[ -d "$REPO_ROOT/.vscode" ]]; then
  cp -R "$REPO_ROOT/.vscode" "$TARGET_APP_DIR/.vscode"
fi

if [[ -f "$REPO_ROOT/.node-version" ]]; then
  cp "$REPO_ROOT/.node-version" "$TARGET_APP_DIR/.node-version"
fi

if [[ -d "$REPO_ROOT/docker" ]]; then
  cp -R "$REPO_ROOT/docker" "$TARGET_APP_DIR/docker"
fi

for composeFile in "docker-compose.yml" "docker-compose.local.yml"; do
  srcCompose="$REPO_ROOT/$composeFile"
  destCompose="$TARGET_APP_DIR/$composeFile"
  if [[ -f "$srcCompose" ]]; then
    # Fix paths targeting the new local root and replace container prefixes
    cat "$srcCompose" | sed -e "s|\./apps/showcase|.|g" \
                            -e "s|reference-app-laravel-vue|$APP_NAME|g" \
                            -e "s|showcase|$APP_NAME|g" > "$destCompose"
  fi
done

if [[ -d "$REPO_ROOT/scripts" ]]; then
  mkdir -p "$TARGET_APP_DIR/scripts"
  for setupFile in "setup.ps1" "setup.sh"; do
    srcSetup="$REPO_ROOT/scripts/$setupFile"
    destSetup="$TARGET_APP_DIR/scripts/$setupFile"
    if [[ -f "$srcSetup" ]]; then
      # Fix paths targeting the new local root and replace container prefixes
      cat "$srcSetup" | sed -e "s|apps/showcase/||g" \
                            -e "s|reference-app-laravel-vue|$APP_NAME|g" \
                            -e "s|showcase|$APP_NAME|g" > "$destSetup"
      chmod +x "$destSetup"
    fi
  done
fi

echo "Replacing 'showcase' with '$APP_NAME' in all text files..."
find "$TARGET_APP_DIR" -type f \( -name "*.php" -o -name "*.vue" -o -name "*.ts" -o -name "*.js" -o -name "*.json" -o -name "*.yml" -o -name "*.yaml" -o -name "*.md" -o -name ".env*" -o -name "*.scss" -o -name "*.css" -o -name "*.xml" -o -name "*.html" -o -name "*.sh" -o -name "*.ps1" \) | while read -r file; do
  if grep -q "showcase" "$file"; then
    cat "$file" | sed -e "s|showcase|$APP_NAME|g" > "$file.tmp"
    mv "$file.tmp" "$file"
  fi
done

# Generate Custom README.md
cat <<EOF > "$TARGET_APP_DIR/README.md"
# $APP_NAME

This standalone application was generated from the Showcase template.

## Requirements
- Node.js (see \`.node-version\`)
- pnpm
- Docker Desktop

## Quickstart

The fastest way to get started is using the included automated setup scripts. They will install all dependencies, configure the environment, and spin up the Docker infrastructure automatically.

**Windows (PowerShell):**
\`\`\`powershell
.\\scripts\\setup.ps1
\`\`\`

**macOS / Linux (Bash):**
\`\`\`bash
./scripts/setup.sh
\`\`\`

Once the setup completes, start the Frontend Development Server:
\`\`\`bash
pnpm dev
\`\`\`
EOF

echo
echo "Done. Standalone app created at: $TARGET_APP_DIR"
echo
echo "Next steps for your new app:"
echo "  cd $TARGET_APP_DIR"
echo "  1. Run the setup script:"
echo "     ./scripts/setup.sh   (or .\scripts\setup.ps1 on Windows)"
echo "  2. Start dev server:"
echo "     pnpm dev"
