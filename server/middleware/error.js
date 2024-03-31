function errorHandler(err, req, res, next) {
  console.error("An error occurred:", err);

  // Set default error message
  let errorMessage = "An error occurred";

  if (err.message) {
    errorMessage = err.message;
  }
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({ error: errorMessage });
}

module.exports = errorHandler;
