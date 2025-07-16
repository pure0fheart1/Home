@echo off
REM Robust Development Server Startup Script for Windows CMD
REM This script ensures a clean start of the development server

echo Starting Development Server...
echo.

REM Stop any running Node processes
echo Stopping existing Node processes...
taskkill /F /IM node.exe 2>nul

REM Clean build directories
echo Cleaning build directories...
rmdir /s /q "apps\homepage\.next" 2>nul
rmdir /s /q "apps\homepage\node_modules\.cache" 2>nul

REM Navigate to homepage directory
cd apps\homepage

REM Start development server
echo.
echo Starting Next.js development server...
echo Homepage will be available at http://localhost:3000
echo Press Ctrl+C to stop the server
echo.

npm run dev 