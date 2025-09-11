@echo off
chcp 65001 >nul

REM ===========================================
REM ThingsBoard UI Vue3 环境变量启动脚本 (Windows)
REM ===========================================
REM 此脚本演示如何通过环境变量启动项目
REM 使用方法：
REM 1. 直接运行: start-with-env.bat
REM 2. 自定义配置: set VITE_PORT=3000 && set VITE_GLOB_APP_TITLE=My App && start-with-env.bat

echo 🚀 启动 ThingsBoard UI Vue3 (环境变量模式)

REM 设置默认环境变量（如果未设置）
if "%VITE_PORT%"=="" set VITE_PORT=3100
if "%VITE_GLOB_APP_TITLE%"=="" set VITE_GLOB_APP_TITLE=ThingsBoard UI Vue
if "%VITE_GLOB_APP_SHORT_NAME%"=="" set VITE_GLOB_APP_SHORT_NAME=thingsboard_ui_vue
if "%VITE_PUBLIC_PATH%"=="" set VITE_PUBLIC_PATH=/
if "%VITE_ROUTE_WEB_HISTORY%"=="" set VITE_ROUTE_WEB_HISTORY=true

REM API 配置
if "%VITE_PROXY%"=="" set VITE_PROXY=[["/api","http://127.0.0.1:8888/api",false]]
if "%VITE_GLOB_API_URL%"=="" set VITE_GLOB_API_URL=
if "%VITE_GLOB_API_URL_PREFIX%"=="" set VITE_GLOB_API_URL_PREFIX=
if "%VITE_GLOB_API_URL_WEBSOCKET%"=="" set VITE_GLOB_API_URL_WEBSOCKET=/api/ws

REM 构建配置
if "%VITE_DROP_CONSOLE%"=="" set VITE_DROP_CONSOLE=false
if "%VITE_OUTPUT_DIR%"=="" set VITE_OUTPUT_DIR=dist
if "%VITE_BUILD_COMPRESS%"=="" set VITE_BUILD_COMPRESS=none
if "%VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE%"=="" set VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE=false
if "%VITE_USE_PWA%"=="" set VITE_USE_PWA=false
if "%VITE_LEGACY%"=="" set VITE_LEGACY=true

REM 其他配置
if "%REPORT%"=="" set REPORT=false
if "%VITE_CJS_IGNORE_WARNING%"=="" set VITE_CJS_IGNORE_WARNING=true

echo 📋 当前环境变量配置:
echo   端口: %VITE_PORT%
echo   标题: %VITE_GLOB_APP_TITLE%
echo   应用名: %VITE_GLOB_APP_SHORT_NAME%
echo   代理: %VITE_PROXY%
echo   API URL: %VITE_GLOB_API_URL%
echo   WebSocket: %VITE_GLOB_API_URL_WEBSOCKET%

echo.
echo 🌐 启动开发服务器...
echo    访问地址: http://localhost:%VITE_PORT%
echo    按 Ctrl+C 停止服务器
echo.

REM 启动开发服务器
npm run dev
