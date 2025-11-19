#!/bin/bash

set -e

SCRIPT_DIR="$(dirname "$(realpath "$0")")"

cd $SCRIPT_DIR/..

echo "--- Fixing API ---"
echo "--- Executing Ruff ---"
uv run ruff format .
uv run ruff check --fix .