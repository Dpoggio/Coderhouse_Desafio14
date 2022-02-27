
class Log {
  static info(msg) {
    console.log(`Worker [${process.pid}] | INFO  | ${msg}`)
  }

  static error(msg) {
    console.error(`Worker [${process.pid}] | ERROR | ${msg}`)
  }
}

module.exports = Log