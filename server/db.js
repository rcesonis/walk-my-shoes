const { Client } = require("pg");
const { user, host, database, password, port } = require("./dbConfig");

const client = new Client({
  user,
  host,
  database,
  password,
  port,
});

client.connect((err) => {
  if (err) {
    console.error("Error connecting to PostgreSQL database:", err);
  } else {
    console.log("Connected to PostgreSQL database successfully!");
    // You can perform database operations here
  }
});

module.exports = client;
