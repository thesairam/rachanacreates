# Henna By Rachana — Setup & Run Guide

Modern Vue 3 + Vite app with a dark green / beige-brown theme. This guide covers Docker (recommended), local development, build/preview, and optional Instagram integration.

## Prerequisites

**Docker (recommended — no Node install required):**
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) or Docker Engine + Compose plugin

**Local development (alternative):**
- Node.js: 22.x recommended (or >=20.19)
- npm: comes with Node
- Linux/macOS terminal

---

## Quick Start — Docker (Recommended)
Run the app on any machine with a single command. No Node.js install needed.

```bash
# From project root
docker compose up --build
```

This will:
- Build the app inside a Node 22 container (`npm ci` + `vite build`)
- Serve the production build via nginx on port **8080**

Open: http://localhost:8080

To stop:
```bash
docker compose down
```

To rebuild after code changes:
```bash
docker compose up --build
```

> **Instagram token at build time:** If you use the Instagram integration, create a `.env.local` file with your token *before* running `docker compose up --build`. The token is read during the build step and is never baked into the image.

---

## Quick Start — Local Dev (Alternative)
Use the provided setup script to prepare the environment and start the Vite dev server.

```bash
# From project root
bash ./setup.sh --dev
```

This will:
- Ensure Node via `nvm` (uses `.nvmrc` or Node 22)
- Install dependencies
- Start the Vite dev server

Notes:
- The script auto-loads an existing `nvm` install, so you don't have to open a new shell first.
- If Node 22 is missing, it will be installed automatically via `nvm`.

Open the printed URL (e.g., http://localhost:5173).

## Setup Script Options
```bash
bash ./setup.sh --help
```

Useful flags:
- `--install-only`: Install nvm/Node and npm deps, then exit (no server)
- `--fetch-instagram`: Fetch latest Instagram media if `INSTAGRAM_TOKEN` is set
- `--dev`: Start development server (Vite)
- `--build`: Build for production (`vite build`)
- `--preview`: Preview the production build (`vite preview`)
- `--node <version>`: Override Node version (e.g., `22`, `20.19`)

Examples:
```bash
# Install only
bash ./setup.sh --install-only

# Fetch Instagram media then run dev
bash ./setup.sh --fetch-instagram --dev

# Build and preview
bash ./setup.sh --build
bash ./setup.sh --preview

# Force Node 22
bash ./setup.sh --node 22 --dev
```

## Manual nvm Setup (Alternative)
If you prefer manual steps:

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
# Load nvm in the current shell
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

# Install and use Node 22 (or read from .nvmrc)
nvm install 22
nvm use 22

# Install deps and run
npm install
npm run dev
```

## Instagram Integration (Optional)
This app can display your latest Instagram posts on the Designs page and top 3 on Home. It uses a build-time script that writes `public/instagram.json`.

1) Add a token to `.env.local` (not committed):
```
INSTAGRAM_TOKEN=LONG_LIVED_TOKEN
```
2) Fetch latest media:
```bash
npm run fetch:instagram
```
3) Start the dev server:
```bash
npm run dev
```

How to get a long-lived token (Basic Display API):
- Create a Facebook app (type: Consumer) and add the product “Instagram Basic Display”.
- In that product’s settings, add a Valid OAuth Redirect URI you can capture (e.g., https://oauth.pstmn.io/v1/callback).
- Add your Instagram account (@rachana.artverse) as a Tester, then accept the invite from the Instagram account (Settings → Websites/Apps → Tester Invites).
- Authorize via: `https://api.instagram.com/oauth/authorize?client_id=APP_ID&redirect_uri=REDIRECT_URI&scope=user_profile,user_media&response_type=code` and copy the `code` from the redirect.
- Exchange the code for a short-lived token:
  ```bash
  curl -X POST https://api.instagram.com/oauth/access_token \
    -F client_id=APP_ID \
    -F client_secret=APP_SECRET \
    -F grant_type=authorization_code \
    -F redirect_uri=REDIRECT_URI \
    -F code=CODE_FROM_STEP
  ```
- Exchange for a long-lived token (~60 days):
  ```bash
  curl "https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=APP_SECRET&access_token=SHORT_LIVED_TOKEN"
  ```
- Put that long-lived token into `.env.local` as shown above. Refresh before it expires via:
  ```bash
  curl "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=LONG_LIVED_TOKEN"
  ```

Notes:
- Token creation steps are documented in `README.md` under “Instagram Integration (Optional)”.
- If `INSTAGRAM_TOKEN` is missing, pages gracefully fallback to placeholder images.

## Build & Preview

**Docker (production build, served via nginx):**
```bash
docker compose up --build
```
Open http://localhost:8080.

**Local (Vite preview of production build):**
```bash
npm run build
npm run preview
```

## Troubleshooting
- **Docker port conflict:** If port 8080 is in use, edit `docker-compose.yml` and change `"8080:80"` to another port (e.g. `"3000:80"`).
- **Docker build fails (ENOENT / missing files):** Make sure you run `docker compose up --build` from the project root where `Dockerfile` lives.
- Node version error (local): Vite 7 requires Node `>=20.19` or `22.12+`.
  - Fix with `nvm install 22 && nvm use 22` or run `bash ./setup.sh --node 22 --dev`.
- Instagram fetch fails (exit code 2): Ensure `.env.local` contains a valid `INSTAGRAM_TOKEN` and you have network access.

## Project Scripts
- `npm run dev`: Start Vite dev server
- `npm run build`: Build production assets
- `npm run preview`: Preview built assets
- `npm run fetch:instagram`: Fetch latest Instagram media (writes `public/instagram.json`)

## Where Things Live
- App entry: `src/main.js`
- Router: `src/router/index.js`
- Layout: `src/App.vue`, `src/components/Navbar.vue`, `src/components/FooterBar.vue`
- Pages: `src/views/Home.vue`, `src/views/Design.vue`, `src/views/Contact.vue`
- Theme: `src/assets/styles.css`
- Media: `public/media/` (your uploads) and `public/media/placeholders/` (dummy images)
- Instagram cache: `public/instagram.json`
- Docker: `Dockerfile`, `docker-compose.yml`, `nginx.conf`, `.dockerignore`
