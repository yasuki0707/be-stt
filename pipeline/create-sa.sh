#!/bin/sh
kubectl create sa build-bot

kubectl patch serviceaccount build-bot \
    -p '{"secrets": [{"name": "quay-io-yasu-be-password"}]}'
kubectl patch serviceaccount build-bot \
    -p '{"imagePullSecrets": [{"name": "quay-io-yasu-be-password"}]}'

kubectl get sa \
    -n yasu \
    build-bot -o yaml

oc policy add-role-to-user cluster-admin \
    -z build-bot