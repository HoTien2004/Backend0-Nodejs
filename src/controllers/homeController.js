const connection = require("../config/database");
const {
  getAllUsers,
  getUserByID,
  updateUserById,
  deleteUserById,
} = require("../services/CRUDService");

const User = require("../models/user");

const getHomepage = async (req, res) => {
  let results = await User.find();
  return res.render("home.ejs", { listUsers: results });
};

const getABC = (req, res) => {
  res.render("sample.ejs");
};

const postCreateUser = async (req, res) => {
  let email = req.body.email;
  let name = req.body.myname;
  let city = req.body.city;

  await User.create({
    email,
    name,
    city,
  });

  //   res.send("Created user succeed!");
  res.redirect("/");
};

const getCreatePage = (req, res) => {
  return res.render("create.ejs");
};

const getUpdatePage = async (req, res) => {
  const userId = req.params.id;
  //   let user = await getUserByID(userId);
  let user = await User.findById(userId).exec();
  return res.render("edit.ejs", { userEdit: user });
};

const postUpdateUser = async (req, res) => {
  let email = req.body.email;
  let name = req.body.myname;
  let city = req.body.city;
  let userId = req.body.userId;

  await User.updateOne({ _id: userId}, { email: email, name: name, city: city });

  // let { email, name, city } = res.body;
  console.log(
    ">>> email= ",
    email,
    "name= ",
    name,
    "city= ",
    city,
    "userId",
    userId
  );

  // res.send('Updated user succeed!');
  res.redirect("/"); // redirect to home page after update
};

const postDeleteUser = async (req, res) => {
  const userId = req.params.id;
  // let user = await getUserByID(userId);
  let user = await User.findById(userId).exec();
  res.render("delete.ejs", { userEdit: user });
};

const postHandleRemoveUser = async (req, res) => {
  const id = req.body.userId;
  // await deleteUserById(id);
  let results = await User.deleteOne({
    _id: id
  })
  console.log(">>> Results", results);
  res.redirect("/");
};

module.exports = {
  getHomepage,
  getABC,
  postCreateUser,
  getCreatePage,
  getUpdatePage,
  postCreateUser,
  postUpdateUser,
  postDeleteUser,
  postHandleRemoveUser,
};
