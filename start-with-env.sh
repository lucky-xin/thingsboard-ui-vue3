#!/bin/bash

# ===========================================
# ThingsBoard UI Vue3 环境变量启动脚本
# ===========================================
# 此脚本演示如何通过环境变量启动项目
# 使用方法：
# 1. 直接运行: ./start-with-env.sh
# 2. 自定义配置: VITE_PORT=3000 VITE_GLOB_APP_TITLE="My App" ./start-with-env.sh

echo "🚀 启动 ThingsBoard UI Vue3 (环境变量模式)"

# 设置默认环境变量（如果未设置）
export VITE_PORT=${VITE_PORT:-3100}
export VITE_GLOB_APP_TITLE=${VITE_GLOB_APP_TITLE:-"ThingsBoard UI Vue"}
export VITE_GLOB_APP_SHORT_NAME=${VITE_GLOB_APP_SHORT_NAME:-"thingsboard_ui_vue"}
export VITE_PUBLIC_PATH=${VITE_PUBLIC_PATH:-"/"}
export VITE_ROUTE_WEB_HISTORY=${VITE_ROUTE_WEB_HISTORY:-"true"}

# API 配置
export VITE_PROXY=${VITE_PROXY:-'[["/api","http://127.0.0.1:8888/api",false]]'}
export VITE_GLOB_API_URL=${VITE_GLOB_API_URL:-""}
export VITE_GLOB_API_URL_PREFIX=${VITE_GLOB_API_URL_PREFIX:-""}
export VITE_GLOB_API_URL_WEBSOCKET=${VITE_GLOB_API_URL_WEBSOCKET:-"/api/ws"}

# 构建配置
export VITE_DROP_CONSOLE=${VITE_DROP_CONSOLE:-"false"}
export VITE_OUTPUT_DIR=${VITE_OUTPUT_DIR:-"dist"}
export VITE_BUILD_COMPRESS=${VITE_BUILD_COMPRESS:-"none"}
export VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE=${VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE:-"false"}
export VITE_USE_PWA=${VITE_USE_PWA:-"false"}
export VITE_LEGACY=${VITE_LEGACY:-"true"}

# 其他配置
export REPORT=${REPORT:-"false"}
export VITE_CJS_IGNORE_WARNING=${VITE_CJS_IGNORE_WARNING:-"true"}

echo "📋 当前环境变量配置:"
echo "  端口: $VITE_PORT"
echo "  标题: $VITE_GLOB_APP_TITLE"
echo "  应用名: $VITE_GLOB_APP_SHORT_NAME"
echo "  代理: $VITE_PROXY"
echo "  API URL: $VITE_GLOB_API_URL"
echo "  WebSocket: $VITE_GLOB_API_URL_WEBSOCKET"

echo ""
echo "🌐 启动开发服务器..."
echo "   访问地址: http://localhost:$VITE_PORT"
echo "   按 Ctrl+C 停止服务器"
echo ""

# 启动开发服务器
npm run dev
