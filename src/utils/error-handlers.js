const { StatusCodes } = require('http-status-codes');

class AppError extends Error {
    constructor(
        name="AppError",
        msg="Something went wrong",
        explanation="Something went wrong", 
        statusCode=StatusCodes.INTERNAL_SERVER_ERROR
    ){
        super();
        this.name = name;
        this.msg = msg;
        this.explanation = explanation;
        this.statusCode = statusCode;
    }
}

module.exports = AppError;