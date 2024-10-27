require('dotenv').config();
const mysql = require('mysql2/promise');

// create the connection to database
// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT, //defaul 3306
//     user: process.env.DB_USER, // defaul: empty
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, //defaul 3306
    user: process.env.DB_USER, // defaul: empty
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
    // maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    // idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    // enableKeepAlive: true,
    // keepAliveInitialDelay: 0,
});

module.exports = connection;