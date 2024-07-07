const express = require('express');
const UserController = require('../../controllers/user-controller');

const router = express.Router();

// User
router.post('/signup', UserController.signup);
router.post('/login', UserController.login);


module.exports = router;