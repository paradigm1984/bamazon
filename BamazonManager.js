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

// Shows inventory and calls the manager menu
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
			managerMenu();
			// purchase() will be replaced by the manager menu
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


function managerMenu() {

	inquirer.prompt([

	{
		type: "list",
		message: "Welcome! What would you like to do?",
		choices: ["Add inventory to an existing item", "Remove inventory from an exisitng item", "Add a new item"],
		name: "managerChoice"

	}
		]).then(function(answer) {

			switch(answer.managerChoice) {

				case "Add inventory to an existing item":
					addInventory();
					break;
				case "Remove inventory from an exisitng item":
					removeInventory();
					break;
				case "Add a new item";
					addNewInventory();
				case "Exit":
					console.log("Thank you. Please come again!");
					return;
					break;	

			}
		})






}



