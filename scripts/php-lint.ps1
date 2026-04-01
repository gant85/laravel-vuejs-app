$running = docker ps --format "{{.Names}}" 2>$null | Select-String -Pattern "^reference-app-laravel-vue-php$"
if ($running) {
  $files = $args[0] -replace "apps/showcase/", ""
  if ($files) {
    docker exec reference-app-laravel-vue-php vendor/bin/pint $files
  }
}
else {
  Write-Host "⚠️  Docker container reference-app-laravel-vue-php not running - skipping PHP lint" -ForegroundColor Yellow
}
