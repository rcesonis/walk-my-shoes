const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../../middleware/auth');
const postController = require('../../controllers/postController');

// Get all posts Protected route
router.get('/', ensureAuthenticated, postController.getPosts);

// Get posts by ID
router.get('/:id', ensureAuthenticated, postController.getPostsById);

// Create a new post
router.post('/', ensureAuthenticated, postController.createPost);

// Update an existing post
router.put('/:id', ensureAuthenticated, postController.updatePost);

// Delete a post
router.delete('/:id', ensureAuthenticated, postController.deletePost);

module.exports = router;
