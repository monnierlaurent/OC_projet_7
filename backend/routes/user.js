const express = require('express');
const router = express.Router();

const rateLimiter = require('../middleware/rateLimite');
const userCtrl = require('../controllers/user');



router.post('/signup', userCtrl.createUser);
router.post('/login', rateLimiter, userCtrl.loginUser);


module.exports = router;