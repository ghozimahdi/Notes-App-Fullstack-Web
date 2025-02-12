#!/bin/bash

# ================= Restart ===========
docker-compose -f docker-compose.yml -f docker-compose.prod.yml down
# =====================================
# run dev
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

# run staging
docker-compose -f docker-compose.yml -f docker-compose.staging.yml up -d --build

# run prod
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build