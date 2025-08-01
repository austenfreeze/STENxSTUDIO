@echo off
echo ================================
echo Starting Project Maintenance Script...
echo ================================

:: Change to Next.js app
cd nextjs-app

echo -------------------------------
echo Running lint for Next.js app...
echo -------------------------------
call npx next lint

echo -------------------------------
echo Running npm prune for Next.js app...
echo -------------------------------
call npm prune

echo -------------------------------
echo Installing missing dependencies for Next.js app...
echo -------------------------------
call npm install --legacy-peer-deps

echo -------------------------------
echo Updating dependencies for Next.js app...
echo -------------------------------
call npm update --legacy-peer-deps

echo -------------------------------
echo Running audit for Next.js app...
echo -------------------------------
call npm audit

:: Change to Studio
cd ../studio

echo -------------------------------
echo Running sanity check for Studio...
echo -------------------------------
call npx sanity check

echo -------------------------------
echo Running npm prune for Studio...
echo -------------------------------
call npm prune

echo -------------------------------
echo Installing missing dependencies for Studio...
echo -------------------------------
call npm install --legacy-peer-deps

echo -------------------------------
echo Updating dependencies for Studio...
echo -------------------------------
call npm update --legacy-peer-deps

echo -------------------------------
echo Running audit for Studio...
echo -------------------------------
call npm audit

echo ================================
echo All tasks completed!
echo ================================
pause
