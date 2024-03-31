require("dotenv").config(); // Load environment variables
const Sequelize = require("sequelize");
const config = require("./config");

// Determine environment (defaults to "development")
const dbConfig = config;

// Create Sequelize instance based on configuration
let sequelize;
console.log(dbConfig);
if (dbConfig.database.url) {
  sequelize = new Sequelize(dbConfig.database.url, {
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

// let sequelize;
// console.log(config);
// if (config.database?.url) {
//   sequelize = new Sequelize(config.database?.url, config);
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }

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
