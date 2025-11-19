#!/bin/bash

set -e

SCRIPT_DIR="$(dirname "$(realpath "$0")")"

cd $SCRIPT_DIR/..

echo "--- Starting APP ---"
echo "--- Initializing APP ---"
pnpm dev 