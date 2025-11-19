#!/bin/bash

set -e

SCRIPT_DIR="$(dirname "$(realpath "$0")")"

cd $SCRIPT_DIR/..

ROOT_DIR=$(pwd)

cd $ROOT_DIR/api
chmod u+x ./scripts/genenv.sh
./scripts/genenv.sh

cd $ROOT_DIR/app
chmod u+x ./scripts/genenv.sh
./scripts/genenv.sh


echo "Files generated"
