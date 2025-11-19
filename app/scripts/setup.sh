#!/bin/bash

set -e

SCRIPT_DIR="$(dirname "$(realpath "$0")")"

cd $SCRIPT_DIR/..

echo "--- Settupping APP ---"
echo "--- Installing APP dependencies ---"
pnpm install