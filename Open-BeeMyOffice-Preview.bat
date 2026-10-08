@echo off
setlocal

set "ROOT=%~dp0"
set "PHP="
set "URL=http://127.0.0.1:8010/"

if exist "C:\xampp\php\php.exe" set "PHP=C:\xampp\php\php.exe"
if not defined PHP (
  for /f "delims=" %%P in ('where.exe php.exe 2^>nul') do (
    if not defined PHP set "PHP=%%P"
  )
)

if not defined PHP (
  echo PHP was not found. Install XAMPP or add PHP to your PATH, then try again.
  pause
  exit /b 1
)

curl.exe --silent --fail "%URL%" -o nul >nul 2>&1
if not errorlevel 1 goto website_ready

echo Starting the Bee My Office preview without the database...
start "Bee My Office preview" /min /D "%ROOT%" "%PHP%" -S 127.0.0.1:8010 router.php

for /l %%i in (1,1,20) do (
  curl.exe --silent --fail "%URL%" -o nul >nul 2>&1
  if not errorlevel 1 goto website_ready
  timeout /t 1 /nobreak >nul
)

echo The website did not start. Check whether port 8010 is already in use.
pause
exit /b 1

:website_ready
start "" "%URL%"
exit /b 0