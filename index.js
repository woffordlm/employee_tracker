const inquirer = require("inquirer");
const db = require("./db/connections");
const cTable = require("console.table");
// connecting to database
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  init();
});
// initial prompt
const promptUser = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "addDepartment",
      message: "What would you like to do?",
      choices: [
        "view all departments",
        "view all roles",
        "view all employees",
        "add a department",
        "add a role",
        "add an employee",
        "update an employee role",
        "finished",
      ],
    },
  ]);
};
// initializing the application
function init() {
  promptUser().then((data) => {
    switch (data.addDepartment) {
      case "view all departments":
        viewDepartment();
        break;
      case "view all roles":
        viewRole();
        break;
      case "add a department":
        addDepartment();
        break;
      case "add a role":
        addRole();
        break;
      case "view all employees":
        viewEmployees();
        break;
      case "add an employee":
        addEmployee();
        break;
      case "update an employee role":
        updateEmployee();
        break;
      default:
        console.log("finish");
    }
  });
}
// view employees 
const viewEmployees = () => {
  db.query(
    `SELECT employees.id AS Id,
  employees.first_name AS First_Name,
  employees.last_name AS Last_Name,
  roles.title AS Title,
  department.department_name AS Department,
  roles.salary AS Salary,
  CONCAT(manager.first_name, ' ', manager.last_name) AS Manager
  
  FROM employees LEFT JOIN roles on employees.role_id = roles.id LEFT JOIN department on roles.department_id = department.id LEFT JOIN employees manager on manager.id = employees.manager_id 
  ORDER BY department_name ASC;`,
    (err, data) => {
      if (err) throw err;
      console.table("all employees",data);
      init();
    }
  );
};
// view role
const viewRole = () => {
  db.query(
    ` SELECT roles.id AS Id, roles.title AS Title FROM roles;`,
    (err, data) => {
      if (err) throw err;
      console.table("all roles",data);
      init();
    }
  );
};
// view department
const viewDepartment = () => {
  db.query("SELECT * FROM department", (err, data) => {
    if (err) throw err;
    console.table("all departments",data);
    init();
  });
};
// add department
const addDepartment = () => {
  inquirer
    .prompt({
      type: "input",
      name: "departmentName",
      message: "What department do you want to add?",
    })
    .then((data) => {
      var sqlCall = `INSERT INTO department(department_name) VALUES ('${data.departmentName}')`;
      db.query(sqlCall, (err) => {
        if (err) throw err;
        console.log("department added to the table");
        init();
      });
    });
};

// add role
const addRole = () => {
  departmentArray = [];
  const sqlCall = "SELECT * FROM employeeTracker.department;";

  db.query(sqlCall, (err, res) => {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      const arrayTitle = res[i].department_name;
      departmentArray.push(arrayTitle);
    }
    return;
  });

  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What role would you like to add?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is this roles salary?",
      },
      {
        type: "list",
        name: "department",
        message: "Select a department",
        choices: departmentArray,
      },
    ])
    .then((data) => {
      console.log("data:", data);
      console.log("departmentArray:", departmentArray);

      for (let i = 0; i < departmentArray.length; i++) {
        if (departmentArray[i] === data.department) {
          var departmentId = i + 1;
          console.log("departmentId:", departmentId);
          var sqlCall = `INSERT INTO roles(title, salary, department_id) VALUES ('${data.name}', '${data.salary}', '${departmentId}')`;
          db.query(sqlCall, (err) => {
            if (err) throw err;
            console.log("role added to the table");
            init();
          });
        }
      }
    });
};
// add employee
const addEmployee = () => {
  var rolesArray = [];
  var employeeArray = [];
  const sqlCall = "SELECT * FROM employeeTracker.roles;";
  const sqlCall2 = "SELECT * FROM employeeTracker.employees;";

  db.query(sqlCall, (err, data) => {
    if (err) throw err;
    for (let i = 0; i < data.length; i++) {
      const arrayTitle = data[i].title;
      rolesArray.push(arrayTitle);
    }
  });
  db.query(sqlCall2, (err, data) => {
    if (err) throw err;
    for (let i = 0; i < data.length; i++) {
      const arrayNames = `${data[i].first_name} ${data[i].last_name};`;
      employeeArray.push(arrayNames);
    }
  });

  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the first name of the employee?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the last name of the employee?",
      },
      {
        type: "list",
        name: "employee_role",
        message: "What is this employee's role?",
        choices: rolesArray,
      },
      {
        type: "list",
        name: "manager_name",
        message: "What is the name of this employee's Manager?",
        choices: employeeArray,
      },
    ])
    .then((data) => {
      var rolesId;
      for (let i = 0; i < rolesArray.length; i++) {
        if (rolesArray[i] === data.employee_role) {
          var rolesId = i + 1;
        }
      }
      for (let i = 0; i < employeeArray.length; i++) {
        if (employeeArray[i] === data.manager_name) {
          managerId = i + 1;
          console.log("managerId:", managerId);
        }
      }

      var sqlCall = `INSERT INTO employees(first_name, last_name, role_id, manager_id ) VALUES ('${data.first_name}', '${data.last_name}', '${rolesId}', '${managerId}')`;
      db.query(sqlCall, (err) => {
        if (err) throw err;
        console.log("role added to the table");
        init();
      });
    });
};
// db query for all employees for choices in inquirer prompt
db.query("SELECT * FROM employeeTracker.employees;", function (error, res) {
  showEmp = res.map((role) => ({
    name: role.first_name + " " + role.last_name,
    value: role.id,
  }));
});
// db query for all roles for choices in inquirer prompt
db.query("SELECT * FROM employeeTracker.roles;", function (error, res) {
  showRoles = res.map(role => ({ name: role.title, value: role.id }))
});
// update employee
const updateEmployee = () => {
inquirer.prompt([
    {
      type: "list",
      name: "updateEmployee",
      message: "Which employee do you want to update?",
      choices: showEmp,
    },
    {
      type: "list",
      name: "employee_role",
      message: "What is this employee's new role?",
      choices: showRoles,
    },
  ])
  .then((data) => {
    console.log('data:', data)
    var sqlCall = `UPDATE employees SET role_id = ('${data.employee_role}') WHERE id = ${data.updateEmployee}`;
    db.query(sqlCall, (err) => {
      if (err) throw err;
      console.log("role added to the table");
      init();
    });
  });
};