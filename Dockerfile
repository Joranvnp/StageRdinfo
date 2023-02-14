FROM node:alpine

WORKDIR /var/appli

COPY serveur/ /var/appli/serveur/
COPY client/ /var/appli/client

WORKDIR /var/appli/serveur

RUN npm ci

CMD ["node", "/var/appli/serveur/dist/serveur.js"]
