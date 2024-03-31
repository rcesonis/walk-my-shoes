const Post = require("../sequelize/models/post");

exports.getPublicPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({ where: { isPublic: true } });
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPrivatePosts = async (req, res) => {
  try {
    const posts = await Post.findAll({ where: { isPublic: false } });
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createPost = async (req, res) => {
  const { title, content, isPublic } = req.body;
  console.log(req.user.id);
  const userId = req.user.id;

  // Validate the data
  if (!title || !content || isPublic === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
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
    res.status(400).json({ error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post) {
      await post.update(req.body);
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post) {
      await post.destroy();
      res.status(204).json({ message: "Post deleted" });
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
