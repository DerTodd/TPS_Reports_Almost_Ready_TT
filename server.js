const express = require('express');
const mysql = require('mysql2');
const consoleTable = require('console.table')
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'classlist_db'
  },
  console.log(`Connected to the classlist_db database.`)
);

db.query('SELECT * FROM students', function (err, results) {
  console.log(results);
  console.table(results);
});

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// db.query('SELECT COUNT(id) AS total_count FROM favorite_books GROUP BY in_stock', function ())
// var inStock = results
// console.log(results);
// return (inStock;)
// });
// .then(results)