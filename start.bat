@echo off
setlocal
cd /d "%~dp0"
if not exist "package.json" (
  echo ERROR: package.json not found in this folder.
  echo Please run this batch file from the extracted SETU Frontend folder.
  pause
  exit /b 1
)
echo.
echo ==============================
echo SETU Frontend
 echo Frontend: http://localhost:5173
echo Backend:  http://localhost:8080
echo ==============================
echo.
if not exist "node_modules" (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 (
    echo.
    echo npm install failed.
    pause
    exit /b 1
  )
)
echo Starting SETU on port 5173...
call npm run dev
pause
