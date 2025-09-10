# 🚀 Démarrage rapide - Le Fournil des Fleurs

## 1. Prérequis

- [Docker](https://docs.docker.com/get-docker/) installé
- [Node.js](https://nodejs.org/) (version 18+) installé
- [Git](https://git-scm.com/) installé

## 2. Installation du backend Appwrite

```bash
git clone <votre-repo>
cd terroir-direct

# Installation d'Appwrite (méthode officielle)
docker run -it --rm \
    --volume /var/run/docker.sock:/var/run/docker.sock \
    --volume "$(pwd)"/appwrite:/usr/src/code/appwrite:rw \
    --entrypoint="install" \
    appwrite/appwrite:1.7.4
```

Suivez l'assistant d'installation :

- Port HTTP : `80` (par défaut)
- Port HTTPS : `443` (par défaut)
- Hostname : `localhost` (par défaut)
- Laissez les autres options par défaut

## 3. Démarrer Appwrite

```bash
cd appwrite
docker-compose up -d
```

## 4. Configuration Appwrite (première fois)

1. Ouvrir <http://localhost> dans votre navigateur
2. Créer un compte administrateur
3. Créer un projet avec l'ID : `project-id`
4. L'application frontend se connectera automatiquement

## 5. Installation et lancement du frontend

```bash
# Retourner à la racine du projet
cd ..

# Installer les dépendances
npm install

# Copier la configuration d'environnement
cp .env.example .env

# Lancer le serveur de développement
npm run dev
```

## 6. Accès aux services

- **Frontend**: <http://localhost:5173>
- **Appwrite Console**: <http://localhost>
- **Appwrite API**: <http://localhost/v1>

## 7. Commandes utiles

### Appwrite

```bash
# Démarrer Appwrite
cd appwrite && docker-compose up -d

# Arrêter Appwrite
cd appwrite && docker-compose down

# Voir les logs Appwrite
cd appwrite && docker-compose logs -f
```

### Frontend

```bash
# Démarrer en mode développement
npm run dev

# Build pour la production
npm run build

# Prévisualiser le build de production
npm run preview

# Linter et formatter
npm run lint
npm run format
```

## 8. Dépannage

- Si Appwrite ne démarre pas : vérifiez que Docker fonctionne et que les ports 80/443 sont libres
- Si le frontend ne se connecte pas : vérifiez que l'ID de projet dans `.env` correspond à celui créé dans Appwrite
- En cas de problème : consultez les logs avec `docker-compose logs -f` dans le dossier `appwrite/`
