const Sequelize = require("sequelize");
const config = require("./config");

// Determine environment (defaults to "development")
const dbConfig = config.database;

// Create Sequelize instance based on configuration
let sequelize;

if (dbConfig.url) {
  sequelize = new Sequelize(dbConfig.url, {
    dialect: dbConfig.dialect,
  });
} else {
  sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    dbConfig
  );
}

// Test the database connection
async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
}
testDatabaseConnection();

module.exports = sequelize;
