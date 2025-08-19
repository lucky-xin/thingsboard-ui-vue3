# Multi-stage build: build with Node (yarn) and serve with Nginx (alpine)

ARG NODE_IMAGE=node:20-alpine
ARG NGINX_IMAGE=nginx:1.27-alpine

## ---- Builder ----
FROM ${NODE_IMAGE} AS builder
WORKDIR /app

# Avoid interactive prompts from Corepack
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0 \
    YARN_TIMEOUT=600000

# Copy dependency manifests first for better caching
COPY package.json ./
# If lockfiles exist, copy them to leverage better caching/reproducibility
COPY yarn.lock* ./
COPY pnpm-lock.yaml* ./

# Enable and pin Yarn 1.22.22
RUN corepack enable && corepack prepare yarn@1.22.22 --activate

# Install deps with cache mount (faster incremental builds)
RUN --mount=type=cache,target=/root/.cache/yarn \
  yarn config set registry https://registry.npmmirror.com \
  && yarn config set network-concurrency 16 \
  && yarn config set prefer-offline true \
  && yarn config set cache-folder /root/.cache/yarn \
  && yarn install --frozen-lockfile --network-timeout 600000 --prefer-offline

# Copy the rest of the source and build
COPY . .
RUN yarn build

## ---- Runtime ----
FROM ${NGINX_IMAGE} AS runtime

# Copy static nginx config
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets
COPY --from=builder /app/dist/ /usr/share/nginx/html/

EXPOSE 80

# Use default nginx entrypoint
CMD ["nginx", "-g", "daemon off;"]


