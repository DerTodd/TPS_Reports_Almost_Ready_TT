const inquirer = require("inquirer");
const fs = require("fs");
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');


// TODO: Include packages needed for this application
//const renderLicenseBadge = require("./utils/generateMarkdown")


// TODO: Create an array of questions for user input
const questions = [];
inquirer
  .prompt([
    {
        type: 'input',
        message: 'What is the title of your project?',
        name: 'title',
      },
    {
      type: 'input',
      message: 'Please provide a short description of your project:',
      name: 'description',
    },
    {
      type: 'input',
      message: 'How would a user install your program?',
      name: 'installation',
    },
    {
        type: 'input',
        message: 'What is the intended use of your program?',
        name: 'usage',
      },
    {
        type: 'list',
        message: 'What license would you like to use?',
        name: 'license',
        choices: ["MIT", "Apache", "Boost", "BSD 3-Clause License", "Creative Commons Zero v1.0 Universal", "Eclipse", "GNU GPL v3", "IBM Public License Version 1.0", "ISC", "Mozilla Public License 2.0", "The Perl License", "SIL Open Font License 1.1", ]
    },
    {
        type: 'input',
        message: 'Who helped you on this project?',
        name: 'contributing',
      },
      {
        type: 'input',
        message: 'What tests were done on this project?',
        name: 'tests',
      },
      {
        type: 'input',
        message: 'What is your GitHub username?',
        name: 'gitUserName',
      },
      {
        type: 'input',
        message: 'What is the best contact email?',
        name: 'email',
      },
  ])
  .then((answers) =>{
    console.log(answers.title,answers.description,answers.installation,answers.usage, answers.license, answers.contributing, answers.tests, answers.gitUserName, answers.email)
    var list ={
        title : answers.title,
        description : answers.description,
        installation : answers.installation,
        usage : answers.usage,
        license : answers.license,
        contributing : answers.contributing,
        tests : answers.tests,
        gitUserName : answers.gitUserName,
        email : answers.email
    }
    var lists = JSON.stringify(list);
    console.log("License type " + list.license);
    genMD.renderLicenseBadge(list.license);

    writeToFile('README.md',list);
    genMD.renderLicenseLink(list.license);
//     fs.appendFile('log.txt', `${lists}\n`, (err) =>
// err ? console.error(err) : console.log('Commit logged!')
// );
})


const managerQuestions = [

    {
    type: 'input',
    name: 'name',
    message: "What is the manager's name?",
    },
    {
    type: 'input',
    name: 'id',
    message: "Manager's ID number:",
    },
    {
    type: 'input',
    name: 'email',
    message: "Manager's email",
    },
    {
    type: 'input',
    name: 'officeNumber',
    message: "Manager's Office Number:",
    },
    {
    type: 'rawlist',
    name: 'type',
    message: 'Employee Type',
    choices: ['Manager']
    },
];

const engineerQuestions = [
    {
    type: 'input',
    name: 'name',
    message: "What is the engineer's name?",
    },
    {
    type: 'input',
    name: 'id',
    message: "Engineer's ID number:",
    },
    {
    type: 'input',
    name: 'email',
    message: "Engineer's email",
    },
    {
    type: 'rawlist',
    name: 'type',
    message: 'Employee Type',
    choices: ['Engineer', 'Intern']
    },
    {
    type: 'input',
    name: 'github',
    message: "Engineer's Github name:",
    },
];
const internQuestions = [
    {
    type: 'input',
    name: 'name',
    message: "What is the intern's name?",
    },
    {
    type: 'input',
    name: 'id',
    message: "Intern's ID number:",
    },
    {
    type: 'input',
    name: 'email',
    message: "Intern's email",
    },
    {
    type: 'rawlist',
    name: 'type',
    message: 'Employee Type',
    choices: ['Engineer', 'Intern']
    },
    {
    type: "input",
    name: "school",
    message: "Which school is the intern attending?",
    },
];
const internOrEngineer =[
    {
    type: 'rawlist',
    name: 'enOrIn',
    message: 'Whould you like to add another employee?',
    choices: ['Engineer', 'Intern', 'Build Website']
    },
];

function ask() {
  inquirer.prompt(managerQuestions).then((answers) => {
    output.push(answers);
    console.log(answers);
    //const employee = new Employee(answers.name, answers.id, answers.email);
    //console.log(employee);
    const manager = new Manager(answers.name, answers.id, answers.email, answers.type, answers.officeNumber)
    //const engineer = new Engineer('https://github.com/' + answers.tvShow)
    console.log(manager);
    //console.log("Your favorite TV Shows:", output.join(", "));
    console.log(output);
    const htmlPageContent = generateHTML(manager);

    fs.writeFile('./output/team.html', htmlPageContent, (err) =>
      err ? console.log(err) : console.log('Successfully created index.html!')
    );
    askEngineerIntern()
  });
}
function askEngineerIntern() {
    inquirer.prompt(internOrEngineer).then((answers) => {
        console.log(answers);
        if (answers.enOrIn === "Engineer") {
        askEngineer();
        } else if (answers.enOrIn === "Intern") {
            askIntern();
        } else if (answers.enOrIn ===  'Build Website') {
            endIt();
        }
    });
  }
  function askEngineer() {
    inquirer.prompt(engineerQuestions).then((answers) => {
        output.push(answers);
        console.log(answers);
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.type,"https://github.com/" + answers.github)
        console.log(engineer);
        //console.log("Your favorite TV Shows:", output.join(", "));
        console.log(output);
        const htmlEnContent = enamendHTML(engineer);

    fs.appendFile('./output/team.html', htmlEnContent, (err) =>
      err ? console.log(err) : console.log('Successfully created index.html!')
    );
        askEngineerIntern()
    });
  }
  function askIntern() {
    inquirer.prompt(internQuestions).then((answers) => {
        output.push(answers);
        console.log(answers);
        const intern = new Intern(answers.name, answers.id, answers.email, answers.type,answers.school)
        console.log(intern);
        //console.log(output.join(", "));
        console.log(output);
        const htmlInContent = inamendHTML(intern);

    fs.appendFile('./output/team.html', htmlInContent, (err) =>
      err ? console.log(err) : console.log('Successfully created index.html!')
    );
        askEngineerIntern()
    });
  }
  function endIt(){
    fs.appendFile('./output/team.html', endHTML, (err) =>
    err ? console.log(err) : console.log('Successfully ENDED THIS INSANITY index.html!')
    );
  }
//ask();
function renderLicenseLink(data) {
    switch (data) {
      case "MIT":
        licenseType = "![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)";
        licenseWebsite = "(https://opensource.org/licenses/MIT)";
        console.log(licenseType);
        console.log(licenseWebsite);
        break;
      case "Apache":
        licenseType = "![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)";
        licenseWebsite = "(https://opensource.org/licenses/Apache-2.0)";
        console.log(licenseType);
        console.log(licenseWebsite);
        break;
      case "Boost":
        licenseType = "![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)";
        licenseWebsite = "(https://www.boost.org/LICENSE_1_0.txt)";
        console.log(licenseType);
        console.log(licenseWebsite);
        break;
      case "BSD 3-Clause License":
        licenseType = "![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)";
        licenseWebsite = "(https://opensource.org/licenses/BSD-3-Clause)";
        console.log(licenseType);
        console.log(licenseWebsite);
        break;
      case "Creative Commons Zero v1.0 Universal":
        licenseType = "![License: CC0-1.0](https://licensebuttons.net/l/zero/1.0/80x15.png)";
        licenseWebsite = "(http://creativecommons.org/publicdomain/zero/1.0/)";
        console.log(licenseType);
        console.log(licenseWebsite);
        break;
  
      case "Eclipse":
        licenseType = "![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)";
        licenseWebsite = "(https://opensource.org/licenses/EPL-1.0)";
        console.log(licenseType);
        console.log(licenseWebsite);
        break;
      case "GNU GPL v3":
        licenseType = "![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)";
        licenseWebsite = "(https://www.gnu.org/licenses/gpl-3.0)";
        console.log(licenseType);
        console.log(licenseWebsite);
        break;
      case "IBM Public License Version 1.0":
        licenseType = "![License: IPL 1.0](https://img.shields.io/badge/License-IPL%201.0-blue.svg)";
        licenseWebsite = "(https://opensource.org/licenses/IPL-1.0)";
        console.log(licenseType);
        console.log(licenseWebsite);
        break;
      case "ISC":
        licenseType = "![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)";
        licenseWebsite = "(https://opensource.org/licenses/ISC)";
        console.log(licenseType);
        console.log(licenseWebsite);
        break;
      case "Mozilla Public License 2.0":
        licenseType = "![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)";
        licenseWebsite = "(https://opensource.org/licenses/MPL-2.0)";
        console.log(licenseType);
        console.log(licenseWebsite);
        break;
      case "The Perl License":
        licenseType = "![License: Artistic-2.0](https://img.shields.io/badge/License-Perl-0298c3.svg)";
        licenseWebsite = "(https://opensource.org/licenses/Artistic-2.0)";
        console.log(licenseType);
        console.log(licenseWebsite);
        break;
      case "SIL Open Font License 1.1":
        licenseType = "![License: Open Font-1.1](https://img.shields.io/badge/License-OFL%201.1-lightgreen.svg)";
        licenseWebsite = "(https://opensource.org/licenses/OFL-1.1)";
        console.log(licenseType);
        console.log(licenseWebsite);
        break;
      default:
        licenseType = "";
        licenseWebsite = "";
        console.log(licenseType);
        console.log(licenseWebsite);
        
    }
}