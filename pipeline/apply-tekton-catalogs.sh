kubectl apply -f https://raw.githubusercontent.com/tektoncd/catalog/main/task/npm/0.1/npm.yaml
oc apply -f https://raw.githubusercontent.com/tektoncd/catalog/main/task/git-clone/0.3/git-clone.yaml
oc apply -f https://raw.githubusercontent.com/tektoncd/catalog/main/task/buildah/0.1/buildah.yaml
