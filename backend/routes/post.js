const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const postCtrl = require('../controllers/post');



router.post('/', auth, postCtrl.createPost);

router.get('/', postCtrl.displayPost);

router.get('/:id', postCtrl.displayPostId);

router.put('/:id', postCtrl.updatePostId);

router.delete('/:id', postCtrl.deletePostId);

//like
//router.post('/', postCtrl.likePost);

module.exports = router;