# Multi-stage build: build with Node (yarn) and serve with Nginx (alpine)

## ---- Builder ----
FROM node:20-alpine AS builder
WORKDIR /app

# Avoid interactive prompts from Corepack
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0 \
    YARN_TIMEOUT=600000

# Copy dependency manifests first for better caching
COPY package.json ./
# If lockfiles exist, copy them to leverage better caching/reproducibility
COPY yarn.lock* ./
COPY pnpm-lock.yaml* ./

# Enable and pin Yarn 1.22.22, then install deps
RUN corepack enable \
  && corepack prepare yarn@1.22.22 --activate \
  && yarn config set registry https://registry.npmmirror.com \
  && yarn install --network-timeout 600000

# Copy the rest of the source and build
COPY . .
RUN yarn build

## ---- Runtime ----
FROM nginx:1.27-alpine AS runtime

# Copy SPA-friendly Nginx config
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets
COPY --from=builder /app/dist/ /usr/share/nginx/html/

EXPOSE 3100

CMD ["nginx", "-g", "daemon off;"]


