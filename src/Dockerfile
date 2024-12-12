FROM node:18-alpine AS build

WORKDIR /app

# Copiez uniquement les fichiers nécessaires pour installer les dépendances
COPY ../package.json ./
COPY ../package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application
COPY ../ ./

# Construire l'application Angular
RUN npm run build

# Étape 2 : servir l'application Angular
FROM nginx:alpine

# Copier les fichiers générés par la construction dans NGINX
COPY --from=build /app/dist/bedouins-client /usr/share/nginx/html

# Exposer le port NGINX
EXPOSE 80

# Commande pour démarrer NGINX
CMD ["nginx", "-g", "daemon off;"]