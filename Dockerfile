# Étape de construction
FROM node:latest AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Étape de déploiement avec Nginx
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*

# Copier le fichier nginx.conf dans le conteneur
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier le contenu de l'application Angular dans le container NGINX
COPY --from=build /app/dist/bedouin-client /usr/share/nginx/html

# Copier les certificats dans le conteneur
COPY www_bedouinsstudios_com.crt /etc/nginx/BedouinClient/BeduinsFront/www_bedouinsstudios_com.crt
COPY www_bedouinsstudios.key /etc/nginx/BedouinClient/BeduinsFront/www_bedouinsstudios.key
COPY www_bedouinsstudios_com.ca-bundle /etc/nginx/BedouinClient/BeduinsFront/www_bedouinsstudios_com.ca-bundle

# Exposer le port 80 et 443
EXPOSE 80
EXPOSE 443

# Commande pour démarrer NGINX
CMD ["nginx", "-g", "daemon off;"]