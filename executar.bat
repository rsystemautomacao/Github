@echo off
chcp 65001 >nul
echo ========================================
echo   Automatizador de Commit para GitHub
echo ========================================
echo.

REM Verifica se requests está instalado
python -c "import requests" 2>nul
if errorlevel 1 (
    echo Aviso: Biblioteca 'requests' não encontrada!
    echo.
    echo Instalando automaticamente...
    python -m pip install requests --quiet
    echo.
    echo Dependências instaladas! Executando aplicativo...
    echo.
)

python git_auto_commit.py
pause

