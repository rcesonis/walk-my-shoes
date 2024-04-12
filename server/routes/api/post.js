const express = require("express");
const router = express.Router();
const postController = require("../../controllers/postController");
const passport = require("passport");

// Get all posts Protected route
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  postController.getPosts
);

// Get posts by ID
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postController.getPostsById
);

// Create a new post
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postController.createPost
);

// Update an existing post
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postController.updatePost
);

// Delete a post
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postController.deletePost
);

module.exports = router;
