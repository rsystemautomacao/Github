@echo off
chcp 65001 >nul
echo ========================================
echo   Instalando Dependências
echo ========================================
echo.
echo Instalando biblioteca 'requests'...
python -m pip install requests
echo.
echo ========================================
echo   Instalação Concluída!
echo ========================================
echo.
pause

