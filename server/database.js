const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Password@123',
  database: 'learn_together',
})

db.connect((err) => {
  if (err) {
      console.log(err);
      return;
  }
  console.log('MySql Connected...');
})

module.exports = db;