#!/usr/bin/env pwsh

param(
  [Parameter(Mandatory = $true)]
  [ValidatePattern('^[a-z][a-z0-9-]*$')]
  [string]$AppName,

  [switch]$Force
)

$ErrorActionPreference = 'Stop'

# Helper feature to write UTF-8 without BOM (fixes composer and shell scripts)
function Set-Utf8NoBom {
  param([string]$Path, [string]$Content)
  [System.IO.File]::WriteAllText($Path, $Content, (New-Object System.Text.UTF8Encoding $false))
}

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$sourceAppDir = Join-Path $repoRoot 'apps/showcase'
$parentDir = (Resolve-Path (Join-Path $repoRoot '..')).Path
$targetAppDir = Join-Path $parentDir $AppName

if (-not (Test-Path $sourceAppDir)) {
  throw "Template app not found: $sourceAppDir"
}

if ((Test-Path $targetAppDir) -and -not $Force) {
  throw "Target app already exists: $targetAppDir. Use -Force to replace it."
}

if (Test-Path $targetAppDir) {
  Write-Host "Removing existing app directory: $targetAppDir"
  Remove-Item -Path $targetAppDir -Recurse -Force
}

Write-Host "Creating app '$AppName' from template 'showcase' in '$targetAppDir'..."

# Use robocopy for fast and reliable recursive copy on Windows.
$excludeDirs = @(
  'node_modules',
  'vendor',
  '.git',
  'public/build',
  'storage/logs',
  'storage/framework/cache/data',
  'storage/framework/sessions',
  'storage/framework/views'
)

$robocopyArgs = @(
  $sourceAppDir,
  $targetAppDir,
  '/E',
  '/NFL',
  '/NDL',
  '/NJH',
  '/NJS',
  '/NP',
  '/XD'
) + ($excludeDirs | ForEach-Object { Join-Path $sourceAppDir $_ })

& robocopy @robocopyArgs | Out-Null

# Robocopy returns non-zero for some successful cases; fail only on real errors (>= 8).
if ($LASTEXITCODE -ge 8) {
  throw "robocopy failed with exit code $LASTEXITCODE"
}

# Ensure environment file is not copied from source app.
$targetEnvPath = Join-Path $targetAppDir '.env'
if (Test-Path $targetEnvPath) {
  Remove-Item $targetEnvPath -Force
}

# Create .env from .env.example for convenience.
$targetEnvExamplePath = Join-Path $targetAppDir '.env.example'
if (Test-Path $targetEnvExamplePath) {
  $envContent = Get-Content $targetEnvExamplePath -Raw
  $envContent = $envContent -replace "showcase", $AppName
  Set-Utf8NoBom -Path $targetEnvExamplePath -Content $envContent
  Set-Utf8NoBom -Path $targetEnvPath -Content $envContent
}

# Update package.json app package name and ensure libs are imported as external dependencies.
$targetPackageJsonPath = Join-Path $targetAppDir 'package.json'
if (-not (Test-Path $targetPackageJsonPath)) {
  throw "Missing package.json in generated app: $targetPackageJsonPath"
}

$packageJson = Get-Content $targetPackageJsonPath -Raw | ConvertFrom-Json
$packageJson.name = $AppName

if (-not $packageJson.dependencies) {
  $packageJson | Add-Member -MemberType NoteProperty -Name dependencies -Value ([ordered]@{})
}

$libsDir = Join-Path $repoRoot 'libs'
$libPackageFiles = Get-ChildItem -Path $libsDir -Directory |
  ForEach-Object { Join-Path $_.FullName 'package.json' } |
  Where-Object { Test-Path $_ }

foreach ($libPackageFile in $libPackageFiles) {
  $libPackage = Get-Content $libPackageFile -Raw | ConvertFrom-Json
  if ($libPackage.name) {
    # Replace workspace:* with latest as external library
    $packageJson.dependencies | Add-Member -MemberType NoteProperty -Name $libPackage.name -Value 'latest' -Force
  }
}

$packageJsonText = $packageJson | ConvertTo-Json -Depth 100
Set-Utf8NoBom -Path $targetPackageJsonPath -Content $packageJsonText

# Update composer.json project name.
$targetComposerJsonPath = Join-Path $targetAppDir 'composer.json'
if (Test-Path $targetComposerJsonPath) {
  $composerJson = Get-Content $targetComposerJsonPath -Raw | ConvertFrom-Json
  $composerJson.name = "new-project/$AppName"
  $composerJson.description = "${AppName} application generated from showcase template"
  $composerJsonText = $composerJson | ConvertTo-Json -Depth 100
  Set-Utf8NoBom -Path $targetComposerJsonPath -Content $composerJsonText
}

# --- Copy Environment Configurations & Tools ---
if (Test-Path (Join-Path $repoRoot '.vscode')) {
  Copy-Item -Path (Join-Path $repoRoot '.vscode') -Destination (Join-Path $targetAppDir '.vscode') -Recurse -Force
}

if (Test-Path (Join-Path $repoRoot '.node-version')) {
  Copy-Item -Path (Join-Path $repoRoot '.node-version') -Destination (Join-Path $targetAppDir '.node-version') -Force
}

if (Test-Path (Join-Path $repoRoot 'docker')) {
  Copy-Item -Path (Join-Path $repoRoot 'docker') -Destination (Join-Path $targetAppDir 'docker') -Recurse -Force
}

foreach ($composeFile in @('docker-compose.yml', 'docker-compose.local.yml')) {
  $srcCompose = Join-Path $repoRoot $composeFile
  $destCompose = Join-Path $targetAppDir $composeFile
  if (Test-Path $srcCompose) {
    $content = Get-Content $srcCompose -Raw
    # Fix paths inside docker compose targeting the new local root
    $content = $content -replace "\./apps/showcase", "."
    # Rename container prefixes
    $content = $content -replace "reference-app-laravel-vue", $AppName
    # Fix DB names or Otel names
    $content = $content -replace "showcase", $AppName
    
    Set-Utf8NoBom -Path $destCompose -Content $content
  }
}

if (Test-Path (Join-Path $repoRoot 'scripts')) {
  $targetScriptsDir = Join-Path $targetAppDir 'scripts'
  New-Item -ItemType Directory -Path $targetScriptsDir -Force | Out-Null
  
  foreach ($setupFile in @('setup.ps1', 'setup.sh')) {
    $srcSetup = Join-Path $repoRoot "scripts/$setupFile"
    $destSetup = Join-Path $targetScriptsDir $setupFile
    if (Test-Path $srcSetup) {
      $content = Get-Content $srcSetup -Raw
      # Fix paths targeting the new local root instead of apps/showcase
      $content = $content -replace "apps/showcase/", ""
      # Rename container prefixes
      $content = $content -replace "reference-app-laravel-vue", $AppName
      # Fix DB name and text references
      $content = $content -replace "showcase", $AppName
      
      Set-Utf8NoBom -Path $destSetup -Content $content
    }
  }
}

Write-Host "Replacing 'showcase' with '$AppName' in all text files..."
$validExts = @('.php', '.vue', '.ts', '.js', '.json', '.yml', '.yaml', '.md', '.scss', '.css', '.xml', '.html', '.sh', '.ps1')
Get-ChildItem -Path $targetAppDir -Recurse -File | Where-Object {
    $ext = $_.Extension.ToLower()
    $name = $_.Name.ToLower()
    $ext -in $validExts -or $name -like '.env*'
} | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -match 'showcase') {
        $content = $content -replace 'showcase', $AppName
        Set-Utf8NoBom -Path $_.FullName -Content $content
    }
}

# Generate Custom README.md
$readmeContent = @"
# $AppName

This standalone application was generated from the Showcase template.

## Requirements
- Node.js (see \`.node-version\`)
- pnpm
- Docker Desktop

## Quickstart

The fastest way to get started is using the included automated setup scripts. They will install all dependencies, configure the environment, and spin up the Docker infrastructure automatically.

**Windows (PowerShell):**
\`\`\`powershell
.\scripts\setup.ps1
\`\`\`

**macOS / Linux (Bash):**
\`\`\`bash
./scripts/setup.sh
\`\`\`

Once the setup completes, start the Frontend Development Server:
\`\`\`bash
pnpm dev
\`\`\`
"@
Set-Utf8NoBom -Path (Join-Path $targetAppDir 'README.md') -Content $readmeContent

Write-Host ''
Write-Host "Done. Standalone app created at: $targetAppDir"
Write-Host ''
Write-Host 'Next steps for your new app:'
Write-Host "  cd $targetAppDir"
Write-Host '  1. Run the setup script:'
Write-Host '     .\scripts\setup.ps1   (or ./scripts/setup.sh)'
Write-Host '  2. Start dev server:'
Write-Host '     pnpm dev'
