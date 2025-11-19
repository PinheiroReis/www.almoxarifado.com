#!/bin/bash

set -e

SCRIPT_DIR="$(dirname "$(realpath "$0")")"

cd $SCRIPT_DIR/..

echo "--- Starting project containers ---"
echo "--- Building containers ---"
docker compose build

echo "--- Starting containers ---"
docker compose up -d

echo "--- Showing logs ---"
docker compose logs

echo "--- All services are up ---"
