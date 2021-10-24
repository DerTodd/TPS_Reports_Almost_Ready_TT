const inquirer = require("inquirer");
const fs = require("fs");
const fristQuestion = [
    {
    type: 'rawlist',
    name: 'query',
    message: 'What would you like to do?',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'add a role', 'add an employee', 'update an employee role', 'Exit']
    },
];
function ask() {
    inquirer.prompt(fristQuestion).then((answers) => {
      //output.push(answers);
      console.log(answers);
      console.log(answers.query);
      var desiredAction = answers.query;
      console.log(desiredAction);
      switch (desiredAction) {
        case 'View all departments':
            console.log("first answer " + desiredAction);
            db.query('SELECT * FROM department', function (err, results) {
                console.table(results);
              });
          break;
        case 'View all roles':
            console.log("second answer " + desiredAction);
            db.query("SELECT roles.title AS 'Job Title', roles.id AS 'Role ID', department.dept_name AS 'Department', roles.salary AS salary FROM roles JOIN department ON roles.department_id = department.id;", function (err, results) {
                console.table(results);
            });
          break;
        case 'View all employees':
          console.log('Third answer ' + desiredAction);
          db.query("SELECT e.id AS 'ID', e.first_name AS 'First Name', e.last_name AS 'Last Name', roles.title AS 'Job Title', department.dept_name AS 'Department', roles.salary AS 'Salary',  CONCAT(m.first_name,' ',m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON m.id = e.manager_id JOIN roles ON e.role_id = roles.id JOIN department ON department.id = roles.department_id;", function (err, results) {
            console.table(results);
            });
          break;
        case 'Add a department':
            console.log('Forth answer ' + desiredAction);
            addDepartment();
          break;
        case 'add a role':
            console.log('Fifth answer ' + desiredAction);
            addRole();
          break;
    
        case 'add an employee':
            console.log('Sixth answer ' + desiredAction);
            addEmployee();
          break;
        case 'update an employee role':
            console.log('Seventh answer ' + desiredAction);
            updateEmployeeRole();
          break;
          case 'Exit':
            console.log('Eighth answer ' + desiredAction);
            updateEmployeeRole();
          break;
        default:
          licenseType = "";
          licenseWebsite = "";
          console.log(licenseType);
          console.log(licenseWebsite);
          
      }
    ask();
  })
  
}
ask();