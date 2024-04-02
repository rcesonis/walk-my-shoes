const { ValidationError } = require("sequelize");

function errorHandler(err, req, res, next) {
  console.error(err.stack);

  if (err instanceof ValidationError) {
    return res.status(400).json({ message: err.message, errors: err.errors });
  }

  res.status(500).json({ message: "An error occurred", error: err.message });
}

module.exports = errorHandler;
