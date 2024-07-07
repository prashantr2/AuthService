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

module.exports = {
    validateUserAuth,
}