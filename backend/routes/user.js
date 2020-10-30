const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const rateLimiter = require('../middleware/rateLimite');
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.createUser);
router.post('/login', rateLimiter, userCtrl.loginUser);

router.get('/', auth, userCtrl.displayUsers);
router.get('/:id', auth, userCtrl.displayIdUser);

router.put('/:id', auth, userCtrl.updateUser);
router.delete('/:id', auth, userCtrl.deleteUser);


module.exports = router;