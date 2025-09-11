#!/usr/bin/env bash
set -euo pipefail

IMAGE_TAG="xin8/dev-env/node:20"

# 确保 buildx 可用并就绪
if ! docker buildx ls >/dev/null 2>&1; then
  docker buildx create --name devbuilder --use >/dev/null
fi
docker buildx inspect --bootstrap >/dev/null

# 自动检测当前主机架构并选择单平台构建，避免 QEMU/idealTree 等问题
ARCH=$(uname -m)
case "$ARCH" in
  x86_64|amd64)
    PLATFORM="linux/amd64"
    ;;
  arm64|aarch64)
    PLATFORM="linux/arm64/v8"
    ;;
  *)
    echo "未识别的架构: $ARCH，默认为 linux/amd64" >&2
    PLATFORM="linux/amd64"
    ;;
esac

echo "使用平台: $PLATFORM 构建镜像: $IMAGE_TAG (no-cache)"
docker buildx build -t "$IMAGE_TAG" --platform "$PLATFORM" --no-cache --load .

echo "构建完成：$IMAGE_TAG"
