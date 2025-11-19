#!/bin/bash

set -e

SCRIPT_DIR="$(dirname "$(realpath "$0")")"

cd $SCRIPT_DIR/..

if ! command -v pnpm >/dev/null 2>&1; then
    npm install -g pnpm@latest-10
fi

echo "--- Testing APP ---"
echo "--- Executing APP tests ---"
pnpm test