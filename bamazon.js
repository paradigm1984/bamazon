var mysql = require("mysql");

var inquirer = require("inquirer")

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
     if (err) throw err;
});

// Shows inventory and calls purchasePrompt();
function beginningMenu() {

	console.log("Product:" + " |*| " + "Department:" + " |*| " + "Price:" + " |*| " + "Quantity:");

	// prints the inventory after its grabbed from the db by getInventory
	function printInventory(res) {

		for (var i = 0; i < res.length; i++) {
			console.log(res[i].product_name + " |*| " + res[i].department_name + " |*| " + "$" + res[i].price + " |*| " + res[i].stock);
		}
		console.log("____________________________________________________________________");
	}

	// connects with the db using connection.query and then runs printInventory and purchasePrompt
	function getInventory() {

		connection.query("SELECT * FROM products", function(err, res) {
			if(err) {
				throw err;
			}
			printInventory(res);
			purchasePrompt();
		})
	} 
	getInventory();	

}// END beginningMenu();
beginningMenu();




// the answer to this will start the purchase. 
function purchasePrompt() {
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

		var itemID = answers.item;	
		var qty = answers.quantity;

		connection.query("SELECT * FROM products WHERE product_name=?", [itemID], function(err,selectedItem) {

			if (err) {
				throw err;
			}

			if(selectedItem[0].StockQuantity - quantity >= 0) {
				// HERE YOU LEFT OFF //
			}
		})

	})
}




