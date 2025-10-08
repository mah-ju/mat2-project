# ========== STAGE 1: BUILD ==========
FROM node:20 AS build-stage

LABEL maintainer="Mat2 Web Frontend Maintainer <jan.friedli@immerda.ch>"

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build argument for API URL (will be set from Railway)
ARG MAT2_API_URL_PROD
ENV MAT2_API_URL_PROD=${MAT2_API_URL_PROD}

# Build Quasar project for production (PWA mode)
RUN npx quasar build -m pwa

# ========== STAGE 2: PRODUCTION ==========
FROM nginx:1.27.4-alpine

# Copy nginx configuration
COPY nginx_config/default.conf /etc/nginx/conf.d/default.conf
COPY nginx_config/nginx.conf /etc/nginx/nginx.conf

# Copy entrypoint script
COPY ./entrypoint.sh /

# Copy built files from build stage
COPY --from=build-stage /app/dist/pwa /var/templates

# Setup nginx directories and permissions
RUN set -x \
    && mkdir -p /var/cache/nginx \
    && chown -R nginx:nginx /var/cache/nginx \
    && chmod -R g+w /var/cache/nginx \
    && ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log \
    && ln -sf /dev/stderr /var/log/nginx/mat2-web-frontend-error.log \
    && rm -rf /var/cache/apt/* /var/lib/apt/lists/*

EXPOSE 8080

USER nginx

CMD ["/entrypoint.sh"]
