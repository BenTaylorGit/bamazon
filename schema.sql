DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Animal Crossing New Horizons", "Video Games", 59.99, 50),
  ("DOOM Eternal", "Video Games", 59.99, 50),
  ("Whey Protein", "Sport Supplement", 45.50, 50),
  ("Black V-Neck", "Apparel", 9.00, 10),
  ("Pants", "Apparel", 19.96, 80),
  ("Toilet Paper", "Home Furnishing", 100.00, 3),
  ("Circa Survive Album", "Music", 9.99, 25),
  ("Spiderman Into the Spiderverse", "Films", 17.89, 23),
  ("Howl's Moving Castle", "Films", 19.99, 35),
  ("Paper Towels", "Home Furnishing", 1000.00, 5);
