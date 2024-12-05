const mysql = require("mysql2");

const config = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "db_otp",
});

config.connect((err) => {
  if (err) throw err;
});

module.exports = config;
