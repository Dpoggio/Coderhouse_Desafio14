const dotenv = require('dotenv')
dotenv.config()
const yargs = require('yargs/yargs')(process.argv.slice(2))

const args = yargs
    .options({
      'port': {
        alias: 'p',
        describe: 'Puerto del servidor',
        demandOption: false,
        default: 8080
      },
      'modo': {
        alias: 'm',
        describe: 'Modo de ejecucion',
        choices: ["FORK", "CLUSTER"],
        demandOption: false,
        default: 'FORK'
      }
    })
    .help()
    .argv

module.exports = Object.freeze({
    // Misc
    PORT: args.port,
    MODO: args.modo,

    // HTTP
    HTTP_NOT_FOUND: 404,
    HTTP_SERVER_ERROR: 500,
    HTTP_CREATED: 201,
    HTTP_NOT_AUTHORIZED: 403,
    HTTP_BAD_REQUEST: 400,

    // Random
    RANDOM_MAX_VALUE: 1000,
    RANDOM_DEFAULT_CANT: 100000000,

    // Session
    SESSION_SECRET: process.env.SESSION_SECRET || 'CoderHouse!!!',
    
    // CONECTIONS
    CONN_MONGO_SESSION: process.env.CONN_MONGO_SESSION || "mongodb://localhost:27017/sessions",
    CONN_MARIA_DB: {
        client: 'mysql',
        connection: { 
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_DATABASE || 'test'
        }
    },
    CONN_SQLITE: {
        client: 'sqlite3',
        connection: { filename: process.env.SQLITE_FILENAME || './DB/ecommerce.db'}
    },
    CONN_MONGO_DB: process.env.MONGO_URL || "mongodb://localhost:27017/ecommerce"
})