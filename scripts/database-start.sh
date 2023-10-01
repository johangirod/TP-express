docker network create TP-serveur-web
docker run -d \
    --name mysql \
    --network TP-serveur-web --network-alias mysql \
    -v TP-mysql-data:/var/lib/mysql \
    -e MYSQL_ROOT_PASSWORD=secret \
    -e MYSQL_DATABASE=restaurant \
    mysql:8.0
