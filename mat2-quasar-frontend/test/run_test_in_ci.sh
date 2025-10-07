#!/bin/bash

set -e

echo "Starting services"
docker compose -f test/docker-compose.ci.yml up -d --build

echo "Running tests"
docker compose -f test/docker-compose.ci.yml -f test/cypress.yml up  --exit-code-from cypress

echo "Tests passed. Stopping docker compose..."
docker compose -f test/docker-compose.ci.yml -f test/cypress.yml down
