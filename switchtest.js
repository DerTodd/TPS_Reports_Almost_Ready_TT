const inquirer = require("inquirer");
const fs = require("fs");
const fristQuestion = [
    {
    type: 'rawlist',
    name: 'query',
    message: 'What would you like to do?',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'add a role', 'add an employee', 'update an employee role']
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
                console.log(results);
                console.table(results);
              });
          break;
        case 'View all roles':
            console.log("second answer " + desiredAction);
            db.query("SELECT roles.title AS 'Job Title', roles.id AS 'Role ID', department.dept_name AS 'Department', roles.salary AS salary FROM roles JOIN department ON roles.department_id = department.id;", function (err, results) {
                console.log(results);
                console.table(results);
            });
          break;
        case 'View all employees':
          licenseType = "![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)";
          licenseWebsite = "(https://www.boost.org/LICENSE_1_0.txt)";
          console.log(licenseType);
          console.log(licenseWebsite);
          break;
        case 'Add a department':
          licenseType = "![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)";
          licenseWebsite = "(https://opensource.org/licenses/BSD-3-Clause)";
          console.log(licenseType);
          console.log(licenseWebsite);
          break;
        case 'add a role':
          licenseType = "![License: CC0-1.0](https://licensebuttons.net/l/zero/1.0/80x15.png)";
          licenseWebsite = "(http://creativecommons.org/publicdomain/zero/1.0/)";
          console.log(licenseType);
          console.log(licenseWebsite);
          break;
    
        case 'add an employee':
          licenseType = "![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)";
          licenseWebsite = "(https://opensource.org/licenses/EPL-1.0)";
          console.log(licenseType);
          console.log(licenseWebsite);
          break;
        case 'update an employee role':
          licenseType = "![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)";
          licenseWebsite = "(https://www.gnu.org/licenses/gpl-3.0)";
          console.log(licenseType);
          console.log(licenseWebsite);
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