#!/usr/bin/env bash

APP_VERSION=$1 docker-compose -f docker-compose.yml up --detach
echo "App deployed successfully with version: $1"
    