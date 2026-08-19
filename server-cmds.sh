#!/usr/bin/env bash

APP_VERSION=${env.APP_VERSION} docker-compose -f docker-compose.yml up --detach
echo "App deployed successfully with version: ${APP_VERSION}"
