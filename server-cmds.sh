#!/usr/bin/env bash

export IMG_NAME=$1
APP_VERSION=$1 docker-compose -f docker-compose.yml up --detach
echo "App deployed successfully with version: $1"
    