function errorHandler(error, req, res, next) {
    let statusCode = 500
    let message = 'Internal Server Error'

    switch (error.name) {
        case 'SequelizeValidationError':
        case 'SequelizeUniqueConstraintError':
            statusCode = 400
            message = error.errors[0].message
            break
        case 'Cannot found a product':
            statusCode = 404
            message = error.name
            break
    }
    res.status(statusCode).json({ message })
}

module.exports = errorHandler