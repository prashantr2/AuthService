const AppError = require('./error-handlers');
const { StatusCodes } = require('http-status-codes')

class ClientError extends AppError {
    constructor(name, msg, explanation, statusCode){
        console.log(name, msg, explanation, statusCode)
        super(name, msg, explanation, statusCode)
    }
}

module.exports = ClientError;