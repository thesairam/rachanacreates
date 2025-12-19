#!/usr/bin/env bash
set -euo pipefail

# Setup script for a fresh machine:
# - Ensures Node via nvm (defaults to .nvmrc or 22)
# - Installs dependencies
# - Optionally fetches Instagram media
# - Launches dev server or builds/preview

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_ROOT"

usage() {
    cat <<'USAGE'
Usage: setup.sh [options]

Options:
    --install-only      Install nvm/Node and npm deps, then exit
    --fetch-instagram   Run npm run fetch:instagram if INSTAGRAM_TOKEN is set
    --dev               Start Vite dev server
    --build             Build for production (vite build)
    --preview           Preview production build (vite preview)
    --node <version>    Override Node version (e.g., 22 or 20.19)
    -h, --help          Show this help

Defaults: install deps and start dev server.
USAGE
}

NODE_VERSION_OVERRIDE=""
DO_INSTALL_ONLY="false"
DO_FETCH_INSTAGRAM="false"
DO_DEV="false"
DO_BUILD="false"
DO_PREVIEW="false"

while [[ ${1:-} ]]; do
    case "$1" in
        --install-only) DO_INSTALL_ONLY="true" ;;
        --fetch-instagram) DO_FETCH_INSTAGRAM="true" ;;
        --dev) DO_DEV="true" ;;
        --build) DO_BUILD="true" ;;
        --preview) DO_PREVIEW="true" ;;
        --node) NODE_VERSION_OVERRIDE="$2"; shift ;;
        -h|--help) usage; exit 0 ;;
        *) echo "Unknown option: $1"; usage; exit 1 ;;
    esac
    shift || true
done

install_nvm_if_missing() {
    if command -v nvm >/dev/null 2>&1; then
        return
    fi
    echo "Installing nvm (Node Version Manager)..."
    export NVM_DIR="$HOME/.nvm"
    mkdir -p "$NVM_DIR"
    curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    # shellcheck source=/dev/null
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
}

ensure_node() {
    export NVM_DIR="$HOME/.nvm"
    # shellcheck source=/dev/null
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

    local target="${NODE_VERSION_OVERRIDE}"
    if [[ -z "$target" ]]; then
        if [[ -f .nvmrc ]]; then
            target="$(cat .nvmrc)"
        else
            target="22"
        fi
    fi

    if ! command -v node >/dev/null 2>&1; then
        echo "Node not found; installing Node $target via nvm..."
        nvm install "$target"
    else
        local current
        current="$(node -v | sed 's/^v//')"
        echo "Detected Node $current"
        nvm install "$target" >/dev/null 2>&1 || true
    fi
    nvm use "$target"
}

install_dependencies() {
    echo "Installing project dependencies..."
    if [[ -f package-lock.json ]]; then
        npm ci || npm install
    else
        npm install
    fi
}

fetch_instagram() {
    if [[ -z "${INSTAGRAM_TOKEN:-}" ]]; then
        echo "INSTAGRAM_TOKEN not set; skipping Instagram fetch."
        return 0
    fi
    echo "Fetching Instagram media..."
    npm run fetch:instagram || echo "Instagram fetch failed; continuing."
}

run_dev() {
    echo "Starting Vite dev server..."
    npm run dev
}

run_build() {
    echo "Building for production..."
    npm run build
}

run_preview() {
    echo "Previewing production build..."
    npm run preview
}

echo "== Rachana Creates setup =="
install_nvm_if_missing
ensure_node
install_dependencies

if [[ "$DO_INSTALL_ONLY" == "true" ]]; then
    echo "Install complete."
    exit 0
fi

if [[ "$DO_FETCH_INSTAGRAM" == "true" ]]; then
    fetch_instagram
fi

# Default behavior: dev
if [[ "$DO_BUILD" != "true" && "$DO_PREVIEW" != "true" && "$DO_DEV" != "true" ]]; then
    DO_DEV="true"
fi

if [[ "$DO_BUILD" == "true" ]]; then run_build; fi
if [[ "$DO_PREVIEW" == "true" ]]; then run_preview; fi
if [[ "$DO_DEV" == "true" ]]; then run_dev; fi
