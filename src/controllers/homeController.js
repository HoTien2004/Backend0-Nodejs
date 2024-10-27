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
    let email = req.body.email;
    let name = req.body.myname;
    let city = req.body.city;
    
    console.log(">>> email= ", email, "name= ", name, "city= ", city);
    // let {email, name, city} = res.body;

    // Using placeholders
    connection.query(
        `INSERT INTO Users (email, name, city)
         VALUES (?, ?, ?)`,
        [email, name, city],
        function (err, results) {
            console.log(results);
            res.send('Created user succeed!');
        }
    );
}

module.exports = {
    getHomepage,
    getABC,
    postCreateUser
}