const inquirer = require("inquirer");
const fs = require("fs");
const { exit } = require("process");
const express = require('express');
const mysql = require('mysql2');
const consoleTable = require('console.table');
const chalk = require('chalk');
const logo = require('asciiart-logo');
const config = require('./package.json');
console.log(logo(config).render());
require('events').EventEmitter.defaultMaxListeners = 15;
const longText = "Balls!"

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'hells_coming_db'
  },
  console.log(`Connected to the hells_coming database.`)
);
app.use((req, res) => {
    res.status(404).end();
  });
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); 
})
async function welcome(){
  console.log(
    logo({
      name: 'Supernatural',
      font: 'Speed',
      lineChars: 10,
      padding: 2,
      margin: 3,
      borderColor: 'grey',
      logoColor: 'bold-green',
      textColor: 'green',
  })
  .emptyLine()
  .right('version 3.7.123')
  .emptyLine()
  .center(longText)
  .render()
);
//ask();
}
setTimeout(ask, 1000);
const fristQuestion = [
    {
    type: 'rawlist',
    name: 'query',
    message: 'What would you like to do?',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'add a role', 'add an employee', 'update an employee role', 'let me talk to the manager', 'change manager', 'show me the money', 'Exit']
    },
];
const addDeptQuestions = [
    {
    type: 'input',
    name: 'dept_name',
    message: 'What department would you like to add?'
    }
];
const addRolesQuestions = [
    {
    type: 'input',
    name: 'title',
    message: 'What is the name of the new Title?'
    },
    {
        type: 'input',
        name: 'salary',
        message: 'What is salary of the new position?'
    },
    {
        type: 'input',
        name: 'department_id',
        message: 'Which department will have this position?'
    },
];
const addEmployeeQuestions = [
    {
        type: 'input',
        name: 'first_name',
        message: "Employee's first name?"
        },
        {
            type: 'input',
            name: 'last_name',
            message: "Employee's last name?"
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'What is the role ID for the new employee?'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: "What is the ID of the new employee's manager?"
        },
        
];
const updateEmployeeRoleQuestions = [
    {
        type: 'input',
        name: 'id',
        message: "What is the employee's ID?"
    },
    {
        type: 'input',
        name: 'role_id',
        message: "What is the role ID for the new position?"
    },
];
const updateEmployeeManagerQuestions =[
  {
    type: 'input',
    name: 'id',
    message: "What is the employee's ID?"
  },
  {
    type: 'input',
    name: 'manager_id',
    message: "Please enter the ID of the new manager."
  }
];
const showMeTheMoneyQuestions = [
  {type: 'input',
  name: 'department_id',
  message: "Please enter the deparment's ID to see budget:"
}
]
const mainMenu = [
    {
        type: 'rawlist',
        name: 'main',
        message: "Would you like to return to the main menu?",
        choices: ['Yes', 'No']
    },
];

function ask() {
    inquirer.prompt(fristQuestion).then((answers) => {
      //output.push(answers);
      //console.log(answers);
      //console.log(answers.query);
      var desiredAction = answers.query;
      //console.log(desiredAction);
      switch (desiredAction) {
        case 'View all departments':
            //console.log("first answer " + desiredAction);
            db.query('SELECT * FROM department', function (err, results) {
                console.table(results);
                returnToMain();
              });
          break;
        case 'View all roles':
            //console.log("second answer " + desiredAction);
            db.query("SELECT roles.title AS 'Job Title', roles.id AS 'Role ID', department.dept_name AS 'Department', roles.salary AS salary FROM roles JOIN department ON roles.department_id = department.id;", function (err, results) {
                console.table(results);
                returnToMain()
            });
          break;
        case 'View all employees':
          //console.log('Third answer ' + desiredAction);
          db.query("SELECT e.id AS 'ID', e.first_name AS 'First Name', e.last_name AS 'Last Name', roles.title AS 'Job Title', department.dept_name AS 'Department', roles.salary AS 'Salary',  CONCAT(m.first_name,' ',m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON m.id = e.manager_id JOIN roles ON e.role_id = roles.id JOIN department ON department.id = roles.department_id;", function (err, results) {
            console.table(results);
            returnToMain()
            });
          break;
        case 'Add a department':
            //console.log('Forth answer ' + desiredAction);
            addDepartment();
          break;
        case 'add a role':
            //console.log('Fifth answer ' + desiredAction);
            addRole();
          break;
    
        case 'add an employee':
            //console.log('Sixth answer ' + desiredAction);
            addEmployee();
          break;
        case 'update an employee role':
            //console.log('Seventh answer ' + desiredAction);
            updateEmployeeRole();
          break;
          case 'let me talk to the manager':
            db.query("SELECT CONCAT(m.first_name,' ',m.last_name) AS Manager, e.id AS 'ID', e.first_name AS 'First Name', e.last_name AS 'Last Name', roles.title AS 'Job Title', department.dept_name AS 'Department', roles.salary AS 'Salary',  CONCAT(m.first_name,' ',m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON m.id = e.manager_id JOIN roles ON e.role_id = roles.id JOIN department ON department.id = roles.department_id ORDER BY manager;", function (err, results) {
              console.table(results);
                returnToMain();
              });
            break;
            case 'change manager':
              updateEmployeeManager();
              break;
            case 'show me the money':
              showBudget();
            break;
          case 'Exit':
            //console.log('Eighth answer ' + desiredAction);
            exitNow();
          break;
        default:
          licenseType = "";
          licenseWebsite = "";
          //console.log(licenseType);
          //console.log(licenseWebsite);
          
      }
    //ask();
  })
}

function addDepartment() {
    inquirer.prompt(addDeptQuestions).then((answers) => {
    //output.push(answers);
    //console.log(answers.dept_name);
    
    let tableD = 'department';
    let dept_name = answers.dept_name;
    var insertsqlD = `INSERT INTO ${tableD} (dept_name) VALUES ('` + dept_name + "');"
    db.query(insertsqlD, (err, result) => {
    if (err) {
        console.log(err);
    }
    //console.log(result);
  });
  db.query('SELECT * FROM department', function (err, results) {
    console.table(results);
  })
  setTimeout(returnToMain,1000);
  });
}

function addRole() {
    inquirer.prompt(addRolesQuestions).then((answers) => {
      //output.push(answers);
      //console.log(answers);

      let tableR = 'roles';
      let title = answers.title;
      let salary = answers.salary;
      let department_id = answers.department_id
      var insertsql = `INSERT INTO ${tableR} (title, salary, department_id) VALUES ('` + title + "', " + salary +", " + department_id + ");"
      db.query(insertsql, (err, result) => {
        if (err) {
          console.log(err);
        }
        //console.log(result);
      });
      db.query("SELECT roles.title AS 'Job Title', roles.id AS 'Role ID', department.dept_name AS 'Department', roles.salary AS salary FROM roles JOIN department ON roles.department_id = department.id;", function (err, results) {
        console.table(results);
      })
      setTimeout(returnToMain,1000);
      });
    }

function addEmployee() {
    inquirer.prompt(addEmployeeQuestions).then((answers) => {
      //output.push(answers);
    //console.log(answers);
    let tableE = 'employee';
    let first_name = answers.first_name;
    let last_name = answers.last_name;
    let role_id = answers.role_id;
    let manager_id = answers.manager_id;
    var insertsql = `INSERT INTO ${tableE} (first_name, last_name, role_id, manager_id) VALUES ('` + first_name + "', '" + last_name + "', " + role_id +", " + manager_id + ");"
    db.query(insertsql, (err, result) => {
        if (err) {
    console.log(err);
  }
  
  //console.log(result);
});
db.query("SELECT e.id AS 'ID', e.first_name AS 'First Name', e.last_name AS 'Last Name', roles.title AS 'Job Title', department.dept_name AS 'Department', roles.salary AS 'Salary',  CONCAT(m.first_name,' ',m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON m.id = e.manager_id JOIN roles ON e.role_id = roles.id JOIN department ON department.id = roles.department_id;", function (err, results) {
  console.table(results);
})
setTimeout(returnToMain,1000);
    })
}

function updateEmployeeRole() {
    inquirer.prompt(updateEmployeeRoleQuestions).then((answers) => {
      //output.push(answers);
    //console.log(answers);
    let tableR = 'employee';
    let role_id = answers.role_id;
    let id = answers.id;
    var insertsql = `UPDATE ${tableR} SET role_id = ` + role_id + " WHERE id =  " + id +";"
    db.query(insertsql, (err, result) => {
        if (err) {
        console.log(err);
        }
        //console.log(result);
    });
    db.query("SELECT e.id AS 'ID', e.first_name AS 'First Name', e.last_name AS 'Last Name', roles.title AS 'Job Title', department.dept_name AS 'Department', roles.salary AS 'Salary',  CONCAT(m.first_name,' ',m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON m.id = e.manager_id JOIN roles ON e.role_id = roles.id JOIN department ON department.id = roles.department_id;", function (err, results) {
      console.table(results);
    })
    setTimeout(returnToMain,1000);
    });
}

function updateEmployeeManager(){ 
  inquirer.prompt(updateEmployeeManagerQuestions).then((answers) => {
  let tableR = 'employee';
  let manager_id = answers.manager_id;
  let id = answers.id;
  var insertsql = `UPDATE ${tableR} SET manager_id = ` + manager_id + " WHERE id =  " + id +";"
  db.query(insertsql, (err, result) => {
    if (err) {
      console.log(err);
    }
    //console.log(result);
    db.query("SELECT e.id AS 'ID', e.first_name AS 'First Name', e.last_name AS 'Last Name', roles.title AS 'Job Title', department.dept_name AS 'Department', roles.salary AS 'Salary',  CONCAT(m.first_name,' ',m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON m.id = e.manager_id JOIN roles ON e.role_id = roles.id JOIN department ON department.id = roles.department_id;", function (err, results) {
      console.table(results);
      setTimeout(returnToMain,1000);
      });
      
    });
    
    //setTimeout(returnToMain,1000);
  });
  
}

function showBudget() {
  inquirer.prompt(showMeTheMoneyQuestions).then((answers) => {
  let tableR = 'roles'
  let department_id=answers.department_id;
  var insertsql = "SELECT roles.department_id, SUM(roles.salary) AS 'department total' FROM roles WHERE roles.department_id = " + department_id + " GROUP BY roles.department_id;"
db.query(insertsql, (err, results) => {
  if (err) {
    console.log(err);
  }
  console.table(results);
  setTimeout(returnToMain,1000);
});
});
}
function exitNow() {
  console.log(
    logo({
      name: 'The end is nigh',
      font: 'Bloody',
      lineChars: 20,
      padding: 2,
      margin: 3,
      borderColor: 'grey',
      logoColor: 'bold-green',
      textColor: 'green',
  })
  .emptyLine()
  .right('version 3.7.123')
  .emptyLine()
  .center(longText)
  .render()
);
    console.log("Goodbye");
    
}

function returnToMain() {
    inquirer.prompt(mainMenu).then((answers) => {
        //output.push(answers);
      console.log(answers.main);
      if(answers.main == 'Yes'){
        ask(); 
      }
      else {
        exitNow()
      }
      });
  }

welcome();


