const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employee_trackerDB",
});
connection.connect((err) => {
  if (err) {
    console.log("Unable to connect to data source.");
  } else {
    mainMenu();
  }
});
function mainMenu() {
  return inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add department",
        "Add role",
        "Add employee",
        "View all departments",
        "View all roles",
        "View all employees",
        "Update employee role",
        "exit",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Add department":
          departmentAdd();
          break;
        case "Add role":
          roleAdd();
          break;
        case "Add employee":
          employeeAdd();
          break;
        case "View all departments":
          departmentView();
          break;
        case "View all roles":
          roleView();
          break;
        case "View all employees":
          employeeView();
          break;
        case "Update employee role":
          roleUpdate();
          break;
        case "exit":
          connection.end();
          break;
      }
    });
}

function departmentAdd() {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "What is the name of the department?",
    })
    .then(function (answer) {
      connection.query(
        "INSERT INTO department (name) VALUE (?);",
        answer.department,
        function (err, res) {
          if (err) throw err;
          console.table(res);
          menu();
        }
      );
    });
}
