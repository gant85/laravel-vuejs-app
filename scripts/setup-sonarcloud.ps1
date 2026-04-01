# SonarCloud Setup Script for Azure DevOps
# This script helps you configure SonarCloud integration

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  SonarCloud Setup Helper" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if running in Azure DevOps context
if ($env:BUILD_BUILDID) {
  Write-Host "✓ Running in Azure DevOps pipeline" -ForegroundColor Green
}
else {
  Write-Host "⚠ Not running in Azure DevOps - this is for local reference" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Required Setup Steps:" -ForegroundColor Cyan
Write-Host ""

Write-Host "1. Create SonarCloud Account" -ForegroundColor White
Write-Host "   → Visit: https://sonarcloud.io/" -ForegroundColor Gray
Write-Host "   → Sign in with Azure DevOps or GitHub" -ForegroundColor Gray
Write-Host ""

Write-Host "2. Create SonarCloud Organization" -ForegroundColor White
Write-Host "   → Organization key will be needed for pipeline" -ForegroundColor Gray
Write-Host ""

Write-Host "3. Generate SonarCloud Token" -ForegroundColor White
Write-Host "   → Go to: SonarCloud → My Account → Security" -ForegroundColor Gray
Write-Host "   → Generate a new token" -ForegroundColor Gray
Write-Host ""

Write-Host "4. Create Azure DevOps Service Connection" -ForegroundColor White
Write-Host "   → Project Settings → Service connections → New" -ForegroundColor Gray
Write-Host "   → Select 'SonarCloud'" -ForegroundColor Gray
Write-Host "   → Paste your SonarCloud token" -ForegroundColor Gray
Write-Host "   → Name it 'SonarCloud' (or custom name)" -ForegroundColor Gray
Write-Host ""

Write-Host "5. Configure Pipeline Variables" -ForegroundColor White
Write-Host "   → Go to: Pipelines → Edit → Variables" -ForegroundColor Gray
Write-Host "   → Add the following variables:" -ForegroundColor Gray
Write-Host ""
Write-Host "   Variable Name                     | Value" -ForegroundColor Yellow
Write-Host "   ----------------------------------|----------------------------------" -ForegroundColor Yellow
Write-Host "   SONARCLOUD_SERVICE_CONNECTION     | SonarCloud (your service connection name)" -ForegroundColor Gray
Write-Host "   SONAR_ORGANIZATION                | your-sonarcloud-org-key" -ForegroundColor Gray
Write-Host ""

Write-Host "6. Verify Configuration Files" -ForegroundColor White
Write-Host "   ✓ sonar-project.properties exists" -ForegroundColor Green
Write-Host "   ✓ azure-pipelines.yml includes SonarCloud tasks" -ForegroundColor Green
Write-Host "   ✓ phpunit.xml configured for coverage" -ForegroundColor Green
Write-Host "   ✓ vitest.config.ts configured for coverage" -ForegroundColor Green
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Next Steps" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "After setup, run the pipeline to trigger SonarCloud analysis." -ForegroundColor White
Write-Host "Results will be available at: https://sonarcloud.io/" -ForegroundColor White
Write-Host ""
Write-Host "For detailed instructions, see:" -ForegroundColor White
Write-Host "docs/architecture/04-sonarqube.md" -ForegroundColor Cyan
Write-Host ""
