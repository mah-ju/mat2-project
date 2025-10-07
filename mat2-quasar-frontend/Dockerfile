# production container
FROM nginx:1.27.4-alpine

LABEL maintainer="Mat2 Web Frontend Maintainer <jan.friedli@immerda.ch>"

COPY ./dist/pwa /var/templates
COPY nginx_config/default.conf /etc/nginx/conf.d/default.conf
COPY nginx_config/nginx.conf /etc/nginx/nginx.conf
COPY ./entrypoint.sh /

RUN set -x \
    && mkdir -p /var/cache/nginx \
    && chown -R nginx:nginx /var/cache/nginx \
    && chmod -R g+w /var/cache/nginx \
    && ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log \
    && ln -sf /dev/stderr /var/log/nginx/mat2-web-frontend-error.log \
    && rm -rf /var/cache/apt/* /var/lib/apt/lists/* \

EXPOSE 8080

USER nginx

CMD ["/entrypoint.sh"]
