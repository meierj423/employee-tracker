var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "password",
  database: "employee_trackerDB",
});
connection.connect(function (err) {
  if (err) throw err;
  runSearch();
});
function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Find songs by artist",
        "Find all artists who appear more than once",
        "Find data within a specific range",
        "Search for a specific song",
        "Find all songs by a given artist",
        "exit",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Find songs by artist":
          artistSearch();
          break;
        case "Find all artists who appear more than once":
          multiSearch();
          break;
        case "Find data within a specific range":
          rangeSearch();
          break;
        case "Search for a specific song":
          songSearch();
          break;
        case "Find all songs by a given artist":
          songSearchByArtist();
          break;
        case "exit":
          connection.end();
          break;
      }
    });
}
