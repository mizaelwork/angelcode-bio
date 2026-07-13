# Biosite AngelCode — servido como estático por nginx.
# Build context = esta pasta (/bio). EasyPanel: Caminho de Build = /bio.
FROM nginx:alpine

# Remove a página default do nginx e copia o biosite
RUN rm -rf /usr/share/nginx/html/*
COPY . /usr/share/nginx/html

# nginx já serve /usr/share/nginx/html na porta 80 com index.html
EXPOSE 80
