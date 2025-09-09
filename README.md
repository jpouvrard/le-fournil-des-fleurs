# Le Fournil des Fleurs

> Application React avec Vite, TypeScript, et backend Appwrite self-hosted

## 🚀 Démarrage rapide

**📖 Pour un guide détaillé, consultez [QUICKSTART.md](./QUICKSTART.md)**

### Installation rapide

1. **Backend Appwrite** (une seule fois) :
```bash
docker run -it --rm \
    --volume /var/run/docker.sock:/var/run/docker.sock \
    --volume "$(pwd)"/appwrite:/usr/src/code/appwrite:rw \
    --entrypoint="install" \
    appwrite/appwrite:1.7.4
```

2. **Démarrer les services** :
```bash
# Backend Appwrite
cd appwrite && docker-compose up -d

# Frontend (dans un autre terminal)
cd .. && npm install && npm run dev
```

3. **Accéder à l'application** :
- Frontend: http://localhost:5173
- Appwrite Console: http://localhost

## 📋 Scripts disponibles

- `npm run dev` - Serveur de développement Vite
- `npm run build` - Build de production (TypeScript + Vite)
- `npm run preview` - Prévisualisation du build
- `npm run format` - Formatage avec Biome
- `npm run lint` - Linting avec Biome
- `npm test` - Tests avec Vitest
- `npm run test:ui` - Interface Vitest

## 🏗️ Architecture

### Frontend (Développement local)
- **React 19** + TypeScript + Vite
- **Styling**: TailwindCSS + shadcn/ui
- **Testing**: Vitest + React Testing Library
- **Code Quality**: Biome (formatage + linting)
- **Dev Server**: http://localhost:5173

### Backend (Docker)
- **Appwrite 1.7.4** self-hosted
- **Base de données**: MariaDB
- **Cache**: Redis
- **Proxy**: Traefik
- **Console**: http://localhost
- **API**: http://localhost/v1

## 🔧 Développement

### Commandes Appwrite
```bash
cd appwrite
docker-compose up -d     # Démarrer
docker-compose down      # Arrêter
docker-compose logs -f   # Logs
```

### Commandes Frontend
```bash
npm run dev       # Développement
npm run build     # Build production
npm run lint      # Vérification code
npm test          # Tests
```

## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - 🚀 Guide de démarrage rapide
- **[WARP.md](./WARP.md)** - 🤖 Guide technique pour les agents IA
- **Configuration**: Voir `.env.example` pour les variables d'environnement
