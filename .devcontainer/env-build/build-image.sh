#!/usr/bin/env bash
set -euo pipefail

IMAGE_TAG="xin8/devops/node:20"
PLATFORM=linux/amd64,linux/arm64/v8

docker buildx inspect --bootstrap >/dev/null

echo "使用平台: $PLATFORM 构建镜像: $IMAGE_TAG (no-cache)"
docker buildx build -t "$IMAGE_TAG" --platform linux/amd64,linux/arm64/v8 --load .

echo "构建完成：$IMAGE_TAG"
