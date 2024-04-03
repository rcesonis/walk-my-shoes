const Post = require("../sequelize/models/post");

exports.getPosts = async (req, res, next) => {
  const posts = await Post.findAll();
  res.status(200).json(posts);
};

exports.getPostsById = async (req, res, next) => {
  const post = await Post.findByPk(req.params.id);
  res.status(200).json(post);
};

exports.createPost = async (req, res, next) => {
  const { title, content, isPublic } = req.body;
  const userId = req.user.id;

  if (!title || !content) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const post = await Post.create({
    title,
    content,
    userId,
  });
  res.status(201).json(post);
};

exports.updatePost = async (req, res, next) => {
  const post = await Post.findByPk(req.params.id);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  await post.update(req.body);
  res.status(200).json(post);
};

exports.deletePost = async (req, res, next) => {
  const post = await Post.findByPk(req.params.id);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  await post.destroy();
  res.status(204).json({ message: "Post deleted" });
};
