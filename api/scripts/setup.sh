#!/bin/bash

set -e

SCRIPT_DIR="$(dirname "$(realpath "$0")")"

cd $SCRIPT_DIR/..

echo "--- Settupping API ---"
echo "--- Installing API dependencies ---"
uv sync

echo "--- Making migrations ---"
uv run python manage.py makemigrations

echo "--- Migrating ---"
uv run python manage.py migrate 
