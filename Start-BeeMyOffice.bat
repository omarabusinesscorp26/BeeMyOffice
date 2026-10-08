@echo off
setlocal

set "ROOT=%~dp0"
set "MYSQL=C:\xampp\mysql\bin"
set "PHP=C:\xampp\php"
set "URL=http://127.0.0.1:8000/"

if not exist "%MYSQL%\mysqld.exe" (
  echo XAMPP MariaDB was not found at %MYSQL%.
  echo Install XAMPP or update the paths in this launcher.
  pause
  exit /b 1
)

if not exist "%PHP%\php.exe" (
  echo XAMPP PHP was not found at %PHP%.
  echo Install XAMPP or update the paths in this launcher.
  pause
  exit /b 1
)

"%MYSQL%\mysqladmin.exe" --connect-timeout=2 -h 127.0.0.1 -u root ping >nul 2>&1
if errorlevel 1 (
  echo Starting the local database...
  start "Bee My Office MariaDB" /min "%MYSQL%\mysqld.exe" --defaults-file="%MYSQL%\my.ini" --console
)

for /l %%i in (1,1,30) do (
  "%MYSQL%\mysqladmin.exe" --connect-timeout=2 -h 127.0.0.1 -u root ping >nul 2>&1
  if not errorlevel 1 goto database_ready
  timeout /t 1 /nobreak >nul
)

echo MariaDB did not start. Check XAMPP and confirm port 3306 is available.
pause
exit /b 1

:database_ready
curl.exe --silent --fail "%URL%api.php?resource=services" -o nul >nul 2>&1
if not errorlevel 1 goto website_ready

echo Starting the Bee My Office website...
start "Bee My Office website" /min /D "%ROOT%" "%PHP%\php.exe" -S 127.0.0.1:8000 router.php

for /l %%i in (1,1,30) do (
  curl.exe --silent --fail "%URL%api.php?resource=services" -o nul >nul 2>&1
  if not errorlevel 1 goto website_ready
  timeout /t 1 /nobreak >nul
)

echo The website did not start. Check whether port 8000 is already in use.
pause
exit /b 1

:website_ready
start "" "%URL%"
exit /b 0
