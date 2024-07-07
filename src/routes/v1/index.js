const express = require('express');
const UserController = require('../../controllers/user-controller');

const router = express.Router();

// User
router.post('/signup', UserController.create);


module.exports = router;