CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
	id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price INTEGER(200) NOT NULL,
    stock INTEGER(100) NOT NULL,
    PRIMARY KEY(id)
);    

INSERT INTO products(id, product_name, department_name, price, stock)
VALUES (1, "Trail Mix", "Pantry", 3.99, 14);

INSERT INTO products(id, product_name, department_name, price, stock)
VALUES (2, "Cross-bow", "Hunting", 378.99, 4);

INSERT INTO products(id, product_name, department_name, price, stock)
VALUES (3, "IQ84", "Books", 10.99, 26);

INSERT INTO products(id, product_name, department_name, price, stock)
VALUES (4, "Water: 24 pk", "Pantry", 4.99, 50);

INSERT INTO products(id, product_name, department_name, price, stock)
VALUES (5, "Dad Hat", "Clothing", 17.99, 30);

INSERT INTO products(id, product_name, department_name, price, stock)
VALUES (6, "Toothbrush", "Bathroom", 6.99, 100);

INSERT INTO products(id, product_name, department_name, price, stock)
VALUES (7, "Laptop", "Electronics", 389.99, 17);

INSERT INTO products(id, product_name, department_name, price, stock)
VALUES (8, "Baseball Bat", "Sports", 39.99, 44);

INSERT INTO products(id, product_name, department_name, price, stock)
VALUES (9, "Skinny Jeans", "Clothing", 29.99, 60);

INSERT INTO products(id, product_name, department_name, price, stock)
VALUES (10, "Tylenol: 100 ct.", "Medicine", 5.99, 85);
