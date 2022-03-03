# Loggers, Gzip y analisis de performance

Desafio 14 del curso Backend de Coderhouse

## Instalar dependencias

    npm install

## Configracion de Bases de Datos:

/src/lib/connections.js

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

### Autocannon utilizando node --prof

    npm run consoletest
     node --prof-process ..\reportes\nodeprof\autocannon\isolate_console.log > ..\reportes\nodeprof\autocannon\result_prof_console.log
    npm run noconsoletest
     node --prof-process ..\reportes\nodeprof\autocannon\isolate_noconsole.log > ..\reportes\nodeprof\autocannon\result_prof_noconsole.log

### Autocannon utilizando node --inspect
    
    npm run consoletest
    npm run noconsoletest