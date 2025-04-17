#!/bin/bash

# MongoDB Docker Setup Script with Mongo-Express
# This script creates and runs MongoDB with a web admin interface

# Configuration variables
CONTAINER_NAME="mongodb"
MONGO_PORT=27017
MONGO_EXPRESS_PORT=8081
DATA_DIR="$HOME/mongodata"  # Change this to your preferred data directory
DOCKER_NETWORK="mongo-network"

# MongoDB credentials
MONGO_ROOT_USER="root"
MONGO_ROOT_PASS="example"  # CHANGE THIS for production!

# Mongo-Express credentials
MONGO_EXPRESS_USER="admin"
MONGO_EXPRESS_PASS="admin"  # CHANGE THIS for production!

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    echo "Docker does not seem to be running, please start Docker first"
    exit 1
fi

# Create data directory if it doesn't exist
mkdir -p "$DATA_DIR"

# Create Docker network (for connecting MongoDB and Mongo-Express)
if ! docker network inspect "$DOCKER_NETWORK" >/dev/null 2>&1; then
    echo "Creating Docker network $DOCKER_NETWORK..."
    docker network create "$DOCKER_NETWORK"
fi

# Check if MongoDB container already exists
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    echo "Found existing MongoDB container:"
    docker ps -a -f name=$CONTAINER_NAME
    
    read -p "Do you want to (r)estart, (d)elete and recreate, or (q)uit? " choice
    case "$choice" in
        r|R )
            echo "Restarting container..."
            docker restart $CONTAINER_NAME
            ;;
        d|D )
            echo "Removing existing container..."
            docker rm -f $CONTAINER_NAME
            ;;
        * )
            echo "Aborting."
            exit 0
            ;;
    esac
fi

# Run MongoDB container
echo "Starting MongoDB container..."
docker run -d \
    --name $CONTAINER_NAME \
    --restart unless-stopped \
    -p $MONGO_PORT:27017 \
    -v "$DATA_DIR:/data/db" \
    --network "$DOCKER_NETWORK" \
    -e MONGO_INITDB_ROOT_USERNAME=$MONGO_ROOT_USER \
    -e MONGO_INITDB_ROOT_PASSWORD=$MONGO_ROOT_PASS \
    mongo:latest

# Run Mongo-Express container
echo "Starting Mongo-Express..."
docker run -d \
    --name mongo-express \
    --restart unless-stopped \
    -p $MONGO_EXPRESS_PORT:8081 \
    --network "$DOCKER_NETWORK" \
    -e ME_CONFIG_MONGODB_SERVER=$CONTAINER_NAME \
    -e ME_CONFIG_MONGODB_ADMINUSERNAME=$MONGO_ROOT_USER \
    -e ME_CONFIG_MONGODB_ADMINPASSWORD=$MONGO_ROOT_PASS \
    -e ME_CONFIG_BASICAUTH_USERNAME=$MONGO_EXPRESS_USER \
    -e ME_CONFIG_BASICAUTH_PASSWORD=$MONGO_EXPRESS_PASS \
    mongo-express:latest

# Check if containers started successfully
if [ $? -eq 0 ]; then
    echo ""
    echo "===================================================================="
    echo "MongoDB and Mongo-Express started successfully!"
    echo ""
    echo "MongoDB Connection:"
    echo "URI:        mongodb://$MONGO_ROOT_USER:$MONGO_ROOT_PASS@localhost:$MONGO_PORT/"
    echo "Terminal:   docker exec -it $CONTAINER_NAME mongosh -u $MONGO_ROOT_USER -p $MONGO_ROOT_PASS"
    echo ""
    echo "Mongo-Express (Web Admin):"
    echo "URL:        http://localhost:$MONGO_EXPRESS_PORT"
    echo "Username:   $MONGO_EXPRESS_USER"
    echo "Password:   $MONGO_EXPRESS_PASS"
    echo ""
    echo "Data is persisted in: $DATA_DIR"
    echo "===================================================================="
else
    echo "Failed to start containers"
    exit 1
fi