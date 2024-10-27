const connection = require('../config/database');

// Demo connection db with NodeJS
// const getHomepage = (req, res) => {
//     // process data
//     // call model
//     let users = [];
//     connection.query(
//         'SELECT * FROM Users',
//         function (err, results, fields) {
//             users = results;
//             console.log(">>>>>results= ",results); // results contains rows returned by server console.log(">>>>>fields= ",fields); // fields contains extra meta data about results, if available
//             console.log(">>>>>users: ",users)
//             res.send(JSON.stringify(users));
//         }
//     );
// }


const getHomepage = (req, res) => {
    return res.render('home.ejs')
}

const getABC = (req, res) => {
    res.render('sample.ejs')
}

const postCreateUser = (req, res) => {
    console.log("res.body======    ",req.body);
    res.send('hello world');
}

module.exports = {
    getHomepage,
    getABC,
    postCreateUser
}