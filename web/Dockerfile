# Build stage
FROM node:20 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html

# ESTA ES LA LÍNEA QUE DEBES AGREGAR:
COPY default.conf /etc/nginx/conf.d/default.conf

# Custom nginx config to handle SPA routing if needed (optional for now)
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
