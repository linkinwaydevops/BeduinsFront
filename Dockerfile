FROM node:latest as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/bedouin-client /usr/share/nginx/html

# Copier le fichier de configuration Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier les certificats dans le conteneur
COPY www_bedouinsstudios_com.crt /etc/ssl/certs/www_bedouinsstudios_com.crt
COPY www_bedouinsstudios_com.key /etc/ssl/private/www_bedouinsstudios.key

# Si vous avez un fichier .ca-bundle, copiez-le aussi si nécessaire
COPY www_bedouinsstudios_com.ca-bundle /etc/ssl/certs/www_bedouinsstudios_com.ca-bundle
# Exposer le port NGINX
EXPOSE 80

# Commande pour démarrer NGINX
CMD ["nginx", "-g", "daemon off;"]