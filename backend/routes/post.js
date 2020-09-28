const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');



router.post('/', postCtrl.creatPost);

router.get('/', postCtrl.displayPost);
router.get('/:id', postCtrl.displayPostId);

//router.put('/:id', postCtrl.updatePostId);
router.delete('/:id', postCtrl.deletePostId);



module.exports = router;