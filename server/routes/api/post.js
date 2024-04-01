const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../../middleware/auth");
const postController = require("../../controllers/postController");

// Unprotected route
router.get("/public", postController.getPublicPosts);

// Protected route
router.get("/private", ensureAuthenticated, postController.getPrivatePosts);

// Create a new post
router.post("/", ensureAuthenticated, postController.createPost);

// Update an existing post
router.put("/:id", ensureAuthenticated, postController.updatePost);

// Delete a post
router.delete("/:id", ensureAuthenticated, postController.deletePost);

module.exports = router;
