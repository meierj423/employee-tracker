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
          addDept();
          break;
        case "Add role":
          addRole();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "View all departments":
          viewDept();
          break;
        case "View all roles":
          viewRole();
          break;
        case "View all employees":
          viewEmployee();
          break;
        case "Update employee role":
          updateRole();
          break;
        case "exit":
          connection.end();
          break;
      }
    });
}

// Adds Department
function addDept() {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "What is the name of the department?",
    })
    .then(function (answer) {
      connection.query(
        "INSERT INTO department (name) VALUES (?);",
        answer.department,
        (error, results) => {
          console.log("=================");
          console.log(`${answer.department} was added to departments`);
          console.log("=================");

          mainMenu();
        }
      );
    });
}

// Views Departments
function viewDept() {
  const deptSql = `SELECT department.id AS Dept_ID, department.name AS Name 
  FROM department;`;
  connection.query(deptSql, (error, results) => {
    if (error) {
      throw error;
    }
    console.table(results);
    mainMenu();
  });
}

// Adds Role
function addRole() {
  const deptSql = `SELECT department.id AS Dept_ID, department.name AS Name 
  FROM department;`;
  connection.query(deptSql, (error, results) => {
    if (error) {
      throw error;
    }
    let departments = [];
    for (i = 0; i < results.length; i++) {
      departments.push(results[i]);
    }
    inquirer
      .prompt([
        {
          name: "roleTitle",
          type: "input",
          message: "What is the title of the role?",
        },
        {
          name: "roleSalary",
          type: "input",
          message: "What is the role's salary?",
        },
        {
          name: "roleDept",
          type: "list",
          message: "What department does this role belong to?",
          choices: departments.map((u) => {
            return {
              name: u.Name,
              value: u.Dept_ID,
            };
          }),
        },
      ])
      .then(function (answer) {
        connection.query(
          "INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?);",
          [
            answer.roleTitle,
            parseInt(answer.roleSalary),
            parseInt(answer.roleDept),
          ],
          (error, results) => {
            console.log("=================");
            console.log(`${answer.roleTitle} was added to roles`);
            console.log("=================");

            mainMenu();
          }
        );
      });
  });
}

// Views Roles
function viewRole() {
  const deptSql = `SELECT * FROM role`;
  connection.query(deptSql, (error, results) => {
    if (error) {
      throw error;
    }
    console.table(results);
    mainMenu();
  });
}

function addEmployee() {
  const roleSql = `SELECT * FROM role;`;
  connection.query(roleSql, (error, results) => {
    if (error) {
      throw error;
    }
    let roles = [];
    for (i = 0; i < results.length; i++) {
      roles.push(results[i]);
    }
    inquirer
      .prompt([
        {
          name: "firstName",
          type: "input",
          message: "What is the fist name of the employee?",
        },
        {
          name: "lastName",
          type: "input",
          message: "What is the last name of the employee?",
        },
        {
          name: "role",
          type: "list",
          message: "What is the employee's role?",
          choices: roles.map((u) => {
            return {
              name: u.title,
              value: u.id,
            };
          }),
        },
      ])
      .then(function (nameChoices) {
        const managerSql = `SELECT first_name FROM employee;`;
        connection.query(managerSql, (error, results) => {
          if (error) {
            throw error;
          }
          let managers = [];
          for (i = 0; i < results.length; i++) {
            managers.push(results[i]);
          }
          inquirer
            .prompt({
              name: "managerName",
              type: "list",
              message: "Who is this employee's manager?",
              choices: managers.map((u) => {
                return {
                  name: u.first_name,
                  value: u.id,
                };
              }),
            })
            .then(function (managerChoice) {
              const query = connection.query(
                "INSERT INTO employee(first_name, last_name, role_id) VALUES (?, ?, ?),",
                [
                  nameChoices.firstName,
                  nameChoices.lastName,
                  parseInt(nameChoices.role),
                ],
                (error, results) => {
                  console.log("=================");
                  console.log(query);
                  console.log("=================");

                  mainMenu();
                }
              );
            });
        });
      });
  });
}

function viewEmployee() {
  const employeeSql = `SELECT employee.id AS ID, 
	CONCAT(employee.first_name, " ", employee.last_name) AS Name,
	role.title AS Title,
	department.name AS Department,
	role.salary AS Salary

FROM employee
    INNER JOIN role ON employee.role_id = role.id
    INNER JOIN department ON role.department_id = department.id;`;
  connection.query(employeeSql, (error, results) => {
    if (error) {
      throw error;
    }
    console.table(results);
    mainMenu();
  });
}
