#!/bin/bash

set -e

SCRIPT_DIR="$(dirname "$(realpath "$0")")"

cd $SCRIPT_DIR/..

echo "--- Starting API ---"
echo "--- Running API with runserver ---"
uv run python manage.py runserver 0.0.0.0:8000