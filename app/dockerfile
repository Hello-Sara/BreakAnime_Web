# Description: Fichier de configuration pour la création de l'image Docker en lts
FROM node:18.19.0

# Définition du répertoire de travail
WORKDIR /app

COPY . .

# Exposition du port 3000
EXPOSE 3000

# install les dépendances et lance le projet
CMD npm install && npm start