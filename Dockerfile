ARG NGINX_IMAGE=nginx:1.27-alpine

## ---- Runtime ----
FROM ${NGINX_IMAGE} AS runtime

# Copy static nginx config
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets
COPY dist/ /usr/share/nginx/html/

EXPOSE 80

# Use default nginx entrypoint
CMD ["nginx", "-g", "daemon off;"]


