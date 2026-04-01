#!/usr/bin/env pwsh

# Fix Lefthook for Windows
# Run this script if you get "node not found" errors during git commits

Write-Host "🔧 Fixing Lefthook for Windows..." -ForegroundColor Cyan
Write-Host ""

# Activate NVS
Write-Host "Activating Node.js via NVS..."
nvs use auto

# Reinstall lefthook hooks
Write-Host "Reinstalling Lefthook hooks..."
pnpm exec lefthook install

Write-Host ""
Write-Host "✅ Lefthook fixed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "ℹ️  To avoid this issue in the future, run 'nvs use auto' before git commands" -ForegroundColor Yellow
Write-Host "   or add it to your PowerShell profile." -ForegroundColor Yellow
Write-Host ""
