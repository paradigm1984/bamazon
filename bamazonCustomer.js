var mysql = require("mysql");

var inquirer = require("inquirer")

var colors = require("colors");

//establishes connection criteria
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon_db"
});

// connects to database
connection.connect(function(err) {
     if (err) {
     	throw err
     }
     // console.log(Connection successful!!!);
});

// Shows inventory and calls purchasePrompt();
function beginningMenu() {

	console.log("Product:" + " |*| " + "Department:" + " |*| " + "Price:" + " |*| " + "Quantity:");

	// connects with the db using connection.query and then runs printInventory and purchasePrompt
	function getInventory() {

		var queryString1 = "SELECT * FROM products";

		connection.query(queryString1, function(err, res) {
			if(err) {
				throw err;
			}
			printInventory(res);
			purchase();
		})
	} 
	getInventory();	

	// prints the inventory after its grabbed from the db by getInventory
	function printInventory(res) {

		for (var i = 0; i < res.length; i++) {
			console.log(res[i].product_name + " |*| " + res[i].department_name + " |*| " + "$" + res[i].price + " |*| " + res[i].stock);
		}
		console.log("____________________________________________________________________");
	}

}// END beginningMenu();
beginningMenu();


// the answer to this will start the purchase. 
function purchase() {

	inquirer.prompt([
	{
		type: "input",
		message: "\nWhat item would you like to purchase today?",
		name: "item",
	},
	{
		type: "input",
		message: "\nHow Many?",
		name: "quantity"
	}
	]).then(function(answers) {

		// console.log(JSON.stringify(answers, null, 2));

		var itemName = answers.item;	
		var qty = answers.quantity;

		var queryString2 = "SELECT * FROM products WHERE product_name=?";

		connection.query(queryString2, [itemName], function(err,data) {

			if (err) {
				
				// throw err;
				console.log("Sorry, we dont have that item here. Please choose from the menu above!");
			}

			productInfo = data[0];

			// console.log("data recieved for order: " + JSON.stringify(productInfo));

			// if the quantity theyre asking for is less than or equal to the stock in the db
			if(qty <= productInfo.stock) {

				console.log("Placing your order...");

				console.log("You will be charged " + (qty * productInfo.price) + " dollars. Thank You!");

				var queryString3 = "UPDATE products SET stock=? WHERE product_name=?"

				connection.query(queryString3, [productInfo.stock - qty, itemName], function(err, inventory) {

					if(err) {
						throw err;
					}

				})
			} else {

				console.log("Insufficient quantity. We only have" + productInfo.stock + productInfo.product_name + " in stock. Sorry about that. :[ ")
			}
			
			beginningMenu(); // calls the menu at the end of the purchase

		})
	})
}
// END purchase()

// IT WORKS :D




