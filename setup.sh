#!/usr/bin/env bash
set -euo pipefail

# This script sets up Node via nvm (Node 22 LTS) and runs Vite.
# It avoids apt's old Node and does NOT use sudo for npm operations.

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_ROOT"

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

    TARGET_NODE="22"
    if [ -f .nvmrc ]; then
        TARGET_NODE="$(cat .nvmrc)"
    fi

    if ! command -v node >/dev/null 2>&1; then
        echo "Node not found; installing Node $TARGET_NODE via nvm..."
        nvm install "$TARGET_NODE"
    else
        CURRENT_NODE="$(node -v | sed 's/^v//')"
        echo "Detected Node $CURRENT_NODE"
        if ! nvm ls "$TARGET_NODE" >/dev/null 2>&1; then
            nvm install "$TARGET_NODE"
        fi
    fi
    nvm use "$TARGET_NODE"
}

install_dependencies() {
    echo "Installing project dependencies..."
    npm install
}

run_dev() {
    echo "Starting Vite dev server..."
    npm run dev
}

echo "== Rachana Creates setup =="
install_nvm_if_missing
ensure_node
install_dependencies
run_dev
