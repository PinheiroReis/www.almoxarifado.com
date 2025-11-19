#!/bin/bash

set -e

SCRIPT_DIR="$(dirname "$(realpath "$0")")"

cd $SCRIPT_DIR/..

echo "--- Generating API .env ---"
echo "--- Copying .env.example to .env ---"
cp .env.example .env