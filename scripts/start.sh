#!/bin/bash

set -e

SCRIPT_DIR="$(dirname "$(realpath "$0")")"

cd $SCRIPT_DIR/..

echo "--- Executing API start script ---"

echo "--- Downloading dependencies ---"
uv sync

# echo "--- Collecting static files ---"
# uv run python manage.py collectstatic --noinput

echo "--- Making migrations ---"
uv run python manage.py makemigrations

echo "--- Migrating ---"
uv run python manage.py migrate

# echo "--- Running API with gunicorn ---"
# uv run gunicorn core.wsgi:application --bind 0.0.0.0:8000

echo "--- Running API with runserver ---"
uv run python manage.py runserver
