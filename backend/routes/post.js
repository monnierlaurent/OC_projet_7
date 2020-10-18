const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const postCtrl = require('../controllers/post');
const comCtrl = require('../controllers/com');




router.post('/', auth, postCtrl.createPost);


router.get('/', postCtrl.displayPost);

router.get('/:id', postCtrl.displayPostId);

router.put('/:id', postCtrl.updatePostId);

router.delete('/:id', postCtrl.deletePostId);

//like
//router.post('/', postCtrl.likePost);

// routes commentaire
router.post('/:id/com', auth, comCtrl.createCom);

router.get('/:id/com', auth, comCtrl.displayCom);
router.get('/:id/com/:comId', auth, comCtrl.displayComId);

router.put('/:id/com/:comId', comCtrl.updateComId);

router.delete('/:id/com/:comId', comCtrl.deleteComId);

//like
//router.post('/:id', comCtrl.likeComId);


module.exports = router;