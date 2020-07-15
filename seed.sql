CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id),
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id),
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2),
  department_id INT NOT NULL
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id),
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT
);

 INSERT INTO `department` (`name`)  VALUES ('Finance','Engineering','Legal','Sales');
 INSERT INTO `role` (`title`, `salary`, `department_id`)  VALUES ('Lead Eng', 80000.00, 2);
 INSERT INTO `employee` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('Jack', 'Meier', 1, 1);

SELECT employee.ID, first_name, last_name, title, name, salary, manager_id
FROM ((employee
INNER JOIN department ON department.id = employee.role_id)
INNER JOIN role ON role.id = employee.role_id);