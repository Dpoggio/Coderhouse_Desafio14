const Productos = require('../model/productoDaoMongo.js')
const Mensajes = require('../model/mensajes.js')
const { normalize, schema } = require("normalizr")
const { Server: IOServer } = require('socket.io');
const Log = require('./log.js')


// Normalizr
const authorSchema = new schema.Entity('author', {}, { idAttribute: 'mail' });
const mensajesSchema = new schema.Entity('mensajes', {
    mensajes: [ { author: authorSchema } ]
});

// Productos
const productos = new Productos()
const mensajes = new Mensajes()

async function getMensajes(){
    const listaMensajes = await mensajes.getAll()
    const mensajesDenorm = {id: 'mensajes', mensajes: listaMensajes}
    const mensajesNorm = normalize(mensajesDenorm, mensajesSchema);
    return mensajesNorm
}


function websocket(httpServer){
    io = new IOServer(httpServer)

    nuevoProducto = async (producto) => {
        await productos.save(producto)
        io.sockets.emit('actualizarProductos', await productos.getAll())
    }
    
    
    nuevoMensaje = async (mensaje) => {
        await mensajes.save(mensaje)
        io.sockets.emit('actualizarMensajes', await getMensajes())
    }

    io.on('connection', async socket => {
        Log.info('Nuevo cliente conectado')
    
        socket.emit('actualizarProductos', await productos.getAll())
        socket.emit('actualizarMensajes', await getMensajes())
    
        socket.on('nuevoProducto', nuevoProducto)
        socket.on('nuevoMensaje', nuevoMensaje)
    })

    return io
}

module.exports = websocket