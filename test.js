const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const app = express();
const consoleTable = require('console.table')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'hells_coming_db'
    },
    console.log(`Connected to the Hells Coming database.`)
  );
  // simple query
// db.query(
//     'SELECT * FROM `department` WHERE `title` = "Hunter" AND `salary` > 45',
//     function(err, results, fields) {
//       console.log(results); // results contains rows returned by server
//       console.log(fields); // fields contains extra meta data about results, if available
//       console.table(results)
//     }
//  );
//   db.query('SELECT * FROM hells_coming_db.roles', function (err, results) {
//     console.log(results);
//     console.table(results)
//   });


// Query database
db.query('SELECT * FROM department', function (err, results) {
    console.log(results);
    console.table(results);
  });
  db.query('SELECT * FROM roles', function (err, results) {
    console.log(results);
    console.table(results);
  });
  db.query('SELECT * FROM employee', function (err, results) {
    console.log(results);
    console.table(results);
  });
//add to employee table
function addEmployee(){ 
let toInsert = 4;
let tableE = 'employee';
let first_name = 'Cas';
let last_name = 'Castiel';
let role_id = 3
let manager_id = 5
var insertsql = `INSERT INTO ${tableE} (first_name, last_name, role_id, manager_id) VALUES ('` + first_name + "', '" + last_name + "', " + role_id +", " + manager_id + ");"
db.query(insertsql, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});
};
//add department to db
function addDepartment(){ 
  let toInsert = 4;
  let tableD = 'department';
  let dept_name = 'Darkness';
  var insertsqlD = `INSERT INTO ${tableD} (dept_name) VALUES ('` + dept_name + "');"
  db.query(insertsqlD, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
  };

  //add Role to db
  function addRoles(){ 
    let toInsert = 4;
    let tableR = 'roles';
    let title = 'Angel';
    let salary = 50000;
    let department_id = 1
    var insertsql = `INSERT INTO ${tableR} (title, salary, department_id) VALUES ('` + title + "', " + salary +", " + department_id + ");"
    db.query(insertsql, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    });
    };

    //update employee's Role to db
  function addRoles(){ 
    let toInsert = 4;
    let tableR = 'roles';
    let title = 'Angel';
    let salary = 50000;
    let department_id = 1
    var insertsql = `INSERT INTO ${tableR} (title, salary, department_id) VALUES ('` + title + "', " + salary +", " + department_id + ");"
    db.query(insertsql, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    });
    };
  //HOMEWORK HELP
// let toDelete = 4;
// let table = 'course_names';
// db.query(`DELETE FROM ${table} WHERE id = ?`,  [toDelete], (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });
// addDepartment()
// addRoles()
// addEmployee();

  
  // Default response for any other request (Not Found)
  app.use((req, res) => {
    res.status(404).end();
  });
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });