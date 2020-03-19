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
    whichItem(res);
  });
}

function whichItem(inventory) {
    inquirer
      .prompt([
        {
          type: "input",
          name: "choice",
          message: "Type the ID of the product you would like to buy? press p to quit",
          validate: function(val) {
            return !isNaN(val) || val.toLowerCase() === "p";
          }
        }
      ])
      .then(function(val) {

        quitBamazon(val.choice);
        var userChoice = parseInt(val.choice);
        var product = productInventory(userChoice, inventory);

        if (product) {
          productQuantity(product);
        }
        else {
          console.log("\nThat product is currently not listed.");
          showProducts();
        }
      });
    }


function productQuantity(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many of " + product.product_name + " would you like? press p to quit",
        validate: function(val) {
          return val > 0 || val.toLowerCase() === "p";
        }
      }
    ])
    .then(function(val) {

      quitBamazon(val.quantity);
      var quantity = parseInt(val.quantity);

      if (quantity > product.stock_quantity) {
        console.log("\nInsufficient quantity!");
        showProducts();
      }
      else {
        buyProduct(product, quantity);
      }
    });
}


function buyProduct(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, product.item_id],
    function(err, res) {
      console.log("\nYou just bought " + quantity + " " + product.product_name + "(s)");
      console.log("The total cost is $" + quantity * product.price + "\n");
      showProducts();
    }
  );
}

function productInventory(userChoice, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === userChoice) {

      return inventory[i];
    }
  }

  return null;
}


function quitBamazon(exitButton) {
  if (exitButton.toLowerCase() === "p") {
    process.exit(0);
  }
}