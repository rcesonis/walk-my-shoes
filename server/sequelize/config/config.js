module.exports = {
  development: {
    url: process.env.DB_URL,
    dialect: "postgres",
  },
  test: {
    url: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
