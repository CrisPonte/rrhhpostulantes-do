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
# el número "1000" tiene que coincidir con el uid del server user deploy
# hacer en el server:
#  id deploy
# uid=1000(deploy) gid=1000(deploy) groups=1000(deploy),27(sudo),100(users),988(docker)

RUN addgroup -g 1000 appgroup \
    && adduser -D -u 1000 -G appgroup appuser

USER appuser
