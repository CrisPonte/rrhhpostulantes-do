FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]

# Crear usuario no-root para seguridad,
# la api corre con este, recordar crear permisos
# para este usuario en /storage/postulantes
# esto crea un usuario que tendrá permisos sobre la carpeta de adjuntos
# que no será root (mas profesional)

RUN addgroup -S appgroup \
    && adduser -S appuser -G appgroup

USER appuser