# Servidor con balance de carga

Desafio 13 del curso Backend de Coderhouse

## Instalar dependencias

    npm install

## Configracion de Bases de Datos:

/src/lib/connections.js


## Ejecuciones

Todas las ejecuciones se realizan desde la carpeta ./src/

### Iniciar en modo FORK

node ./server.js --port 8081 --modo FORK

### Iniciar en modo CLUSTER

node ./server.js --port 8081 --modo CLUSTER

### Iniciar en modo FORK con Nodemon

nodemon ./server.js --port 8081 --modo FORK

### Iniciar en modo CLUSTER con Nodemon

nodemon ./server.js --port 8081 --modo CLUSTER

### Iniciar con forever en modo FORK

forever start -w ./server.js --port 8081 --modo FORK
forever start -w ./server.js --port 8082 --modo FORK
forever start -w ./server.js --port 8083 --modo FORK
forever list
forever stopall

### Iniciar con forever en modo CLUSTER

forever start -w ./server.js --port 8081 --modo CLUSTER
forever list
forever stopall

### Iniciar con pm2 en modo FORK

pm2 start ./server.js --name="Server1" --watch -- --port 8081 --modo FORK
pm2 start ./server.js --name="Server3" --watch -- --port 8083 --modo FORK
pm2 start ./server.js --name="Server4" --watch -- --port 8084 --modo FORK
pm2 list
pm2 delete all

### Iniciar con pm2 en modo CLUSTER

pm2 start ./server.js --name="Server1" --watch -i max -- --port 8081 --modo FORK
pm2 list
pm2 delete all


### Iniciar servidor balanceado con NGINX

pm2 monit
pm2 start ./server.js --name="Server0" --watch -- --port 8080 --modo FORK
pm2 start ./server.js --name="Server1" --watch -- --port 8081 --modo CLUSTER
pm2 start ./server.js --name="Server2" --watch -- --port 8082 --modo FORK
pm2 start ./server.js --name="Server3" --watch -- --port 8083 --modo FORK
pm2 start ./server.js --name="Server4" --watch -- --port 8084 --modo FORK
pm2 start ./server.js --name="Server5" --watch -- --port 8085 --modo FORK
pm2 logs

#### Iniciar nginx con /api/randoms apuntando a servidor CLUSTER
* Utilizar el archivo "configNginx/config1.conf"
nginx.exe

#### Iniciar nginx con /api/randoms apuntando a servidores FORK
* Utilizar el archivo "configNginx/config2.conf"
nginx.exe -s reload