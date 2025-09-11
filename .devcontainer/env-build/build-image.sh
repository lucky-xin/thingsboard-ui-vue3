#!/usr/bin/env bash
set -euo pipefail

IMAGE_TAG="xin8/dev-env/node:20"

# 确保 buildx 可用并就绪
if ! docker buildx ls >/dev/null 2>&1; then
  docker buildx create --name devbuilder --use >/dev/null
fi
docker buildx inspect --bootstrap >/dev/null

echo "使用平台: $PLATFORM 构建镜像: $IMAGE_TAG (no-cache)"
docker buildx build -t "$IMAGE_TAG" --platform linux/amd64,linux/arm64/v8 --load .

echo "构建完成：$IMAGE_TAG"
