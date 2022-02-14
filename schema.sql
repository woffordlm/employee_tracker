DROP DATABASE IF EXISTS employeeTracker;
CREATE DATABASE employeeTracker;
USE employeeTracker;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS department;
USE employeeTracker;
CREATE TABLE department (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
department_name VARCHAR (30) NOT NULL
);
CREATE TABLE roles (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT NOT NULL,
  CONSTRAINT role_dept FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);
CREATE TABLE employees(
id INTEGER AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INTEGER NOT NULL,
manager_id INTEGER,
CONSTRAINT emp_role FOREIGN KEY(role_id)REFERENCES roles(id) ON DELETE CASCADE,
CONSTRAINT emp_manager_id FOREIGN KEY ( manager_id) REFERENCES employees(id)
);


INSERT INTO department
(department_name)VALUES("accounting");
INSERT INTO department
(department_name)VALUES("sales");
INSERT INTO department
(department_name)VALUES("operations");
INSERT INTO department
(department_name)VALUES("Research");
INSERT INTO department
(department_name)VALUES("Testing");

INSERT INTO roles (title, salary, department_id)
VALUES ("accountant", 100000, 1);
INSERT INTO roles (title, salary, department_id)
VALUES ("lead Accountant", 120000, 1);
INSERT INTO roles (title, salary, department_id)
VALUES ("junior Accountant", 90000, 1);
INSERT INTO roles (title, salary, department_id)
VALUES ("sales officer", 100000, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("sales lead", 120000, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("junior salesmen", 90000, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("sales officer", 100000, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("sales lead", 120000, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("junior salesmen", 90000, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("lab tech", 100000, 3);
INSERT INTO roles (title, salary, department_id)
VALUES ("researcher", 120000, 4);
INSERT INTO roles (title, salary, department_id)
VALUES ("tester", 90000, 5);

INSERT INTO employees
(first_name,last_name,role_id)
VALUES ('Luke', 'Wofford', 1);
INSERT INTO employees
(first_name,last_name,role_id)
VALUES ("Kana", 'Miller', 4);
INSERT INTO employees
(first_name,last_name,role_id)
VALUES ("Michael", 'Demarco', 10);
INSERT INTO employees
(first_name,last_name,role_id)
VALUES ("Nick", 'Barnette', 11);
INSERT INTO employees
(first_name,last_name,role_id)
VALUES ("Sam", 'Weiss', 12);


UPDATE employees
SET manager_id = 2
WHERE employees(id) = 1;
UPDATE employees
SET
manager_id = 3
WHERE employees(id) = 2;
UPDATE employees
SET
manager_id = 4
WHERE employees(id) = 3;
UPDATE employees
SET
manager_id = 5
WHERE employees(id) = 4;
UPDATE employees
SET
manager_id = 1
WHERE employees(id) = 5;




