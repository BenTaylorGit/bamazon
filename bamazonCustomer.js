var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  showProducts();
});


function showProducts() {

  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    console.table(res);

  });
}

