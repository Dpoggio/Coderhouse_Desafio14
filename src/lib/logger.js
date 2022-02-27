const log4js = require('log4js')
const variable = "holallasd"
log4js.configure({
  appenders: {
    consola: { 
      type: 'console',
      layout    : {
        type   : "pattern",
        pattern: `%[[PID: %z] [%d] [%-5p] %c -%] %m`,
      } 
    },
    archivoErrores: { 
      type: 'file', 
      filename: 'logs/error.log',
      layout    : {
        type   : "pattern",
        pattern: `[PID: %z] [%d] [%-5p] %c - %m`,
      }
    },
    archivoWarning: { 
      type: 'file', 
      filename: 'logs/warn.log',
      layout    : {
        type   : "pattern",
        pattern: `[PID: %z] [%d] [%-5p] %c - %m`,
      }
    },
    loggerConsola: {
      type: 'logLevelFilter',
      appender: 'consola',
      level: 'info',
    },
    loggerArchivoErrores: {
      type: 'logLevelFilter',
      appender: 'archivoErrores',
      level: 'error',
      maxLevel: 'error',
    },
    loggerArchivoWarning: {
      type: 'logLevelFilter',
      appender: 'archivoWarning',
      level: 'warn',
      maxLevel: 'warn',
    },
  },
  categories: {
    default: {
      appenders: ['loggerConsola'],
      level: 'all'
    },
    prod: {
      appenders: ['loggerConsola', 'loggerArchivoErrores', 'loggerArchivoWarning'],
      level: 'all',
    },
    dev: {
      appenders: ['loggerConsola', 'loggerArchivoErrores', 'loggerArchivoWarning'],
      level: 'all',
    },
  },
})

let logger = null

if (process.env.NODE_ENV === 'PROD') {
  logger = log4js.getLogger('prod')
} else {
  logger = log4js.getLogger('dev')
}

// logger.expressLogMiddleware = (req, res, next) => {
//   logger.info(`Request: ${req.method} - ${req.url} `)
//   next()
// }

logger.expressLogMiddleware = log4js.connectLogger(logger, {
    level: 'auto',
    statusRules: [
        { from: 200, to: 399, level: 'info' },
        { from: 400, to: 499, level: 'warn' },
        { from: 500, to: 599, level: 'error' }
    ],
    format: (req, res, format) => format(`Request [:remote-addr] [httpStatus: :status] - ":method :url"`)
})

module.exports = logger
