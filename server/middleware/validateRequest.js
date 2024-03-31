function validatePostRequest(req, res, next) {
  const { title, content } = req.body;

  // Check if title or content is missing or empty
  if (!title || !content || title.trim() === "" || content.trim() === "") {
    return res
      .status(400)
      .json({ error: "Title and content are required and cannot be empty" });
  }
  // Proceed to the next middleware if validation passes
  next();
}

module.exports = validatePostRequest;
