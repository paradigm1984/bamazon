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
     if (err) throw err;
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
			purchasePrompt();
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

		var queryString2 = "SELECT * FROM products WHERE product_name=?";

		connection.query(queryString2, [itemID], function(err,data) {

			if (err) {
				throw err;
			}
			console.log(data[0]);

			

		})
	})
}// END purchasePrompt()




