const path = require("path");
require("dotenv").config();
// Define configuration object
const config = {
  development: {
    database: {
      url: process.env.DEV_DATABASE_URL,
      dialect: "postgres",
    },
    server: {
      port: process.env.PORT || 3000,
    },
  },
  production: {
    database: {
      dialect: "postgres",
      host: "production_host",
      port: 3333,
      username: "production_user",
      password: "production_password",
      database: "production_db",
    },

    server: {
      port: process.env.PORT || 3000,
    },
  },
};

const env = process.env.NODE_ENV || "development";

module.exports = config[env];
