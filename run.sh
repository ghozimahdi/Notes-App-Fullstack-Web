#!/bin/bash

# Only Backend
docker-compose up --build backend_dev

# Only Frontend
docker-compose up --build frontend_dev

# Run
docker-compose up --build frontend_dev backend_dev