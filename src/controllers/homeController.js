const connection = require('../config/database');
const { getAllUsers, getUserByID,
        updateUserById, deleteUserById
 } = require('../services/CRUDService')
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

const getHomepage = async (req, res) => {
    let results = await getAllUsers();
    return res.render('home.ejs', { listUsers: results });
}

const getABC = (req, res) => {
    res.render('sample.ejs')
}

const postCreateUser = async (req, res) => {
    let email = req.body.email;
    let name = req.body.myname;
    let city = req.body.city;
    
    // let { email, name, city } = res.body;
    console.log(">>> email= ", email, "name= ", name, "city= ", city);

    let [results, fields] = await connection.query(
        `INSERT INTO Users (email, name, city) 
         VALUES (?, ?, ?)`,[email, name, city]
        );

    console.log(results);
    res.send('Created user succeed!');
}

const getCreatePage = (req, res) => {
    return res.render('create.ejs');
}

const getUpdatePage = async (req, res) => {
    const userId = req.params.id;
    let user = await getUserByID(userId);
    return res.render('edit.ejs', { userEdit : user });
}

const postUpdateUser = async (req, res) => {
    let email = req.body.email;
    let name = req.body.myname;
    let city = req.body.city;
    let userId = req.body.userId;

    await updateUserById(email, name, city, userId);
    
    // let { email, name, city } = res.body;
    console.log(">>> email= ", email, "name= ", name, "city= ", city, "userId", userId);

    // res.send('Updated user succeed!');
    res.redirect('/'); // redirect to home page after update
}

const postDeleteUser = async (req, res) => {
    const userId = req.params.id;
    let user = await getUserByID(userId);
    res.render('delete.ejs', { userEdit : user });
}

const postHandleRemoveUser = async (req, res) => {
    const id = req.body.userId;
    await deleteUserById(id);
    res.redirect('/');
}

module.exports = {
    getHomepage,
    getABC,
    postCreateUser,
    getCreatePage,
    getUpdatePage,
    postCreateUser,
    postUpdateUser,
    postDeleteUser,
    postHandleRemoveUser
}