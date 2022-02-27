const { Router } = require('express');
const routerInfo = Router();

/**** Rutas ****/
routerInfo.get('/', (req, res) => {
    res.render('info', { params: [
        { desc: "Argumentos de Entrada", value: process.argv.slice(2) },
        { desc: "Nombre de la plataforma", value: process.platform },
        { desc: "Version de node.js", value: process.version },
        { desc: "Memoria total reservada", value: process.memoryUsage().rss },
        { desc: "Path de ejecucion", value: process.argv[1] },
        { desc: "Process id", value: process.pid },
        { desc: "Carpeta del proyecto", value: process.cwd() },
        { desc: "Cantidad de Procesadores", value: require('os').cpus().length },
    ] })
})


exports.routerInfo = routerInfo;