# Etapa 1: Construcción del artefacto
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Servidor de producción optimizado
FROM nginx:alpine
# Copiamos los archivos compilados por Vite
COPY --from=build /app/dist /usr/share/nginx/html

# Configuración crítica para aplicaciones SPA (React Router)
# Esto evita que Nginx lance errores 404 al recargar rutas como /emision
RUN echo 'server { listen 80; location / { root /usr/share/nginx/html; index index.html; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]