@echo off
chcp 65001 >nul
echo ========================================
echo   Automatizador de Commit para GitHub
echo ========================================
echo.
python git_auto_commit.py
pause

