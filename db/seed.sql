INSERT INTO department(name) VALUES 
("Engineering"), 
("Legal"), 
("Finances"), 
("Sales");
INSERT INTO role(title, salary, department_id) VALUES 
("Lead Engineer", 150000, 1), 
("Software Engineer", 120000, 1), 
("Legal Team Lead", 250000, 2),
("Lawyer", 190000, 2),
("Accountant", 125000, 3),
("Sales Lead", 100000, 4),
("Salesperson", 80000, 4);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES 
("Jack", "Meier", 2, null), 
("Yun", "Meier", 6, null), 
("Ollie", "Meier", 7, 2);
