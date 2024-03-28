const Sequelize = require("sequelize");
const config = require("./sequelize/config/config");

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

let sequelize;

if (dbConfig.url) {
  sequelize = new Sequelize(dbConfig.url, dbConfig);
} else {
  sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    dbConfig
  );
}

module.exports = sequelize;
