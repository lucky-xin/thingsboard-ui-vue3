# Multi-stage build: build with Node (npm) and serve with Nginx (alpine)

ARG NODE_IMAGE=node:20-alpine
ARG NGINX_IMAGE=nginx:1.27-alpine

## ---- Builder ----
FROM ${NODE_IMAGE} AS builder
WORKDIR /app

# npm configs
ENV NPM_CONFIG_LOGLEVEL=info

# Copy dependency manifests first for better caching
COPY package.json ./

# Install deps with npm
RUN npm config set registry https://registry.npmmirror.com \
  && npm config set prefer-offline true \
  && npm config set cache /root/.npm \
  && npm install --no-audit --no-fund

# Copy the rest of the source and build
COPY . .
RUN npm run build

## ---- Runtime ----
FROM ${NGINX_IMAGE} AS runtime

# Copy static nginx config
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets
COPY --from=builder /app/dist/ /usr/share/nginx/html/

EXPOSE 80

# Use default nginx entrypoint
CMD ["nginx", "-g", "daemon off;"]


