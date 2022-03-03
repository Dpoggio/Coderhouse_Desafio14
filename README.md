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

## Compression

### Ruta /info/compressed comprimida:

X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 2446
ETag: W/"98e-kwfQSqJ6E5Ik1znR8FpTMvIKEAs"
Vary: Accept-Encoding
Date: Wed, 02 Mar 2022 23:15:25 GMT
Connection: keep-alive
Keep-Alive: timeout=5

### Ruta /info no comprimida:

X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 2446
ETag: W/"98e-LVtAYBcd7cjqcKFuRCBWfmFl968"
Date: Wed, 02 Mar 2022 23:14:21 GMT
Connection: keep-alive
Keep-Alive: timeout=5

## Profiling

### Artillery utilizando node --prof

    artillery quick --count 20 -n 50 http://localhost:8080/info > reportes/nodeprof/artillery/results_noconsole.txt
    artillery quick --count 20 -n 50 http://localhost:8080/info?console=true > reportes/nodeprof/artillery/results_console.txt

### Artillery utilizando node --inspect

    artillery quick --count 20 -n 50 http://localhost:8080/info > reportes/inspect/artillery/results_noconsole.txt
    artillery quick --count 20 -n 50 http://localhost:8080/info?console=true > reportes/inspect/artillery/results_console.txt

