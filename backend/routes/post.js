const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');
const comCtrl = require('../controllers/com');



// routes messages
router.post('/', auth, multer, postCtrl.createPost);

router.get('/', auth, postCtrl.displayPost);
router.get('/:id', auth, postCtrl.displayPostId);

router.put('/:id', auth, multer, postCtrl.updatePostId);

router.delete('/:id', auth, postCtrl.deletePostId);

//likes
//router.post('/:id', postCtrl.likeSauce);

// routes commentaires
//router.post('/:id/com', auth, comCtrl.createCom);

//router.get('/:id/com', auth, comCtrl.displayCom);
//router.get('/:id/com/:comId', auth, comCtrl.displayComId);

//router.put('/:id/com/:comId', auth, comCtrl.updateComId);

//router.delete('/:id/com/:comId', auth, comCtrl.deleteComId);

//likes
//router.post('/:id/like', auth, comCtrl.createCom);

module.exports = router;