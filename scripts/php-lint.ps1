$containerName = "reference-app-laravel-vue-php"
$running = docker ps --format "{{.Names}}" 2>$null | Select-String -Pattern "^$containerName$"
if ($running) {
  $files = $args[0] -replace "^(?:apps/[^/]+/)?", ""
  if ($files) {
    docker exec $containerName vendor/bin/pint $files
  }
}
else {
  Write-Host "Docker container $containerName not running - skipping PHP lint" -ForegroundColor Yellow
}
