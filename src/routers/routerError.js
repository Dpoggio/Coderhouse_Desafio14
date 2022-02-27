const ERROR_CODE = 500

function handleErrors(err, req, res, next) {
    console.error(err.stack);
    const { httpStatusCode = ERROR_CODE } = err
    res.status(httpStatusCode).json({
        error: err.message
    });
}

exports.handleErrors = handleErrors