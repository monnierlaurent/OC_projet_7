const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');



router.post('/', postCtrl.creatPost);
router.get('/', postCtrl.displayPost);



module.exports = router;