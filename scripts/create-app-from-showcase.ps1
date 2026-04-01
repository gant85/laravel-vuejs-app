#!/usr/bin/env pwsh

param(
  [Parameter(Mandatory = $true)]
  [ValidatePattern('^[a-z][a-z0-9-]*$')]
  [string]$AppName,

  [switch]$Force
)

$ErrorActionPreference = 'Stop'

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$sourceAppDir = Join-Path $repoRoot 'apps/showcase'
$targetAppDir = Join-Path $repoRoot ("apps/{0}" -f $AppName)

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

Write-Host "Creating app '$AppName' from template 'showcase'..."

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
  Copy-Item $targetEnvExamplePath $targetEnvPath
}

# Update package.json app package name and ensure libs are workspace dependencies.
$targetPackageJsonPath = Join-Path $targetAppDir 'package.json'
if (-not (Test-Path $targetPackageJsonPath)) {
  throw "Missing package.json in generated app: $targetPackageJsonPath"
}

$packageJson = Get-Content $targetPackageJsonPath -Raw | ConvertFrom-Json -Depth 100
$packageJson.name = "@reference-app-laravel-vue/$AppName"

if (-not $packageJson.dependencies) {
  $packageJson | Add-Member -MemberType NoteProperty -Name dependencies -Value ([ordered]@{})
}

$libsDir = Join-Path $repoRoot 'libs'
$libPackageFiles = Get-ChildItem -Path $libsDir -Directory |
  ForEach-Object { Join-Path $_.FullName 'package.json' } |
  Where-Object { Test-Path $_ }

foreach ($libPackageFile in $libPackageFiles) {
  $libPackage = Get-Content $libPackageFile -Raw | ConvertFrom-Json -Depth 100
  if ($libPackage.name) {
    $packageJson.dependencies | Add-Member -MemberType NoteProperty -Name $libPackage.name -Value 'workspace:*' -Force
  }
}

$packageJson | ConvertTo-Json -Depth 100 | Set-Content -Path $targetPackageJsonPath -Encoding utf8

# Update composer.json project name.
$targetComposerJsonPath = Join-Path $targetAppDir 'composer.json'
if (Test-Path $targetComposerJsonPath) {
  $composerJson = Get-Content $targetComposerJsonPath -Raw | ConvertFrom-Json -Depth 100
  $composerJson.name = "reference-app-laravel-vue/$AppName"
  $composerJson.description = "${AppName} application generated from showcase template"
  $composerJson | ConvertTo-Json -Depth 100 | Set-Content -Path $targetComposerJsonPath -Encoding utf8
}

Write-Host ''
Write-Host "Done. App created at: apps/$AppName"
Write-Host ''
Write-Host 'Next steps:'
Write-Host '  1. Install workspace dependencies:'
Write-Host '     pnpm install'
Write-Host '  2. (Optional) Install PHP dependencies in Docker for the new app:'
Write-Host ("     docker exec reference-app-laravel-vue-php composer install --working-dir=/var/www/apps/{0}" -f $AppName)
Write-Host '  3. Start dev server for the new app:'
Write-Host ("     pnpm --filter @reference-app-laravel-vue/{0} dev" -f $AppName)
