# Rachana Creates — Setup & Run Guide

Modern Vue 3 + Vite app with a dark green / beige-brown theme. This guide covers fresh-machine setup, development, build/preview, and optional Instagram integration.

## Prerequisites
- Node.js: 22.x recommended (or >=20.19)
- npm: comes with Node
- Linux/macOS terminal

Tip: Use `nvm` (Node Version Manager) to easily install/select Node versions.

## Quick Start (Recommended)
Use the provided setup script to prepare the environment and start the app.

```bash
# From project root
bash ./setup.sh --dev
```

This will:
- Ensure Node via `nvm` (uses `.nvmrc` or Node 22)
- Install dependencies
- Start the Vite dev server

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

Notes:
- Token creation steps are documented in `README.md` under “Instagram Integration (Optional)”.
- If `INSTAGRAM_TOKEN` is missing, pages gracefully fallback to placeholder images.

## Build & Preview
```bash
npm run build
npm run preview
```

## Troubleshooting
- Node version error: Vite 7 requires Node `>=20.19` or `22.12+`.
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
