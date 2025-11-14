#!/bin/bash

set -e

SCRIPT_DIR="$(dirname "$(realpath "$0")")"

cd $SCRIPT_DIR/..

echo "--- Adding files not ignored by git ---"
git add --all

echo "--- Removig files ignored by git ---"
git clean -f -d -x