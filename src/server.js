require('dotenv').config();
const express = require('express');
const path = require('path');
const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./routes/web');
const connection = require('./config/database');

const app = express()
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

// config template engine
configViewEngine(app);

// Khai bao route
app.use('/', webRoutes);

// simple query
connection.query(
    'SELECT * FROM Users',
    function (err, results, fields) {
      console.log(">>>>>results= ",results); // results contains rows returned by server console.log(">>>>>fields= ",fields); // fields contains extra meta data about results, if available
    }
);

  
app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`)
})