const express = require('express')
const PostController = require('../controllers/postsController')
const isAuthenticated = require('../middleware/auth')

const router = express.Router();

router.post('/', isAuthenticated, (req, res) => PostController.createPost(req, res));
router.get('/', (req, res) =>  PostController.getPosts(req, res));
router.get('/:id', (req, res) => PostController.getPostById(req, res));
router.put('/:id', isAuthenticated, (req, res) => PostController.updatePost(req, res));
router.delete('/:id', isAuthenticated, (req, res) =>  PostController.deletePost(req, res));

module.exports = router;

