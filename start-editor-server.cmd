@echo off
cd /d "%~dp0"

set "BUNDLED_PY=C:\Users\Jiseong\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"

if exist "%BUNDLED_PY%" (
  start "" http://127.0.0.1:8765/editor.html
  "%BUNDLED_PY%" -m http.server 8765 --bind 127.0.0.1
  exit /b
)

where python >nul 2>nul
if %errorlevel%==0 (
  start "" http://127.0.0.1:8765/editor.html
  python -m http.server 8765 --bind 127.0.0.1
  exit /b
)

where py >nul 2>nul
if %errorlevel%==0 (
  start "" http://127.0.0.1:8765/editor.html
  py -m http.server 8765 --bind 127.0.0.1
  exit /b
)

echo Python was not found.
echo Please install Python or run the site with another local web server.
pause
