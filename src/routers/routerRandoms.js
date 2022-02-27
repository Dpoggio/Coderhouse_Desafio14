const { Router } = require('express')
const { fork } = require('child_process')
const logger = require('../lib/logger.js')

const routerRandoms = Router();

/**** Rutas ****/
routerRandoms.get('/', (req, res, next) => {  
    logger.info('Consulta a /api/randoms')
    try {
        const cant = req.query.cant

        const randomController = fork('./controllers/randoms.js')
        randomController.send({ cant })
        randomController.on('message', listaRandom => {
            res.json(listaRandom)
        })
    } catch (error) {
        next(error)
    }
})

exports.routerRandoms = routerRandoms;