function validatePostRequest(req, res, next) {
  if (!req.body.title || !req.body.content) {
    return res.status(400).json({ message: "Title and content are required" });
  }
  next();
}

module.exports = validatePostRequest;
