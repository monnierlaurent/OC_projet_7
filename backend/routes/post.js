const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');
const comCtrl = require('../controllers/com');

const validationPost = require('../middleware/datasValidationPost');
const validationCom = require('../middleware/datasValidationCom');

// routes messages
router.post('/', auth, multer, validationPost, postCtrl.createPost);

router.get('/', auth, postCtrl.displayPost);
router.get('/:id', auth, postCtrl.displayPostId);

router.put('/:id', auth, multer, postCtrl.updatePostIdImg);
//router.put('/:id', auth, postCtrl.updatePostId);

router.delete('/:id', auth, postCtrl.deletePostId);

//likes
//router.get('/:id/like', auth, postCtrl.likeDisplayTable);
router.post('/:id/like', auth, postCtrl.likePost);

// routes commentaires
router.post('/:id/com', auth, validationCom, comCtrl.createCom);

router.get('/:id/com', auth, comCtrl.displayCom);
router.get('/:id/com/:comId', auth, comCtrl.displayComId);

router.put('/:postId/com/:comId', auth, comCtrl.updateComId);

router.delete('/:postId/com/:comId', auth, comCtrl.deleteComId);

//likes
//router.get('/:id/com/:comId/like', auth, comCtrl.likeDisplayTableComs);
router.post('/:id/com/:comId/like', auth, comCtrl.likeCom);

module.exports = router;