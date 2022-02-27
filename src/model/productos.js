const Contenedor = require('../lib/contenedorDB.js')
const cfg = require('../config.js')

class Productos extends Contenedor{
    constructor(){
        super(cfg.CONN_MARIA_DB,'productos')
    }
}

module.exports = Productos