source .env

kubectl create secret \
    -n yasu \
    docker-registry quay-io-yasu-be-password \
    --docker-server=$CONTAINER_REGISTRY_SERVER \
    --docker-username=$CONTAINER_REGISTRY_USER \
    --docker-password=$CONTAINER_REGISTRY_PASSWORD