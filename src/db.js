

const mysql = require("mysql");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "***********",
  database: "product_management",
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});

module.exports = connection;
