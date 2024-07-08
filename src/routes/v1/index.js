const express = require('express');
const UserController = require('../../controllers/user-controller');
const AuthRequestValidatorMiddleware = require('../../middlewares/auth-request-validator')

const router = express.Router();

// User
router.post('/signup', 
    AuthRequestValidatorMiddleware.validateUserAuth,
    UserController.signup
);

router.post('/login', 
    AuthRequestValidatorMiddleware.validateUserAuth,
    UserController.login
);

router.get('/isAuthenticated', 
    UserController.isAuthenticated
)

router.get('/isAdmin', 
    AuthRequestValidatorMiddleware.validateIsAdminRequest,
    UserController.isAdmin
)


module.exports = router;