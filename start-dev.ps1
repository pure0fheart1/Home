# Robust Development Server Startup Script
# This script ensures a clean start of the development server

Write-Host "Starting Development Server..." -ForegroundColor Green

# Stop any running Node processes
Write-Host "Stopping existing Node processes..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# Clean build directories
Write-Host "Cleaning build directories..." -ForegroundColor Yellow
Remove-Item -Path "apps\homepage\.next" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "apps\homepage\node_modules\.cache" -Recurse -Force -ErrorAction SilentlyContinue

# Navigate to homepage directory
Set-Location -Path "apps\homepage"

# Start development server
Write-Host "Starting Next.js development server..." -ForegroundColor Green
Write-Host "Homepage will be available at http://localhost:3000" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host "" 

npm run dev 