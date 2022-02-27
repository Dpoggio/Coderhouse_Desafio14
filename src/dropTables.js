const cfg = require('./config.js')

async function main(){
    const mariaDB = require('knex')(cfg.CONN_MARIA_DB)
    const sqlite = require('knex')(cfg.CONN_SQLITE)
    
    // Drop tabla Productos
    await mariaDB.schema.dropTableIfExists('productos')
        .catch(err => {
            console.log('Error al dropear tabla de Productos')
            console.log(err)
        })
        
    // Drop tabla Mensajes
    await sqlite.schema.dropTableIfExists('mensajes')
        .catch(err => {
            console.log('Error al dropear tabla de Mensajes')
            console.log(err)
        })

    mariaDB.destroy()
    sqlite.destroy()
}

main()