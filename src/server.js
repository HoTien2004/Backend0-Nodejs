require('dotenv').config();
const express = require('express');
const path = require('path');
const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./routes/web');
const mysql = require('mysql2');

const app = express()
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

// config template engine
configViewEngine(app);

// Khai bao route
app.use('/', webRoutes);

// Test connection
// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3307, //defaul 3306
  user: 'root', // defaul: empty
  password: '123456',
  database: 'tienho'
});

// simple query
connection.query(
    'SELECT * FROM Users',
    function (err, results, fields) {
      console.log(">>>>>results= ",results); // results contains rows returned by server
      console.log(">>>>>fields= ",fields); // fields contains extra meta data about results, if available
    }
);

  
app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`)
})