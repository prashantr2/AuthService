const validateUserAuth = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            success: false,
            data: {},
            msg: "Something went wrong",
            error: "Email or password is empty"
        })
    }
    next();
}

const validateIsAdminRequest = (req, res, next) => {
    if (!req.body.id) {
        return res.status(400).json({
            error: "User's id not given",
            data: {},
            sucess: false,
            msg: "Something went wrong",
        })
    }
    next();
}

module.exports = {
    validateUserAuth,
    validateIsAdminRequest,
}