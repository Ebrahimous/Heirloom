@echo off
cd /d "%~dp0"

echo.
echo  Heirloom — Deploy
echo  -----------------
echo.

git add -A
git status --short

echo.
set /p MSG=Commit message (or press Enter for "update"):
if "%MSG%"=="" set MSG=update

git commit -m "%MSG%"
git push origin main

echo.
echo  Pushed. GitHub Actions will build and deploy in ~2 minutes.
echo  https://heirloom-48ead.web.app
echo.
pause
