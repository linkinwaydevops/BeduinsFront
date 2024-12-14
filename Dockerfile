FROM node:latest as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/bedouin-client /usr/share/nginx/html


# Exposer le port NGINX
EXPOSE 80

# Commande pour démarrer NGINX
CMD ["nginx", "-g", "daemon off;"]