const AppError = require('./error-handlers');
const { StatusCodes } = require('http-status-codes')

class ValidationError extends AppError {
    constructor(error){
        let explanation = error.errors.map(err => err.message);

        super(
            error.name,
            "Not able to validate the data sent in request",
            explanation,
            StatusCodes.BAD_REQUEST,
        )
    }
}

module.exports = ValidationError;