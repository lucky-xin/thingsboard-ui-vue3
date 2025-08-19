#!/bin/bash

# ===========================================
# ThingsBoard UI Vue3 Docker 镜像构建脚本
# ===========================================
# 简化版镜像构建脚本

set -e

# 默认配置
DEFAULT_TAG="gzv-reg.piston.ink/micros/tb-ui-vue3:v4.2.0"
DEFAULT_PLATFORM="linux/arm64"
DEFAULT_BUILD_ARGS=""

# 显示帮助信息
show_help() {
    echo "用法: $0 [选项]"
    echo ""
    echo "选项:"
    echo "  -t, --tag TAG         镜像标签 (默认: $DEFAULT_TAG)"
    echo "  -p, --platform PLAT   目标平台 (默认: $DEFAULT_PLATFORM)"
    echo "  -a, --args ARGS       构建参数 (格式: KEY1=VALUE1,KEY2=VALUE2)"
    echo "  --use-cn-mirrors      使用中国镜像加速"
    echo "  --dist-only           跳过容器内构建，使用本地 dist 直接打包 (需先本地构建)"
    echo "  -h, --help            显示此帮助信息"
    echo ""
    echo "示例:"
    echo "  $0                                    # 使用默认配置构建"
    echo "  $0 -t my-registry/tb-ui:latest       # 自定义标签"
    echo "  $0 -p linux/arm64                    # ARM64 平台"
    echo "  $0 -a VITE_PORT=3000,VITE_GLOB_APP_TITLE=MyApp  # 自定义构建参数"
    echo ""
}

# 解析命令行参数
TAG="$DEFAULT_TAG"
PLATFORM="$DEFAULT_PLATFORM"
BUILD_ARGS="$DEFAULT_BUILD_ARGS"

while [[ $# -gt 0 ]]; do
    case $1 in
        -t|--tag)
            TAG="$2"
            shift 2
            ;;
        -p|--platform)
            PLATFORM="$2"
            shift 2
            ;;
        -a|--args)
            BUILD_ARGS="$2"
            shift 2
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        --use-cn-mirrors)
            USE_CN_MIRRORS=1
            shift 1
            ;;
        --dist-only)
            DIST_ONLY=1
            shift 1
            ;;
        *)
            echo "未知选项: $1"
            show_help
            exit 1
            ;;
    esac
done

# 构建参数处理
BUILD_ARGS_OPTION=""
if [ -n "$BUILD_ARGS" ]; then
    IFS=',' read -ra ARGS <<< "$BUILD_ARGS"
    for arg in "${ARGS[@]}"; do
        if [[ $arg == *"="* ]]; then
            BUILD_ARGS_OPTION="$BUILD_ARGS_OPTION --build-arg $arg"
        fi
    done
fi

echo "🚀 开始构建 ThingsBoard UI Vue3 Docker 镜像"
echo "📋 构建配置:"
echo "   标签: $TAG"
echo "   平台: $PLATFORM"
echo "   构建参数: ${BUILD_ARGS:-无}"
echo "   中国镜像: ${USE_CN_MIRRORS:+启用}${USE_CN_MIRRORS:-未启用}"
echo ""

# 检查 Docker 是否运行
if ! docker info > /dev/null 2>&1; then
    echo "❌ 错误: Docker 未运行或无法访问"
    exit 1
fi

# 可选：使用中国镜像加速
if [[ -n "$USE_CN_MIRRORS" ]]; then
  echo "🌏 使用中国镜像加速: 预拉取基础镜像..."
  docker pull --platform "$PLATFORM" docker.m.daocloud.io/library/node:20-alpine || true
  docker pull --platform "$PLATFORM" docker.m.daocloud.io/library/nginx:1.27-alpine || true
  BUILD_ARGS_OPTION="$BUILD_ARGS_OPTION --build-arg NODE_IMAGE=docker.m.daocloud.io/library/node:20-alpine --build-arg NGINX_IMAGE=docker.m.daocloud.io/library/nginx:1.27-alpine"
fi

# 如果仅打运行时镜像（已存在本地 dist）
if [[ -n "$DIST_ONLY" ]]; then
  if [[ ! -d dist || -z "$(ls -A dist 2>/dev/null)" ]]; then
    echo "❌ dist 目录不存在或为空。请先执行本地构建：\n   yarn install && yarn build"
    exit 1
  fi
  echo "📦 使用 Dockerfile.dist 直接打运行时镜像 (跳过容器内构建)"
  docker build \
    --platform "$PLATFORM" \
    --tag "$TAG" \
    --network host \
    $BUILD_ARGS_OPTION \
    -f Dockerfile.dist \
    --load \
    .
  exit $?
fi

# 构建镜像
echo "🔨 构建镜像..."
export DOCKER_BUILDKIT=1
docker buildx create --use --name tb-ui-builder >/dev/null 2>&1 || docker buildx use tb-ui-builder
docker buildx build \
    --platform "$PLATFORM" \
    --tag "$TAG" \
    --cache-from type=local,src=.docker-cache \
    --cache-to type=local,dest=.docker-cache,mode=max \
    --network host \
    $BUILD_ARGS_OPTION \
    --load \
    .

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 镜像构建成功!"
    echo "📦 镜像信息:"
    docker images "$TAG"
    
    echo ""
    echo "🚀 运行镜像示例:"
    echo "   # 基本运行 (端口 80)"
    echo "   docker run -p 8080:80 $TAG"
    echo ""
    echo "   # 自定义端口映射"
    echo "   docker run -p 3000:80 $TAG"
    echo ""
    echo "   # 与后端服务一起运行"
    echo "   docker run -p 8080:80 --network host $TAG"
    echo ""
    echo "   # 使用 Docker Compose"
    echo "   docker-compose up -d"
    echo ""
    echo "📝 说明:"
    echo "   - nginx 使用默认端口 80"
    echo "   - API 代理配置为 http://127.0.0.1:8080/api/"
    echo "   - 健康检查: http://localhost:80/health"
else
    echo "❌ 镜像构建失败"
    exit 1
fi
