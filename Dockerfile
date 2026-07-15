# Bio AngelCode (bio.angelcode.com.br) — estático via nginx.
FROM nginx:alpine

# Substitui a config default pela config com headers de segurança
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia o site
RUN rm -rf /usr/share/nginx/html/*
COPY . /usr/share/nginx/html

# Remove arquivos de build/config que não devem ser servidos ao público
RUN rm -f /usr/share/nginx/html/nginx.conf \
          /usr/share/nginx/html/Dockerfile \
          /usr/share/nginx/html/.dockerignore

EXPOSE 80
