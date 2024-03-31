const Post = require("../sequelize/models/post");
const logger = require("../config/logger");

// Get public posts
exports.getPublicPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({ where: { isPublic: true } });
    res.status(200).json(posts);
  } catch (error) {
    logger.error("Error retrieving public posts:", error);
    res.status(500).json({ error: "Failed to retrieve public posts" });
  }
};

// Get private posts
exports.getPrivatePosts = async (req, res) => {
  try {
    const posts = await Post.findAll({ where: { isPublic: false } });
    res.status(200).json(posts);
  } catch (error) {
    logger.error("Error retrieving private posts:", error);
    res.status(500).json({ error: "Failed to retrieve private posts" });
  }
};

// Create a new post
exports.createPost = async (req, res) => {
  const { title, content, isPublic } = req.body;
  console.log(req.user.id);
  const userId = req.user.id;

  if (!title || !content || isPublic === undefined) {
    return res
      .status(400)
      .json({ error: "Title, content, and isPublic are required" });
  }

  try {
    const post = await Post.create({
      title,
      content,
      isPublic,
      userId,
    });
    res.status(201).json(post);
  } catch (error) {
    logger.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
};

// Update an existing post
exports.updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, content, isPublic } = req.body;

  try {
    let post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Update post fields
    post.title = title || post.title;
    post.content = content || post.content;
    post.isPublic = isPublic !== undefined ? isPublic : post.isPublic;

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    logger.error("Error updating post:", error);
    res.status(500).json({ error: "Failed to update post" });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    await post.destroy();
    res.status(204).end();
  } catch (error) {
    logger.error("Error deleting post:", error);
    res.status(500).json({ error: "Failed to delete post" });
  }
};

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    logger.error("Error retrieving posts:", error);
    res.status(500).json({ error: "Failed to retrieve posts" });
  }
};
