const logger = require('../lib/logger.js')
const ERROR_CODE = 500

function handleErrors(err, req, res, next) {
    const { httpStatusCode = ERROR_CODE } = err
    if (httpStatusCode >= 400 && httpStatusCode < 500) {
        logger.warn(err.stack);
    } else if (httpStatusCode >= 500) {
        logger.error(err.stack);
    } else {
        logger.info(err.stack);
    }
    res.status(httpStatusCode).json({
        error: err.message
    });
}

exports.handleErrors = handleErrors